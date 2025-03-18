import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import userProfileServer from '../server';
import getVerificationEmailTemplate from '../../frontend/email/emailVerification';

Meteor.startup(() => {
	//region Configurações de contas
	Accounts.config({
		sendVerificationEmail: true,
		forbidClientAccountCreation: false,
		defaultFieldSelector: { services: 0 }
	});

	Accounts.emailTemplates.siteName = Meteor.settings?.public?.appName;
	Accounts.emailTemplates.from = Meteor.settings?.email?.system_sender;
	process.env.MAIL_URL = Meteor.settings?.email?.url;

	Accounts.emailTemplates.verifyEmail = getVerificationEmailTemplate();
	Accounts.onLogin(userProfileServer.onLogin.bind(userProfileServer));
	Accounts.onLogout(userProfileServer.onLogout.bind(userProfileServer));
});
