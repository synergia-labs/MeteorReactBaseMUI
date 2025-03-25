import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import verificationEmailTemplate from "../../modules/userprofile/common/emails/accountsEmails/sendEmailVerificationTemplate/sendEmailVerificationTempalte";
import resetPasswordEmailTemplate from "../../modules/userprofile/common/emails/accountsEmails/sendEmailResetPasswordTemplate/sendEmailResetPasswordTemplate.view";
import enrollAccountEmailTemplate from "../../modules/userprofile/common/emails/accountsEmails/sendEmailEnrollAccountTemplate/sendEmailEnrollAccountTemplate.view";
import usersServer from "/imports/modules/userprofile/backend/server";
import { externalLoginServicesInstances } from "/imports/modules/userprofile/backend/services/register";

export async function initAccounts() {
	//region Configuração de contas
	Accounts.config({
		sendVerificationEmail: true,
		forbidClientAccountCreation: true,
		ambiguousErrorMessages: true,
		defaultFieldSelector: { services: 0 }
	});

	//region Configuração de e-mails
	Accounts.emailTemplates.siteName = Meteor.settings?.public?.appName;
	Accounts.emailTemplates.from = Meteor.settings?.email?.system_sender;
	process.env.MAIL_URL = Meteor.settings?.email?.url;

	Accounts.emailTemplates.verifyEmail = verificationEmailTemplate();
	Accounts.emailTemplates.resetPassword = resetPasswordEmailTemplate();
	Accounts.emailTemplates.enrollAccount = enrollAccountEmailTemplate();

	Accounts.urls.resetPassword = (token: string) => Meteor.absoluteUrl(`guest/reset-password/${token}`);
	Accounts.urls.verifyEmail = (token: string) => Meteor.absoluteUrl(`guest/verify-email/${token}`);
	Accounts.urls.enrollAccount = (token: string) => Meteor.absoluteUrl(`guest/enroll-account/${token}`);

	//region Configuração de autenticação
	Accounts.onLogin(usersServer.onLogin.bind(usersServer));
	Accounts.onLogout(usersServer.onLogout.bind(usersServer));
	Accounts.validateLoginAttempt(usersServer.validateLoginAttempt.bind(usersServer));

	//region Configuração de autenticação externa
	for (const oAuthInstance of externalLoginServicesInstances) await oAuthInstance.register();

	(Accounts as any).setAdditionalFindUserOnExternalLogin(
		async ({ serviceName, serviceData }: { serviceName: string; serviceData: any }) => {
			const authInstance = externalLoginServicesInstances.find(
				(oAuthInstance) => oAuthInstance.getServiceName() === serviceName
			);
			if (authInstance) return await authInstance.additionalFindUserOnExternalLogin(serviceData);
		}
	);
}
