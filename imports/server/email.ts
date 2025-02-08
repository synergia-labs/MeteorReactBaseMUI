import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import settings from '/settings';

const configureMailServer = () => {
	// process.env.MAIL_URL = 'smtp://192.168.0.13:25';
	process.env.MAIL_URL = settings.mail_url_smtp;
};

export const getHTMLEmailTemplate = (title = settings.name, text = 'Message', footer) => {
	SSR.compileTemplate('htmlEmail', Assets.getText('templateEmail.html'));
	const email = SSR.render('htmlEmail', {
		title,
		text,
		footer
	});
	return email;
};

function sendEmail(to, from, subject, msg, attachments = [], callback) {
	// Make sure that all arguments are strings.
	check([to, from, subject, msg], [String]);
	// Let other method calls from the same client start running, without
	// waiting for the email sending to complete.
	// this.unblock();
	try {
		const a = Email.send({
			to,
			from,
			subject,
			replyTo: settings.mail_no_reply,
			html: getHTMLEmailTemplate(subject, msg),
			attachments
		});
		return 'EMAIL OK';
	} catch (e) {
		throw e;
	}
}

Meteor.methods({
	sendEmail
});

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
	configureMailServer();
});
