import { ServiceConfiguration } from 'meteor/service-configuration';
import { Accounts } from 'meteor/accounts-base';
import { OAuth } from 'meteor/oauth';
import { Meteor } from 'meteor/meteor';
import crypto from 'crypto';
import { serverSettings as settings } from '/imports/config/serverSettings';

const oauthTimeoutMs = Number(process.env.OAUTH_HTTP_TIMEOUT_MS || 8000);
const facebookFields = ['id', 'email', 'name', 'first_name', 'last_name', 'link', 'locale'] as const;

const fetchJson = async (url: URL, init?: RequestInit) => {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), oauthTimeoutMs);
	try {
		const response = await fetch(url, { ...init, signal: controller.signal });
		if (!response.ok)
			throw new Meteor.Error('oauth-provider-error', `Facebook respondeu com status ${response.status}.`);
		return await response.json();
	} finally {
		clearTimeout(timeout);
	}
};

const getIdentity = async (accessToken: string) => {
	const config: any = await ServiceConfiguration.configurations.findOneAsync({ service: 'facebook' });
	if (!config) throw new Meteor.Error('oauth-not-configured', 'Facebook OAuth não configurado.');
	const secret = OAuth.openSecret(config.secret);
	const appsecretProof = crypto.createHmac('sha256', secret).update(accessToken).digest('hex');

	const debugUrl = new URL('https://graph.facebook.com/debug_token');
	debugUrl.searchParams.set('input_token', accessToken);
	debugUrl.searchParams.set('access_token', `${config.appId}|${secret}`);
	const debug = await fetchJson(debugUrl);
	if (!debug.data?.is_valid || debug.data?.app_id !== config.appId || !debug.data?.user_id) {
		throw new Meteor.Error('oauth-invalid-token', 'Token Facebook inválido.');
	}

	const identityUrl = new URL('https://graph.facebook.com/me');
	identityUrl.searchParams.set('access_token', accessToken);
	identityUrl.searchParams.set('appsecret_proof', appsecretProof);
	identityUrl.searchParams.set('fields', facebookFields.join(','));
	const identity = await fetchJson(identityUrl);
	if (identity.id !== debug.data.user_id || !identity.email) {
		throw new Meteor.Error('oauth-identity-mismatch', 'A identidade Facebook não pôde ser confirmada.');
	}
	return identity;
};

const registerFacebookMobileLoginHandler = () => {
	(Accounts.registerLoginHandler as any)('facebookMobileLogin', async (request: any) => {
		const data = request.facebookMobileLogin;
		if (!data) return undefined;
		if (typeof data.accessToken !== 'string') {
			throw new Meteor.Error('oauth-invalid-request', 'Credencial Facebook incompleta.');
		}

		const identity = await getIdentity(data.accessToken);
		const serviceData: Record<string, unknown> = {
			accessToken: data.accessToken,
			expiresAt: Date.now() + Math.max(0, Number(data.expirationTime || 0)) * 1000
		};
		for (const field of facebookFields) {
			if (identity[field] !== undefined) serviceData[field] = identity[field];
		}

		return await (Accounts as any).updateOrCreateUserFromExternalService('facebook', serviceData, {
			profile: { name: identity.name, email: identity.email }
		});
	});
};

const init = async () => {
	const facebook = settings.settingsFacebook;
	if (!facebook?.appId || !facebook?.secret) return;
	await ServiceConfiguration.configurations.upsertAsync(
		{ service: 'facebook' },
		{ $set: { appId: facebook.appId, secret: facebook.secret } }
	);
	registerFacebookMobileLoginHandler();
};

export default init;
