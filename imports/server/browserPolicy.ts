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
	const applicationOrigin = new URL(Meteor.absoluteUrl()).origin;
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
	if (allowFontOrigin.length > 0) BrowserPolicy.content.allowDataUrlForAll();

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

	if (process.env.NODE_ENV !== 'production') BrowserPolicy.content.allowInlineScripts();
	BrowserPolicy.content.allowOriginForAll('blob:');

	// Additional security headers
	WebApp.connectHandlers.use((req, res, next) => {
		const production = process.env.NODE_ENV === 'production';
		res.setHeader(
			'Content-Security-Policy',
			`default-src 'self'; script-src 'self'${production ? '' : " 'unsafe-inline' 'unsafe-eval'"} *.googletagmanager.com *.googleapis.com *.gstatic.com; style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com; font-src 'self' data: *.gstatic.com; img-src 'self' data: blob: *.googleusercontent.com *.gstatic.com *.googleapis.com; connect-src 'self' ${applicationOrigin} wss: *.googleapis.com *.gstatic.com; frame-src 'none'; object-src 'none'; base-uri 'self'; frame-ancestors 'none';${production ? ' upgrade-insecure-requests;' : ''}`
		);
		if (
			/\.(?:js|css|woff2?|png|jpe?g|gif|webp|svg)(?:\?|$)/i.test(req.url || '') &&
			/[?&](?:hash|v)=/i.test(req.url || '')
		) {
			res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
		} else if (/^\/(?:images|fonts)\//i.test(req.url || '') || /^\/manifest\.json(?:\?|$)/i.test(req.url || '')) {
			res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
		} else {
			res.setHeader('Cache-Control', 'no-store');
		}
		if (production) res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
		res.setHeader('X-Content-Type-Options', 'nosniff');
		res.setHeader('X-Frame-Options', 'DENY');
		res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
		res.setHeader('Permissions-Policy', 'camera=(), microphone=(self), geolocation=(), payment=()');

		next();
	});
});
