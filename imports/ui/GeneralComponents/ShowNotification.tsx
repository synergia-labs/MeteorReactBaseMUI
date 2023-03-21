import React from 'react';
import '../notificationStyle.css';
//@ts-ignore
import AWN from 'awesome-notifications';

interface IShowNotificationOptions {
	type?: string;
	title?: string;
	durations?: number;
	description?: string;
}

let notifier = new AWN({ position: 'bottom-left', maxNotifications: 5 });

export const showNotification = (options: IShowNotificationOptions = {}) => {
	if (!options || !options.type || !notifier[options.type]) {
		return;
	}
	const notificationOptions = {
		labels: {
			[options.type]: options.title?.toUpperCase()
		},
		icons: {
			enabled: true
		},
		durations: {
			[options.type]: options.durations ? options.durations : options.type === 'tip' ? 30000 : 5000
		}
	};
	notifier[options.type](options.description, notificationOptions);
};
