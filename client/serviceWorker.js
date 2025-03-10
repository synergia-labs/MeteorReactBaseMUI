import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	navigator.serviceWorker
		.register('/sw.js')
		.then(() => console.info('service worker registered'))
		.catch((error) => {
			console.log('ServiceWorker registration failed: ', error);
		});

	const originalFetch = window.fetch;
	window.fetch = function (url, options = {}) {
		const userId = Meteor.userId();

		// Adicionando o userId ao cabeçalho de todas as requisições

		options.headers = options.headers || {};
		options.headers['X-User-Id'] = userId ?? '10101212'; // Incluindo o userId no cabeçalho

		// Chama o fetch original com os novos cabeçalhos
		return originalFetch(url, options);
	};
});
