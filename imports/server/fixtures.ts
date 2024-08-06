import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { userprofileServerApi } from '../modules/userprofile/api/UserProfileServerApi';

const rootPath = Meteor.rootPath;
const absolutePath = Meteor.absolutePath;

console.log('Meteor PATHs - rootPath:', rootPath);
console.log('Meteor PATHs - absolutePath:', absolutePath);

async function createDefautUser() {
	// if (Meteor.isDevelopment && Meteor.users.find().count() === 0) {
	console.log('ENTRNDO');
	const count = await Meteor.users.find({}).countAsync();
	console.log('COUNT', count);
	if ((await Meteor.users.find({}).countAsync()) === 0) {
		let createdUserId = '';
		createdUserId = await Accounts.createUserAsync({
			username: 'Administrador',
			email: 'admin@mrb.com',
			password: 'admin@mrb.com'
		});

		console.log('createdUserId', createdUserId, '<<<');

		await Meteor.users.upsertAsync(
			{ _id: createdUserId },
			{
				$set: {
					'emails.0.verified': true,
					profile: {
						name: 'Admin',
						email: 'admin@mrb.com'
					}
				}
			}
		);

		await userprofileServerApi.getCollectionInstance().insertAsync({
			_id: createdUserId,
			username: 'Administrador',
			email: 'admin@mrb.com',
			roles: ['Administrador']
		});
		console.log('############## ADMIN CRIADO################');
	} else {
		console.log('Usuário já criado');
	}
}

// if the database is empty on server start, create some sample data.
Meteor.startup(async () => {
	console.log('fixtures Meteor.startup');
	// Add default admin account
	await createDefautUser();
});
