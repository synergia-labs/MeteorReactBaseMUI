import './browserPolicy';
import './databaseIndexes';
import './registerApi';
import './fixtures';
import './accounts';
import FacebookOAuthInit from './oauth-facebook';
import GoogleOAuthInit from './oauth-google';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	FacebookOAuthInit();
	GoogleOAuthInit();
});
