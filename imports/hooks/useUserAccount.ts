import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { createStore, del, get, set } from 'idb-keyval';
import { parse, stringify } from 'zipson';
import settings from '/settings.json';
import { ReactiveVar } from 'meteor/reactive-var';
import { userprofileApi } from '../modules/userprofile/api/UserProfileApi';
import { IUserProfile } from '../modules/userprofile/api/UserProfileSch';

const accountStore = createStore(`${settings.name}_UserAccount`, 'store');
const cachedUser = new ReactiveVar(null);

export const cleanUserCache = () => del('userId', accountStore);

export const useUserAccount = () =>
	useTracker(() => {
		const isConnected = Meteor.status().connected;

		if (!isConnected)
			return {
				user: undefined,
				userId: undefined,
				userLoading: true,
				isLoggedIn: false,
				connected: false
			};

		let meteorUser = Meteor.user();
		let userId = Meteor.userId();

		const getStoredUser = () =>
			get('userId', accountStore).then((result) => {
				cachedUser.set(result ? parse(result) : null);
			});

		if (userId) set('userId', stringify(meteorUser), accountStore);
		else if (Meteor.status().status === 'waiting') {
			meteorUser = cachedUser.get();
			//@ts-ignore
			userId = meteorUser?._id;
			!userId && getStoredUser();
		} else del('userId', accountStore);

		const subHandle = userprofileApi.subscribe('getLoggedUserProfile');

		const user: IUserProfile | null =
			subHandle.ready() && meteorUser
				? userprofileApi.findOne({
						//@ts-ignore
						email: meteorUser?.profile?.email
					})
				: null;

		return {
			user,
			userId,
			userLoading: !subHandle?.ready(),
			isLoggedIn: !!meteorUser,
			connected: isConnected
		};
	}, []);
