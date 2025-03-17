import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import userProfileServer from '../server';
import { renderToString } from 'react-dom/server';

const teste: EmailFields = {
	
}

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
		},
	};

	Accounts.onLogin(userProfileServer.onLogin.bind(userProfileServer));
	Accounts.onLogout(userProfileServer.onLogout.bind(userProfileServer));
});
