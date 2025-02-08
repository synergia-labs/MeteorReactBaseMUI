import { nanoid } from 'nanoid';
import { Meteor } from 'meteor/meteor';
import { get, set, Store } from 'idb-keyval';
import { parse, stringify } from 'zipson';
import { EnumUserRoles } from '../modules/userprofile/api/enumUser';
import settings from '../../settings.json';
import { IUserProfile } from '../modules/userprofile/api/userProfileSch';

class LoggedUserStore {
	userStore = new Store(`${settings.name}_` + 'loggedUser', 'LoggedUser-store');
	updateDateOnJson = (object) => {
		function reviver(key, value) {
			if (`${value}`.length === 24 && !!Date.parse(value)) {
				return new Date(value);
			}
			return value;
		}

		return JSON.parse(JSON.stringify(object), reviver);
	};
	getUser = async () => await get('user', this.userStore).then((result) => this.updateDateOnJson(parse(result)));
	setUser = (userDoc) => {
		set('user', stringify(userDoc), this.userStore);
	};
}

export const userprofileData = {
	collectionInstance: undefined
};

/**
 * Return Logged User if exists.
 * @return {Object} Logged User
 */
export const getUser = (connection?: { id: string } | null): IUserProfile => {
	if (Meteor.isClient && Meteor.status().status !== 'connected') {
		if (!!window && !!window.$app && !!window.$app.user) {
			return window.$app.user;
		}
	}

	const user = Meteor.user();

	try {
		if (!userprofileData.collectionInstance) {
			return user;
		}
		const userProfile = userprofileData.collectionInstance.findOne({
			email: user.profile.email
		});

		if (userProfile) {
			return userProfile;
		}
		const d = new Date();
		const simpleDate = `${d.getFullYear()}${d.getMonth() + 1}${d.getDay()}`;
		const id = connection && connection.id ? simpleDate + connection.id : nanoid();

		return {
			email: '',
			username: '',
			_id: id,
			roles: [EnumUserRoles.PUBLICO]
		};
	} catch (e) {
		const d = new Date();
		const simpleDate = `${d.getFullYear()}${d.getMonth() + 1}${d.getDay()}`;
		const id = connection && connection.id ? simpleDate + connection.id : nanoid();
		return {
			id,
			_id: id,
			roles: [EnumUserRoles.PUBLICO]
		};
	}
};

const SYSTEM_USER: Readonly<{
	createdat: Date;
	blocked: boolean;
	createdby: string;
	_id: string;
	email: string;
	username: string;
}> = Object.freeze({
	email: 'SYSTEM@SYSTEM',
	username: 'Sistema',
	_id: 'SYSTEM',
	blocked: false,
	createdat: new Date(),
	createdby: 'SYSTEM'
});

/**
 * Usuario reprensentando o sistema, para ações não realizadas por usuarios.
 */
export function getSystemUserProfile(): IUserProfile | undefined {
	if (Meteor.isClient) {
		return undefined;
	}
	return SYSTEM_USER as IUserProfile;
}
