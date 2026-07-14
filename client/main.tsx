import React from 'react';
import { Meteor } from 'meteor/meteor';
import { App } from '/imports/app/app';
import { createRoot } from 'react-dom/client';
import { initializeServiceWorker } from '/imports/app/registerServiceWorker';

Meteor.startup(() => {
	const container = document.getElementById('react-target');
	// @ts-ignore
	const root = createRoot(container);
	root.render(<App />);
	void initializeServiceWorker().catch((error) => console.error('service worker initialization failed', error));
});
