const CACHE_PREFIX = 'meteor-react-base-';
const CACHE_NAME = `${CACHE_PREFIX}static-v1`;
const LEGACY_CACHE_PREFIX = 'MSW V';
const OFFLINE_URL = '/offline.html';

const PUBLIC_ASSET_DIRECTORIES = ['/fonts/', '/images/'];
const PUBLIC_ASSET_FILES = new Set(['/manifest.json']);
const CACHEABLE_DESTINATIONS = new Set(['font', 'image', 'script', 'style']);

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))));
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) =>
				Promise.all(
					cacheNames
						.filter(
							(cacheName) =>
								(cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME) ||
								cacheName.startsWith(LEGACY_CACHE_PREFIX)
						)
						.map((cacheName) => caches.delete(cacheName))
				)
			)
			.then(() => self.clients.claim())
	);
});

self.addEventListener('message', (event) => {
	if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
	const { request } = event;
	if (request.method !== 'GET') return;

	const url = new URL(request.url);
	if (url.origin !== self.location.origin) return;

	if (request.mode === 'navigate') {
		event.respondWith(networkNavigationOrOffline(request));
		return;
	}

	if (!isPublicCacheableAsset(request, url)) return;

	event.respondWith(url.searchParams.has('hash') ? cacheFirst(request) : networkFirst(request));
});

const networkNavigationOrOffline = async (request) => {
	try {
		return await fetch(request);
	} catch {
		return (
			(await caches.match(OFFLINE_URL)) ||
			new Response('Aplicação indisponível sem conexão.', {
				status: 503,
				headers: { 'Content-Type': 'text/plain; charset=utf-8' }
			})
		);
	}
};

const cacheFirst = async (request) => {
	const cached = await caches.match(request);
	if (cached) return cached;
	return fetchAndCache(request);
};

const networkFirst = async (request) => {
	try {
		return await fetchAndCache(request);
	} catch (error) {
		const cached = await caches.match(request);
		if (cached) return cached;
		throw error;
	}
};

const fetchAndCache = async (request) => {
	const response = await fetch(request);
	if (!canStoreResponse(response)) return response;

	const cache = await caches.open(CACHE_NAME);
	await cache.put(request, response.clone());
	return response;
};

const isPublicCacheableAsset = (request, url) => {
	if (url.searchParams.has('hash')) return CACHEABLE_DESTINATIONS.has(request.destination);
	if (PUBLIC_ASSET_FILES.has(url.pathname)) return true;
	return (
		CACHEABLE_DESTINATIONS.has(request.destination) &&
		PUBLIC_ASSET_DIRECTORIES.some((directory) => url.pathname.startsWith(directory))
	);
};

const canStoreResponse = (response) => {
	if (!response.ok || response.type !== 'basic') return false;
	const cacheControl = response.headers.get('cache-control')?.toLowerCase() || '';
	return !cacheControl.includes('no-store') && !cacheControl.includes('private');
};
