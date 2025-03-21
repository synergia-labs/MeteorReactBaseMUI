import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import usersServer from "../server";
import verificationEmailTemplate from "../../common/emails/sendEmailVerificationTemplate/sendEmailVerificationTempalte";
import resetPasswordEmailTemplate from "../../common/emails/sendEmailResetPasswordTemplate/sendEmailResetPasswordTemplate.view";
import enrollAccountEmailTemplate from "../../common/emails/sendEmailEnrollAccountTemplate/sendEmailEnrollAccountTemplate.view";

Meteor.startup(() => {
	Accounts.config({
		sendVerificationEmail: true,
		forbidClientAccountCreation: true,
		ambiguousErrorMessages: true,
		defaultFieldSelector: { services: 0 }
	});

	Accounts.emailTemplates.siteName = Meteor.settings?.public?.appName;
	Accounts.emailTemplates.from = Meteor.settings?.email?.system_sender;
	process.env.MAIL_URL = Meteor.settings?.email?.url;

	Accounts.emailTemplates.verifyEmail = verificationEmailTemplate();
	Accounts.emailTemplates.resetPassword = resetPasswordEmailTemplate();
	Accounts.emailTemplates.enrollAccount = enrollAccountEmailTemplate();

	Accounts.urls.resetPassword = (token: string) => Meteor.absoluteUrl(`guest/reset-password/${token}`);
	Accounts.urls.verifyEmail = (token: string) => Meteor.absoluteUrl(`guest/verify-email/${token}`);
	Accounts.urls.enrollAccount = (token: string) => Meteor.absoluteUrl(`guest/enroll-account/${token}`);

	Accounts.onLogin(usersServer.onLogin.bind(usersServer));
	Accounts.onLogout(usersServer.onLogout.bind(usersServer));
	// Accounts.validateLoginAttempt((...options: any) => {
	// 	console.info(options);
	// });
});
