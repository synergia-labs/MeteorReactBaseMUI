import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    //region Configurações de contas
    Accounts.config({
        sendVerificationEmail: false, 
        forbidClientAccountCreation: false,
        defaultFieldSelector: { services: 0 }
    });
});