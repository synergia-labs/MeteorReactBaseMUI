// region Imports
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { IMeteorUser, IUserProfile, userProfileSch } from './userProfileSch';
import { userprofileData } from '../../../libs/getUser';
import { serverSettings as settings } from '/imports/config/serverSettings';
import { check, Match } from 'meteor/check';
import { IContext } from '../../../typings/IContext';
import { IDoc } from '../../../typings/IDoc';
import { ProductServerBase } from '../../../api/productServerBase';
import { EnumUserRoles } from './enumUser';
import { nanoid } from 'nanoid';
import { Recurso } from '../config/recurso';
import User = Meteor.User;

const userProfileResources = {
	USERPROFILE_VIEW: Recurso.USUARIO_VIEW,
	USERPROFILE_CREATE: Recurso.USUARIO_CREATE,
	USERPROFILE_UPDATE: Recurso.USUARIO_UPDATE,
	USERPROFILE_REMOVE: Recurso.USUARIO_REMOVE
};

const isAdminUser = (user?: IUserProfile | null) =>
	user?.status !== 'disabled' && (user?.roles?.includes(EnumUserRoles.ADMINISTRADOR) || false);

export const getUserProfileSelector = (user: {
	_id: string;
	profile?: { email?: string };
	emails?: Array<{ address: string }>;
}) => {
	const email = user.profile?.email || user.emails?.[0]?.address;
	const selectors: Record<string, unknown>[] = [{ _id: user._id }, { 'otheraccounts._id': user._id }];
	if (email) selectors.push({ email });
	return { $or: selectors };
};

const getProfileAccountIds = (profile: IUserProfile & { otheraccounts?: Array<{ _id?: string }> }) =>
	Array.from(
		new Set(
			[profile._id, ...(profile.otheraccounts || []).map((account) => account._id)].filter(
				(accountId): accountId is string => typeof accountId === 'string' && accountId.length > 0
			)
		)
	);
const emailRequestPattern = Match.Where((value: unknown) => {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
	const data = value as Record<string, unknown>;
	if (Object.keys(data).some((key) => !['_id', 'email'].includes(key))) return false;
	return (
		(typeof data._id === 'string' && data._id.length > 0) ||
		(typeof data.email === 'string' && data.email.length <= 254)
	);
});

interface IUserProfileEstendido extends IUserProfile {
	password?: string;
}

/**
 * Return Logged User if exists.
 * @return {Object} Logged User
 */
export const getUserServer = async (connection?: { id: string } | null): Promise<IUserProfile> => {
	const user = (await Meteor.userAsync()) as IMeteorUser | null;
	const d = new Date();
	const simpleDate = `${d.getFullYear()}${d.getMonth() + 1}${d.getDay()}`;
	const id = connection && connection.id ? simpleDate + connection.id : nanoid();

	if (!user) {
		return {
			email: '',
			username: '',
			_id: id,
			roles: [EnumUserRoles.PUBLICO]
		};
	}

	try {
		const userProfile = await userprofileServerApi.getCollectionInstance().findOneAsync(getUserProfileSelector(user));

		if (userProfile) {
			return userProfile;
		}
		return {
			email: '',
			username: '',
			_id: id,
			roles: [EnumUserRoles.PUBLICO]
		};
	} catch (e) {
		return {
			_id: id,
			email: '',
			username: '',
			roles: [EnumUserRoles.PUBLICO]
		};
	}
};

class UserProfileServerApi extends ProductServerBase<IUserProfile> {
	constructor() {
		super('userprofile', userProfileSch, { resources: userProfileResources });
		this.addPublicationMeteorUsers();
		this.addUserProfileProfilePublication();
		this.serverInsert = this.serverInsert.bind(this);
		this.afterInsert = this.afterInsert.bind(this);
		this.beforeInsert = this.beforeInsert.bind(this);
		this.beforeUpdate = this.beforeUpdate.bind(this);
		this.beforeRemove = this.beforeRemove.bind(this);
		this._includeAuditData = this._includeAuditData.bind(this);
		this.changeUserStatus = this.changeUserStatus.bind(this);

		this.noImagePath = `${Meteor.absoluteUrl()}images/wireframe/user_no_photo.png`;

		this.afterInsert = this.afterInsert.bind(this);

		this.registerMethod('sendVerificationEmail', async (userData: IUserProfile, context: IContext) => {
			check(userData, emailRequestPattern);
			if (Meteor.isServer && userData) {
				const user = userData._id
					? await Meteor.users.findOneAsync({ _id: userData._id })
					: userData.email
						? await Meteor.users.findOneAsync({ 'emails.address': userData.email })
						: null;

				if (!user) {
					return true;
				}

				if (!isAdminUser(context.user) && user._id !== context.user?._id) {
					throw new Meteor.Error('Acesso negado', 'Você não tem permissão para reenviar este email.');
				}

				await Accounts.sendVerificationEmail(user._id);
			}
			return true;
		});

		this.registerMethod('sendResetPasswordEmail', async (userData: IUserProfile, context: IContext) => {
			check(userData, emailRequestPattern);
			if (Meteor.isServer && userData) {
				const user = userData._id
					? await Meteor.users.findOneAsync({ _id: userData._id })
					: userData.email
						? await Meteor.users.findOneAsync({ 'emails.address': userData.email })
						: null;

				if (user) {
					await Accounts.sendResetPasswordEmail(user._id);
				}
			}
			return true;
		});

		this.registerMethod('ChangeUserStatus', this.changeUserStatus);

		this.addPublication('userProfileList', async (filter = {}) => {
			const user = await getUserServer();
			const authorizedFilter = isAdminUser(user) ? filter : { ...filter, _id: user._id };
			return this.defaultListCollectionPublication(authorizedFilter, {
				projection: { email: 1, username: 1, status: 1, roles: 1, createdat: 1 }
			});
		});

		this.addPublication('userProfileDetail', async (filter = {}) => {
			const user = await getUserServer();
			if (!isAdminUser(user) && (filter as Partial<IUserProfile>)._id !== user._id) {
				return this.collectionInstance.find({ _id: '__denied__' });
			}
			return this.defaultDetailCollectionPublication(filter, {});
		});

		this.addPublication('getListOfusers', async () => {
			const user = await getUserServer();
			if (!isAdminUser(user)) return this.collectionInstance.find({ _id: '__denied__' });
			const queryOptions = {
				fields: { email: 1, username: 1, status: 1 }
			};

			return this.collectionInstance.find({}, queryOptions);
		});

		const self = this;
		this.addPublication('getLoggedUserProfile', async function (this: { userId: string | null; ready: () => void }) {
			if (!this.userId) return this.ready();
			const meteorUser = (await Meteor.users.findOneAsync(
				{ _id: this.userId },
				{ fields: { _id: 1, 'profile.email': 1, 'emails.address': 1 } }
			)) as IMeteorUser | null;
			if (!meteorUser) return this.ready();

			const profile = await self.collectionInstance.findOneAsync(getUserProfileSelector(meteorUser), {
				fields: { _id: 1, status: 1 }
			});
			if (!profile || profile.status === 'disabled') return this.ready();

			return self.defaultCollectionPublication(
				{ _id: profile._id },
				{
					limit: 1,
					projection: {
						photo: 1,
						username: 1,
						email: 1,
						phone: 1,
						roles: 1,
						status: 1,
						createdat: 1,
						createdby: 1,
						lastupdate: 1,
						updatedby: 1,
						sincronizadoEm: 1,
						needSync: 1
					}
				}
			);
		});

		// @ts-ignore
		userprofileData.collectionInstance = this.collectionInstance;
	}

	registrarUserProfileNoMeteor = async (userprofile: IUserProfileEstendido) => {
		if (Meteor.isServer) {
			if (userprofile.password) {
				userprofile._id = await Accounts.createUserAsync({
					username: userprofile.email,
					password: userprofile.password,
					email: userprofile.email
				});
			} else {
				userprofile._id = await Accounts.createUserAsync({
					username: userprofile.email,
					email: userprofile.email
				});
			}
		}
	};

	changeUserStatus = async (userId: string, context: IContext) => {
		if (!isAdminUser(context.user)) {
			throw new Meteor.Error('Acesso negado', `Vocẽ não tem permissão para alterar esses dados`);
		}

		const user = await this.collectionInstance.findOneAsync({ _id: userId });
		let newStatus = '';
		try {
			if (user) {
				if (user.status !== 'active') {
					newStatus = 'active';
				} else {
					newStatus = 'disabled';
				}
				await this.collectionInstance.updateAsync(
					{ _id: userId },
					{
						$set: {
							status: newStatus
						}
					}
				);
				if (newStatus === 'disabled') {
					const accountIds = getProfileAccountIds(user);
					await Meteor.users.updateAsync(
						{ _id: { $in: accountIds } },
						{ $set: { 'services.resume.loginTokens': [] } },
						{ multi: true }
					);
				}
				return true;
			}
		} catch (error) {
			console.error('error :>> ', error);
			throw new Meteor.Error('Acesso negado', `Vocẽ não tem permissão para alterar esses dados`);
		}
	};

	async serverInsert(dataObj: IUserProfileEstendido & { otheraccounts: any }, context: IContext) {
		let insertId = null;
		try {
			const { password } = dataObj;
			dataObj = (await this._checkDataBySchema(dataObj)) as IUserProfileEstendido & { otheraccounts: any };
			if (password) {
				dataObj = Object.assign({}, dataObj, { password });
			}

			await this._includeAuditData(dataObj, 'insert');
			if (await this.beforeInsert(dataObj, context)) {
				await this.registrarUserProfileNoMeteor(dataObj);
				delete dataObj.password;
				if (!dataObj.roles) {
					dataObj.roles = ['Usuario'];
				} else if (dataObj.roles.indexOf('Usuario') === -1) {
					dataObj.roles.push('Usuario');
				}

				const userProfile = await this.collectionInstance.findOneAsync({
					email: dataObj.email
				});
				if (!userProfile) {
					dataObj.otheraccounts = [
						{
							_id: dataObj._id,
							service: settings.service
						}
					];

					insertId = await this.collectionInstance.insertAsync(dataObj);

					delete dataObj.otheraccounts;
					await Meteor.users.updateAsync(
						{ _id: dataObj._id || insertId },
						{
							$set: {
								profile: {
									name: dataObj.username,
									email: dataObj.email
								},
								roles: dataObj.roles
							}
						}
					);
				} else {
					insertId = userProfile._id;

					await Meteor.users.updateAsync(
						{ _id: dataObj._id },
						{
							$set: {
								profile: {
									name: dataObj.username,
									email: dataObj.email
								},
								roles: dataObj.roles
							}
						}
					);
					await this.collectionInstance.updateAsync(
						{ _id: userProfile._id },
						{
							$addToSet: {
								otheraccounts: {
									_id: dataObj._id,
									service: settings.service
								}
							}
						}
					);
				}

				dataObj.password = password;

				await this.afterInsert(dataObj, context);
				if (context.rest) {
					context.rest.response.statusCode = 201;
				}
				return insertId;
			}
			return null;
		} catch (insertError) {
			throw insertError;
		}
	}

	/**
	 * Check if any updates occurs in
	 * any document by any action.
	 * @param  {Object} doc - Collection document.
	 * @param  {String} action - Action the will be perform.
	 * @param  {String} defaultUser - Value of default user
	 */
	async _includeAuditData(doc: IDoc, action: string, defaultUser: string = 'Anonymous') {
		const user: IUserProfile = await getUserServer();
		if (action === 'insert') {
			doc.createdby = user ? user._id : defaultUser;
			doc.createdat = new Date();
			doc.lastupdate = new Date();
		} else {
			doc.lastupdate = new Date();
		}
	}

	addPublicationMeteorUsers = () => {
		if (Meteor.isServer) {
			Meteor.publish('statusCadastroUserProfile', async function (userId) {
				check(userId, String);
				const user = await getUserServer();

				if (isAdminUser(user)) {
					return Meteor.users.find(
						{},
						{
							fields: {
								_id: 1,
								username: 1,
								'emails.verified': 1,
								'emails.address': 1,
								roles: 1,
								productProfile: 1
							}
						}
					);
				}
				if (!this.userId || userId !== this.userId) {
					return this.ready();
				}
				return Meteor.users.find(
					{ _id: this.userId },
					{
						fields: {
							_id: 1,
							username: 1,
							'emails.verified': 1,
							'emails.address': 1
						}
					}
				);
			});
			Meteor.publish('user', function () {
				if (this.userId) {
					return Meteor.users.find(
						{ _id: this.userId },
						{
							fields: {
								emails: 1,
								username: 1
							}
						}
					);
				}
				return this.ready();
			});
		}
	};

	addUserProfileProfilePublication = () => {
		if (Meteor.isServer) {
			// eslint-disable-next-line
			Meteor.publish('userprofile-profile', function () {
				if (this.userId) {
					return Meteor.users.find(
						{ _id: this.userId },
						{
							fields: {
								'emails.address': 1,
								productProfile: 1
							}
						}
					);
				}
				this.ready();
			});
		}
	};

	async beforeInsert(docObj: IUserProfile, context: IContext) {
		if (!docObj.status) docObj.status = 'disabled';
		if (!isAdminUser(context.user)) {
			docObj.roles = [EnumUserRoles.USUARIO];
		}
		return super.beforeInsert(docObj, context);
	}

	async afterInsert(doc: IUserProfileEstendido, _context: IContext) {
		if (Meteor.isServer) {
			if (doc.password) {
				await Accounts.sendVerificationEmail(doc._id!);
			} else {
				await Accounts.sendEnrollmentEmail(doc._id!);
			}
		}
	}

	async beforeUpdate(docObj: IUserProfile, context: IContext) {
		const user = context.user;
		if (
			!docObj._id ||
			(user && user._id !== docObj._id && user && user.roles && user.roles.indexOf('Administrador') === -1)
		) {
			throw new Meteor.Error('Acesso negado', `Vocẽ não tem permissão para alterar esses dados`);
		}

		if (user && user.roles && user.roles.indexOf('Administrador') === -1) {
			// prevent user change your self roles
			if (docObj && docObj.roles) delete docObj.roles;
			if (docObj && docObj.status) delete docObj.status;
		}

		const storedProfile = await this.collectionInstance.findOneAsync({ _id: docObj._id });
		if (storedProfile && docObj.email && storedProfile.email.toLowerCase() !== docObj.email.toLowerCase()) {
			throw new Meteor.Error(
				'email-change-not-supported',
				'O email de acesso não pode ser alterado pela edição do perfil.'
			);
		}

		return await super.beforeUpdate(docObj, context);
	}

	async afterUpdate(docObj: IUserProfile, context: IContext) {
		const profile = (await this.collectionInstance.findOneAsync({ _id: docObj._id })) as
			| (IUserProfile & { otheraccounts?: Array<{ _id?: string }> })
			| undefined;
		if (profile) {
			await Meteor.users.updateAsync(
				{ _id: { $in: getProfileAccountIds(profile) } },
				{
					$set: {
						'profile.name': profile.username,
						'profile.email': profile.email,
						roles: profile.roles || []
					}
				},
				{ multi: true }
			);
		}
		return super.afterUpdate(docObj, context);
	}

	async beforeRemove(docObj: IUserProfile, context: IContext) {
		if (!isAdminUser(context.user)) {
			throw new Meteor.Error('Acesso negado', `Vocẽ não tem permissão para alterar esses dados`);
		}
		if (!docObj._id) throw new Meteor.Error('validation-error', 'O identificador do usuário é obrigatório.');
		await super.beforeRemove(docObj, context);
		const storedProfile = (await this.collectionInstance.findOneAsync({ _id: docObj._id })) as
			| (IUserProfile & { otheraccounts?: Array<{ _id?: string }> })
			| undefined;
		await Meteor.users.removeAsync({ _id: { $in: storedProfile ? getProfileAccountIds(storedProfile) : [docObj._id] } });
		return true;
	}
}

export const userprofileServerApi = new UserProfileServerApi();
