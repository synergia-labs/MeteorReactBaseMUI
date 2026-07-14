import { Meteor } from 'meteor/meteor';
import { publicSettings } from '/imports/config/publicSettings';

const SERVICE_WORKER_PATH = '/sw.js';
const CACHE_PREFIXES = ['meteor-react-base-', 'MSW V'];
const UPDATE_EVENT = 'meteor-react-base:service-worker-update';
const DEVELOPMENT_RELOAD_KEY = 'meteor-react-base:service-worker-disabled';
let notifiedWorker: ServiceWorker | null = null;

const isOwnedScriptUrl = (scriptUrl?: string | null) =>
	scriptUrl ? new URL(scriptUrl).pathname === SERVICE_WORKER_PATH : false;

const isOwnedRegistration = (registration: ServiceWorkerRegistration) => {
	const scriptUrl =
		registration.active?.scriptURL || registration.waiting?.scriptURL || registration.installing?.scriptURL;
	return isOwnedScriptUrl(scriptUrl);
};

const clearOwnedCaches = async () => {
	if (!('caches' in window)) return;
	const cacheNames = await caches.keys();
	await Promise.all(
		cacheNames
			.filter((cacheName) => CACHE_PREFIXES.some((prefix) => cacheName.startsWith(prefix)))
			.map((cacheName) => caches.delete(cacheName))
	);
};

const disableServiceWorker = async () => {
	const registrations = await navigator.serviceWorker.getRegistrations();
	await Promise.all(registrations.filter(isOwnedRegistration).map((registration) => registration.unregister()));
	await clearOwnedCaches();
};

const notifyUpdate = (registration: ServiceWorkerRegistration) => {
	if (!registration.waiting || registration.waiting === notifiedWorker) return;
	notifiedWorker = registration.waiting;

	const applyUpdate = () => registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
	window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: { applyUpdate, registration } }));

	if (window.confirm('Uma nova versão da aplicação está disponível. Deseja atualizar agora?')) applyUpdate();
};

export const initializeServiceWorker = async () => {
	if (!('serviceWorker' in navigator)) return;

	const enabled = Meteor.isProduction && publicSettings.serviceWorker.enabled;
	if (!enabled) {
		const wasControlled = isOwnedScriptUrl(navigator.serviceWorker.controller?.scriptURL);
		await disableServiceWorker();
		if (wasControlled && sessionStorage.getItem(DEVELOPMENT_RELOAD_KEY) !== 'true') {
			sessionStorage.setItem(DEVELOPMENT_RELOAD_KEY, 'true');
			window.location.reload();
			return;
		}
		sessionStorage.removeItem(DEVELOPMENT_RELOAD_KEY);
		return;
	}

	const hadController = Boolean(navigator.serviceWorker.controller);
	let reloading = false;
	if (hadController) {
		navigator.serviceWorker.addEventListener('controllerchange', () => {
			if (reloading) return;
			reloading = true;
			window.location.reload();
		});
	}

	const registration = await navigator.serviceWorker.register(SERVICE_WORKER_PATH, { scope: '/' });
	if (registration.waiting) notifyUpdate(registration);

	registration.addEventListener('updatefound', () => {
		const installingWorker = registration.installing;
		if (!installingWorker) return;
		installingWorker.addEventListener('statechange', () => {
			if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) notifyUpdate(registration);
		});
	});
};

export const SERVICE_WORKER_UPDATE_EVENT = UPDATE_EVENT;
