import { ServiceConfiguration } from 'meteor/service-configuration';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { serverSettings as settings } from '/imports/config/serverSettings';

const oauthTimeoutMs = Number(process.env.OAUTH_HTTP_TIMEOUT_MS || 8000);
const googleFields = [
	'sub',
	'email',
	'email_verified',
	'name',
	'given_name',
	'family_name',
	'picture',
	'locale'
] as const;

const fetchJson = async (url: string, init?: RequestInit) => {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), oauthTimeoutMs);
	try {
		const response = await fetch(url, { ...init, signal: controller.signal });
		if (!response.ok) throw new Meteor.Error('oauth-provider-error', `Google respondeu com status ${response.status}.`);
		return await response.json();
	} finally {
		clearTimeout(timeout);
	}
};

const validateIdToken = async (idToken: string, validClientIds: string[]) => {
	const token = await fetchJson(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
	const issuerIsGoogle = token.iss === 'accounts.google.com' || token.iss === 'https://accounts.google.com';
	const isCurrent = Number(token.exp) * 1000 > Date.now();
	const verifiedEmail = token.email_verified === true || token.email_verified === 'true';

	if (!issuerIsGoogle || !isCurrent || !verifiedEmail || !validClientIds.includes(token.aud) || !token.sub) {
		throw new Meteor.Error('oauth-invalid-token', 'Token Google inválido.');
	}
	return token;
};

const getIdentity = (accessToken: string) =>
	fetchJson('https://openidconnect.googleapis.com/v1/userinfo', {
		headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' }
	});

const registerGoogleMobileLoginHandler = () => {
	(Accounts.registerLoginHandler as any)('googleMobileLogin', async (request: any) => {
		const loginRequest = request.google;
		if (!loginRequest) return undefined;
		if (typeof loginRequest.idToken !== 'string' || typeof loginRequest.accessToken !== 'string') {
			throw new Meteor.Error('oauth-invalid-request', 'Credenciais Google incompletas.');
		}

		const config: any = await ServiceConfiguration.configurations.findOneAsync({ service: 'google' });
		if (!config) throw new Meteor.Error('oauth-not-configured', 'Google OAuth não configurado.');
		const validClientIds = Array.from(new Set([config.clientId, ...(config.validClientIds || [])].filter(Boolean)));
		const token = await validateIdToken(loginRequest.idToken, validClientIds);
		const identity = await getIdentity(loginRequest.accessToken);

		if (identity.sub !== token.sub || identity.email !== token.email || !identity.email_verified) {
			throw new Meteor.Error('oauth-identity-mismatch', 'A identidade Google não corresponde ao token.');
		}

		const serviceData: Record<string, unknown> = {
			id: token.sub,
			accessToken: loginRequest.accessToken,
			idToken: loginRequest.idToken,
			expiresAt: Number(token.exp) * 1000
		};
		for (const field of googleFields) {
			if (identity[field] !== undefined) serviceData[field] = identity[field];
		}

		return await (Accounts as any).updateOrCreateUserFromExternalService('google', serviceData, {
			profile: { name: identity.name, email: identity.email }
		});
	});
};

const init = async () => {
	const google = settings.settingsGoogle;
	if (!google?.client_id || !google?.client_secret) return;
	const validClientIds = Array.from(new Set([google.client_id, ...(google.validClientIds || [])].filter(Boolean)));

	await ServiceConfiguration.configurations.upsertAsync(
		{ service: 'google' },
		{ $set: { service: 'google', clientId: google.client_id, secret: google.client_secret, validClientIds } }
	);
	registerGoogleMobileLoginHandler();
};

export default init;
