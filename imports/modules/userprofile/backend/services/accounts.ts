import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import userProfileServer from '../server';
import verificationEmailTemplate from '../../common/emails/sendEmailVerificationTemplate/sendEmailVerificationTempalte';
import resetPasswordEmailTemplate from '../../common/emails/sendEmailResetPasswordTemplate/sendEmailResetPasswordTemplate.view';

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
	Accounts.emailTemplates.resetPassword = resetPasswordEmailTemplate();
	Accounts.onLogin(userProfileServer.onLogin.bind(userProfileServer));
	Accounts.onLogout(userProfileServer.onLogout.bind(userProfileServer));
});
