import './browserPolicy';
import './registerApi';
import './fixtures';
import './accounts';
import FacebookOAuthInit from './oauth-facebook';
import GoogleOAuthInit from './oauth-google';

Meteor.startup(() => {
  FacebookOAuthInit();
  GoogleOAuthInit();

});