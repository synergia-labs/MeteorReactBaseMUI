import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import {userprofileApi} from '../userprofile/api/UserProfileApi';

const rootPath = Meteor.rootPath;
const absolutePath = Meteor.absolutePath;

console.log('Meteor PATHs - rootPath:', rootPath);
console.log('Meteor PATHs - absolutePath:', absolutePath);

function createDefautUser() {
    // if (Meteor.isDevelopment && Meteor.users.find().count() === 0) {
    if (Meteor.users.find().count() === 0) {
        let createdUserId = '';
        createdUserId = Accounts.createUser({
            username: 'Administrador',
            email: 'admin@mrb.com',
            password: 'admin@mrb.com',
        });
        Meteor.users.update(
            {_id: createdUserId},
            {
                $set: {
                    'emails.0.verified': true,
                    profile: {
                        name: 'Admin',
                        email: 'admin@mrb.com',
                    },
                },
            },
        );

        userprofileApi.collectionInstance.insert({
            _id: createdUserId,
            username: 'Administrador',
            email: 'admin@mrb.com',
            roles: ['Administrador'],
        });
    }
}



// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    console.log('fixtures Meteor.startup');
    // Add default admin account
    createDefautUser();
});
