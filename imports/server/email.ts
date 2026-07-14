import { Email } from 'meteor/email';
import { Meteor } from 'meteor/meteor';
import { serverSettings as settings } from '/imports/config/serverSettings';

declare const SSR: {
	compileTemplate(name: string, content: string): void;
	render(name: string, data: Record<string, unknown>): string;
};
declare const Assets: { getText(path: string): string };

const configureMailServer = () => {
	if (settings.mail_url_smtp) process.env.MAIL_URL = settings.mail_url_smtp;
};

export const getHTMLEmailTemplate = (title = settings.name, text = 'Message', footer = '') => {
	SSR.compileTemplate('htmlEmail', Assets.getText('templateEmail.html'));
	const email = SSR.render('htmlEmail', {
		title,
		text,
		footer
	});
	return email;
};

type SystemEmail = {
	to: string;
	subject: string;
	message: string;
};

/** Server-only primitive. Client methods must expose named business actions, never arbitrary email content. */
export const sendSystemEmail = async ({ to, subject, message }: SystemEmail) => {
	if (!to || !subject || !message) throw new Error('E-mail incompleto.');

	await Email.sendAsync({
		to,
		from: settings.mail_system || settings.mail_no_reply,
		replyTo: settings.mail_no_reply,
		subject,
		html: getHTMLEmailTemplate(subject, message)
	});
};

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
	configureMailServer();
});
