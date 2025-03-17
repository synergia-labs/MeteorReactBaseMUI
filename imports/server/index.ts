import { initRoles } from './initProcess/initRoles';

Meteor.startup(() => {
  dotenv.config();
  initRoles();
});

import './browserPolicy';
import './databaseIndexes';
import './registerApi';
import './fixtures';
import '../modules/userprofile/backend/services/index'
import { Meteor } from 'meteor/meteor';
import dotenv from 'dotenv';