import './browserPolicy';
import './databaseIndexes';
import './registerApi';
import './fixtures';
import './accounts';
import FacebookOAuthInit from './initProcess/oauth-facebook';
import GoogleOAuthInit from './initProcess/oauth-google';
import { Meteor } from 'meteor/meteor';
import { initRoles } from './initProcess/initRoles';

Meteor.startup(() => {
	FacebookOAuthInit();
	GoogleOAuthInit();

	initRoles();
});
