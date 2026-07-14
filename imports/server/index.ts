import './environment';
import './health';
import './browserPolicy';
import './rateLimits';
import './databaseIndexes';
import './registerApi';
import './fixtures';
import './accounts';
import FacebookOAuthInit from './oauth-facebook';
import GoogleOAuthInit from './oauth-google';
import { Meteor } from 'meteor/meteor';

Meteor.startup(async () => {
	await FacebookOAuthInit();
	await GoogleOAuthInit();
});
