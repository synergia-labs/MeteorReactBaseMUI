import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { BrowserPolicy } from 'meteor/browser-policy-common';

/**
 * Browser Policy
 * Set security-related policies to be enforced by newer browsers.
 * These policies help prevent and mitigate common attacks like
 * cross-site scripting and clickjacking.
 */

Meteor.startup(() => {
	/**
	 * allowed scripts
	 */
	const allowScriptOrigin = ['fonts.googleapis.com', 'fonts.gstatic.com', 'localhost:3000', `${Meteor.absoluteUrl()}`];
	allowScriptOrigin.forEach((o) => {
		return BrowserPolicy.content.allowScriptOrigin(o);
	});

	/**
	 * allowed styles
	 */
	const allowStyleOrigin = ['fonts.googleapis.com', 'fonts.gstatic.com', 'localhost:3000', `${Meteor.absoluteUrl()}`];
	allowStyleOrigin.forEach((o) => {
		return BrowserPolicy.content.allowStyleOrigin(o);
	});

	const allowFontOrigin = ['fonts.googleapis.com', 'fonts.gstatic.com', 'localhost:3000', `${Meteor.absoluteUrl()}`];
	allowFontOrigin.forEach((o) => {
		return BrowserPolicy.content.allowDataUrlForAll(o);
	});

	const allowAll = [
		'fonts.googleapis.com',
		'maps.gstatic.com',
		'maps.googleapis.com',
		'fonts.gstatic.com',
		'localhost:3000',
		'www.youtube.com',
		'i.ytimg.com',
		`${Meteor.absoluteUrl()}`
	];
	allowAll.forEach((o) => {
		return BrowserPolicy.content.allowOriginForAll(o);
	});

	BrowserPolicy.content.allowInlineScripts('fonts.gstatic.com', 'localhost:3000', `${Meteor.absoluteUrl()}`);
	BrowserPolicy.content.allowOriginForAll('blob:');

	// Additional security headers
	WebApp.connectHandlers.use((req, res, next) => {
		res.setHeader(
			'Content-Security-Policy',
			"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.googleapis.com *.gstatic.com; style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com; font-src 'self' data: *.gstatic.com; img-src 'self' data:; frame-src 'none';"
		);
		res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
		res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
		res.setHeader('X-Content-Type-Options', 'nosniff');
		res.setHeader('X-Frame-Options', 'DENY');
		res.setHeader('X-XSS-Protection', '1; mode=block');
		res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');

		next();
	});
});
