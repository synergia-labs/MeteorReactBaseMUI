import { Meteor } from "meteor/meteor";
import { initRouters } from "./start/initRouters";

Meteor.startup(() => {
	navigator.serviceWorker
		.register("/sw.js")
		.then(() => console.info("service worker registered"))
		.catch((error) => {
			console.info("ServiceWorker registration failed: ", error);
		});

	initRouters();
});
