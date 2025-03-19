import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import userProfileServer from '../server';
import verificationEmailTemplate from '../../common/emails/sendEmailVerificationTemplate/sendEmailVerificationTempalte';

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

	Accounts.emailTemplates.verifyEmail = verificationEmailTemplate();
	Accounts.onLogin(userProfileServer.onLogin.bind(userProfileServer));
	Accounts.onLogout(userProfileServer.onLogout.bind(userProfileServer));
});
