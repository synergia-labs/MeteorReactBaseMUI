// server/imports/oauth-facebook.js

import { ServiceConfiguration } from 'meteor/service-configuration';
import { OAuth } from 'meteor/oauth';
import { HTTP } from 'meteor/http';
import crypto from 'crypto';
import _ from 'lodash';
import settings from '../../settings.json';

const whitelistedFields = ['id', 'email', 'name', 'first_name', 'last_name', 'link', 'gender', 'locale', 'age_range'];

// Taken from Meteor 1.5.1 facebook-oauth
const getIdentity = (accessToken, fields) => {
	const config = ServiceConfiguration.configurations.findOne({
		service: 'facebook'
	});

	if (!config) {
		throw new ServiceConfiguration.ConfigError();
	}

	const hmac = crypto.createHmac('sha256', OAuth.openSecret(config.secret));
	hmac.update(accessToken);

	try {
		return HTTP.get('https://graph.facebook.com/v2.8/me', {
			params: {
				access_token: accessToken,
				appsecret_proof: hmac.digest('hex'),
				fields: fields.join(',')
			}
		}).data;
	} catch (err) {
		throw _.extend(new Error(`Failed to fetch identity from Facebook. ${err.message}`), {
			response: err.response
		});
	}
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

const registerFacebookMobileLoginHandler = () => {
	Accounts.registerLoginHandler('facebookMobileLogin', (params) => {
		const data = params.facebookMobileLogin;

		console.log('>>>Data:', data);

		if (!data) {
			return undefined;
		}

		const identity = handleAuthFromAccessToken(data.accessToken, +new Date() + 1000 * data.expirationTime);

		console.log('>>>identity:', identity);

		const facebookUser = Accounts.updateOrCreateUserFromExternalService(
			'facebook',
			{
				...identity.serviceData
			},
			identity.options
		);
		const user = { ...facebookUser };

		user.username = identity.serviceData.name;
		user.emails = [{ address: identity.serviceData.email }];
		user.email = identity.serviceData.email;
		user._id = user.userId;
		user.roles = ['Usuario'];
		user.profile = {
			name: identity.serviceData.name,
			email: identity.serviceData.email
		};
		return facebookUser;
	});
};

const init = () => {
	if (!settings || settings.settingsFacebook) return;

	ServiceConfiguration.configurations.upsert(
		{ service: 'facebook' },
		{
			$set: {
				appId: settings.settingsFacebook.appId,
				secret: settings.settingsFacebook.secret
			}
		}
	);

	registerFacebookMobileLoginHandler();
};

export default init;
