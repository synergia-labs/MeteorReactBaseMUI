import './browserPolicy';
import './databaseIndexes';
import './registerApi';
import './fixtures';
import '../modules/userprofile/backend/services/index'
import { initRoles } from './initProcess/initRoles';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  initRoles();
});
