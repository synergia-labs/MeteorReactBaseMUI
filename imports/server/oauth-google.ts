// server/imports/oauth-facebook.js

import { ServiceConfiguration } from 'meteor/service-configuration';
import { Meteor } from 'meteor/meteor';
import { OAuth } from 'meteor/oauth';
import { HTTP } from 'meteor/http';
import _ from 'lodash';
import { userprofileServerApi } from '../modules/userprofile/api/userProfileServerApi';
import settings from '../../settings.json';

const whitelistedFields = [
	'id',
	'email',
	'name',
	'first_name',
	'last_name',
	'link',
	'gender',
	'locale',
	'age_range',
	'verified_email'
];

// https://developers.google.com/identity/sign-in/ios/backend-auth
const validIdToken = (idToken, config) => {
	try {
		const res = HTTP.get('https://www.googleapis.com/oauth2/v3/tokeninfo', {
			params: { id_token: idToken }
		});

		console.log('#############################################');
		console.log('validIdToken', idToken, config);
		console.log('#############################################');
		console.log('res', res);
		console.log('#############################################');
		if (res && res.statusCode === 200) {
			if (config.validClientIds.indexOf(res.data.aud) !== -1) {
				return res.data;
			}
			return null;
		}
		return null;
	} catch (err) {
		console.log('err', JSON.stringify(err));
		return null;
	}
};

const getIdentity = (accessToken) => {
	try {
		return HTTP.get('https://www.googleapis.com/oauth2/v1/userinfo', {
			params: { access_token: accessToken }
		}).data;
	} catch (err) {
		throw _.extend(new Error(`Failed to fetch identity from Google. ${err.message}`), {
			response: err.response
		});
	}
};

const getScopes = (accessToken) => {
	try {
		return HTTP.get('https://www.googleapis.com/oauth2/v1/tokeninfo', {
			params: { access_token: accessToken }
		}).data.scope.split(' ');
	} catch (err) {
		throw _.extend(new Error(`Failed to fetch tokeninfo from Google. ${err.message}`), {
			response: err.response
		});
	}
};

const exchangeAuthCode = (authCode, config) => {
	let response;
	try {
		response = HTTP.post('https://www.googleapis.com/oauth2/v4/token', {
			params: {
				code: authCode,
				client_id: config.clientId,
				client_secret: OAuth.openSecret(config.secret),
				grant_type: 'authorization_code'
			}
		});
	} catch (err) {
		// throw _.extend(new Error("Failed to exchange Google auth code for refresh token. " + err.message),
		//                {response: err.response});
		return null;
	}

	return response.data;
};

// Taken from Meteor 1.5.1 facebook-oauth
const handleAuthFromAccessToken = (accessToken, expiresAt) => {
	const identity = getIdentity(accessToken, whitelistedFields);

	const serviceData = {
		accessToken,
		expiresAt
	};

	const fields = _.pick(identity, whitelistedFields);
	_.extend(serviceData, fields);

	return {
		serviceData,
		options: { profile: { name: identity.name, email: serviceData.email } }
	};
};

const registerGoogleMobileLoginHandler = async () => {
	await Accounts.registerLoginHandler('google', async (serviceData) => {
		const loginRequest = serviceData.google;

		if (!loginRequest) {
			return undefined;
		}

		const serviceConfig = ServiceConfiguration.configurations.findOne({
			service: 'google'
		});
		if (!serviceConfig) {
			throw new ServiceConfiguration.ConfigError();
		}

		console.log('#### serviceConfig', serviceConfig);

		const expiresAt = +new Date() + 1000 * parseInt(loginRequest.accessTokenExpirationDate || 6000000, 10);
		const accessToken = loginRequest.accessToken;
		const idToken = loginRequest.idToken;

		if (!idToken) {
			throw new Meteor.Error(401, 'Google login without idToken');
		}

		const validToken = validIdToken(idToken, serviceConfig);

		console.log('>>>validToken:', validToken);

		if (!validToken) {
			throw new Meteor.Error(500, 'Failed to link Google', accessToken);
		}

		const scopes = getScopes(accessToken);
		const identity = getIdentity(accessToken);

		console.log('@@@@@@@ >>>identity:', identity);

		serviceData = {
			accessToken,
			expiresAt,
			idToken,
			scope: scopes
		};

		console.log('@@@@@@@ >>>NEW serviceData 1:', serviceData);

		const fields = _.pick(identity, whitelistedFields);
		_.extend(serviceData, fields);

		if (loginRequest.serverAuthCode) {
			const authCodes = exchangeAuthCode(loginRequest.serverAuthCode, serviceConfig);

			if (authCodes) {
				serviceData.accessToken = authCodes.access_token;
				serviceData.expiresAt = +new Date() + 1000 * parseInt(authCodes.expires_in, 10);
				serviceData.idToken = authCodes.id_token;

				if (authCodes.refresh_token) {
					serviceData.refreshToken = authCodes.refresh_token;
				}
			}
		}

		console.log('@@@@@@@ >>>NEW serviceData 2:', serviceData);

		const user = {};
		user.username = `${serviceData.name}`;
		user.name = `${serviceData.name}`;
		user.email = serviceData.email;

		const userProfile = await userprofileServerApi.collectionInstance.findOneAsync({
			email: user.email
		});

		if (!userProfile) {
			console.log('New Google User', user);
			user.roles = ['Usuario'];
			user.otheraccounts = [{ _id: user._id, service: 'Google' }];

			const userProfileID = userprofileServerApi.collectionInstance.insert(user);

			delete user.otheraccounts;

			// /const existingUser = Meteor.users.findOne({ 'services.google.id': validToken.sub });
			user._id = await Meteor.users.insertAsync({
				services: {
					google: serviceData
				},
				profile: {
					name: serviceData.name,
					email: serviceData.email
				},
				...user
			});
		} else {
			console.log('Já cadastrado');

			const existingUser = await Meteor.users.findOneAsync({
				'services.google.id': validToken.sub
			});

			if (!existingUser) {
				user._id = Meteor.users.insert({
					services: {
						google: serviceData
					},
					profile: {
						name: serviceData.name,
						email: serviceData.email
					},
					...user
				});
			} else {
				user._id = existingUser._id;
				await Meteor.users.updateAsync(
					{ _id: existingUser._id },
					{
						$set: {
							profile: {
								name: serviceData.name,
								email: serviceData.email
							},
							roles: existingUser.roles ? existingUser.roles : ['Usuario']
						}
					}
				);

				await userprofileServerApi.collectionInstance.updateAsync(
					{ _id: userProfile._id },
					{
						$addToSet: {
							otheraccounts: {
								_id: existingUser._id,
								service: 'google'
							}
						}
					}
				);
			}
		}

		return { userId: user._id };
	});
};

const init = async () => {
	if (!settings || !settings.settingsGoogle) return;

	await ServiceConfiguration.configurations.upsertAsync(
		{ service: 'google' },
		{
			$set: {
				service: 'google',
				clientId: settings.settingsGoogle.client_id,
				secret: settings.settingsGoogle.client_secret,
				validClientIds: settings.settingsGoogle.validClientIds
			}
		}
	);

	registerGoogleMobileLoginHandler();
};

export default init;
