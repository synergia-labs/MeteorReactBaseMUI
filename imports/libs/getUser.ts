import { nanoid } from 'nanoid';
import { Meteor } from 'meteor/meteor';
import { createStore, get, set } from 'idb-keyval';
import { parse, stringify } from 'zipson';
import { EnumUserRoles } from '../modules/userprofile/api/enumUser';
import { publicSettings } from '/imports/config/publicSettings';
import { IUserProfile } from '../modules/userprofile/api/userProfileSch';
import type { Mongo } from 'meteor/mongo';

class LoggedUserStore {
	userStore = createStore(`${publicSettings.name}_loggedUser`, 'LoggedUser-store');
	updateDateOnJson = (object: unknown) => {
		function reviver(_key: string, value: unknown) {
			if (typeof value === 'string' && value.length === 24 && !!Date.parse(value)) {
				return new Date(value);
			}
			return value;
		}

		return JSON.parse(JSON.stringify(object), reviver);
	};
	getUser = async () =>
		get<string>('user', this.userStore).then((result) => (result ? this.updateDateOnJson(parse(result)) : undefined));
	setUser = async (userDoc: IUserProfile) => {
		await set('user', stringify(userDoc), this.userStore);
	};
}

export const userprofileData: { collectionInstance?: Mongo.Collection<IUserProfile> } = {
	collectionInstance: undefined
};

/**
 * Return Logged User if exists.
 * @return {Object} Logged User
 */
export const getUser = (connection?: { id: string } | null): IUserProfile => {
	if (Meteor.isClient && Meteor.status().status !== 'connected') {
		if (window.$app?.user) {
			return window.$app.user;
		}
	}

	const user = Meteor.user();

	try {
		if (!userprofileData.collectionInstance) {
			if (user) {
				return {
					_id: user._id,
					username: user.username ?? '',
					email: user.profile?.email ?? user.emails?.[0]?.address ?? '',
					roles: (user as Meteor.User & { roles?: string[] }).roles ?? [EnumUserRoles.PUBLICO]
				};
			}
			throw new Error('Usuário não autenticado');
		}
		const userProfile = userprofileData.collectionInstance.findOne({
			email: user?.profile?.email ?? user?.emails?.[0]?.address ?? ''
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
			_id: id,
			email: '',
			username: '',
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
