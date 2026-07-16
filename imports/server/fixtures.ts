import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { userprofileServerApi } from '../modules/userprofile/api/userProfileServerApi';

async function createDefaultUser() {
	const defaultAdminUsername = process.env.DEFAULT_ADMIN_USERNAME;
	const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL?.trim().toLowerCase();
	const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
	const suppliedValues = [defaultAdminUsername, defaultAdminEmail, defaultAdminPassword].filter(Boolean).length;

	if (suppliedValues === 0) {
		console.info('Bootstrap administrativo desabilitado; nenhuma credencial inicial foi fornecida.');
		return;
	}
	if (suppliedValues !== 3 || !defaultAdminUsername || !defaultAdminEmail || !defaultAdminPassword) {
		throw new Error('Defina DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_EMAIL e DEFAULT_ADMIN_PASSWORD em conjunto.');
	}
	if (defaultAdminPassword.length < 14) {
		throw new Error('DEFAULT_ADMIN_PASSWORD deve ter pelo menos 14 caracteres.');
	}

	const existingUser = await Accounts.findUserByEmail(defaultAdminEmail);
	if (existingUser) return;

	const createdUserId = await Accounts.createUserAsync({
		username: defaultAdminUsername,
		email: defaultAdminEmail,
		password: defaultAdminPassword
	});

	await Meteor.users.upsertAsync(
		{ _id: createdUserId },
		{
			$set: {
				'emails.0.verified': true,
				profile: {
					name: defaultAdminUsername,
					email: defaultAdminEmail
				}
			}
		}
	);

	await userprofileServerApi.getCollectionInstance().upsertAsync(
		{ _id: createdUserId },
		{
			$set: {
				_id: createdUserId,
				username: defaultAdminUsername,
				email: defaultAdminEmail,
				roles: ['Administrador'],
				status: 'active'
			}
		}
	);
}

// if the database is empty on server start, create some sample data.
Meteor.startup(async () => {
	console.log('fixtures Meteor.startup');
	// Add default admin account
	await createDefaultUser();
});
