import { userprofileServerApi } from '../modules/userprofile/api/userProfileServerApi';
import { Meteor } from 'meteor/meteor';

Meteor.startup(async () => {
	const collection = userprofileServerApi.getCollectionInstance();
	await Promise.all([
		collection.createIndexAsync({ email: 1 }),
		collection.createIndexAsync({ username: 1 }),
		collection.createIndexAsync({ status: 1, createdat: -1 }),
		collection.createIndexAsync({ roles: 1 })
	]);
});
