import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";
import { BrowserPolicy } from "meteor/browser-policy-common";

/**
 * Browser Policy
 * Define políticas de segurança para evitar ataques como XSS e clickjacking.
 */

const initBrowserPolicy = () => {
	const allowedOrigins = [
		"fonts.googleapis.com",
		"fonts.gstatic.com",
		"maps.gstatic.com",
		"maps.googleapis.com",
		"www.youtube.com",
		"i.ytimg.com",
		"localhost:3000",
		Meteor.absoluteUrl()
	];

	// Aplicar permissões de origem para scripts, estilos, fontes e outros
	allowedOrigins.forEach((origin) => {
		BrowserPolicy.content.allowScriptOrigin(origin);
		BrowserPolicy.content.allowStyleOrigin(origin);
		BrowserPolicy.content.allowFontOrigin(origin);
		BrowserPolicy.content.allowOriginForAll(origin);
	});

	// Permitir URLs de dados para fontes e imagens
	BrowserPolicy.content.allowDataUrlForAll();

	// Permitir scripts inline e blobs (necessário para algumas aplicações)
	BrowserPolicy.content.allowInlineScripts();
	BrowserPolicy.content.allowOriginForAll("blob:");

	// Adicionar cabeçalhos de segurança extras
	WebApp.connectHandlers.use((_, res, next) => {
		res.setHeader(
			"Content-Security-Policy",
			[
				"default-src 'self';",
				"script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.googleapis.com *.gstatic.com;",
				"style-src 'self' 'unsafe-inline' *.googleapis.com *.gstatic.com;",
				"font-src 'self' data: *.gstatic.com;",
				"img-src 'self' data:;",
				"frame-src 'none';",
				"upgrade-insecure-requests;"
			].join(" ")
		);
		res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
		res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
		res.setHeader("X-Content-Type-Options", "nosniff");
		res.setHeader("X-Frame-Options", "DENY");
		res.setHeader("X-XSS-Protection", "1; mode=block");

		next();
	});
};

export default initBrowserPolicy;
