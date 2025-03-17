import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

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

	Accounts.emailTemplates.verifyEmail = {
		subject() {
			return 'Confirme seu endereço de e-mail';
		},
		text(_user, url) {
			return `Olá!\n\nPara confirmar seu endereço de e-mail, clique no link a seguir:\n\n${url}\n\nObrigado!`;
		}
	};

	Accounts.onLogin(async ({ user, connection } : { user: Meteor.User, connection: Meteor.IConnection }) => {
		await Meteor.users.updateAsync(
			{ _id: user._id }, 
			{ $set: { 'profile.connected': true, 'profile.lastAccess': new Date() }}
		);
		
		connection.onClose(Meteor.bindEnvironment(() => {
			Meteor.users.updateAsync(
				{ _id: user._id }, 
				{ $set: { 'profile.connected': false, 'profile.lastAccess': new Date() }}
			);
		}));
	});

	Accounts.onLogout(async ({ user } : { user: Meteor.User }) => {
		await Meteor.users.updateAsync(
			{ _id: user._id }, 
			{ $set: { 'profile.connected': false, 'profile.lastAccess': new Date() }}
		);
	});
});
