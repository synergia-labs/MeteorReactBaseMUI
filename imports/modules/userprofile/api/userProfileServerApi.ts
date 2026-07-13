// region Imports
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { IMeteorUser, IUserProfile, userProfileSch } from './userProfileSch';
import { userprofileData } from '../../../libs/getUser';
import { serverSettings as settings } from '/imports/config/serverSettings';
import { check } from 'meteor/check';
import { IContext } from '../../../typings/IContext';
import { IDoc } from '../../../typings/IDoc';
import { ProductServerBase } from '../../../api/productServerBase';
import { EnumUserRoles } from './enumUser';
import { nanoid } from 'nanoid';
import User = Meteor.User;

const emailMethodRateLimitWindowMs = Number(process.env.EMAIL_METHOD_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const emailMethodRateLimitMax = Number(process.env.EMAIL_METHOD_RATE_LIMIT_MAX || 5);
const emailMethodAttempts = new Map<string, { count: number; resetAt: number }>();

const isAdminUser = (user?: IUserProfile | null) => user?.roles?.includes(EnumUserRoles.ADMINISTRADOR) || false;

const assertRateLimit = (key: string) => {
	const now = Date.now();
	const current = emailMethodAttempts.get(key);

	if (!current || current.resetAt <= now) {
		emailMethodAttempts.set(key, { count: 1, resetAt: now + emailMethodRateLimitWindowMs });
		return;
	}

	if (current.count >= emailMethodRateLimitMax) {
		throw new Meteor.Error('rate-limit-exceeded', 'Muitas tentativas. Tente novamente mais tarde.');
	}

	current.count++;
};

interface IUserProfileEstendido extends IUserProfile {
	password?: string;
}

/**
 * Return Logged User if exists.
 * @return {Object} Logged User
 */
export const getUserServer = async (connection?: { id: string } | null): IUserProfile => {
	const user: (User & IMeteorUser) | null = await Meteor.userAsync();
	const d = new Date();
	const simpleDate = `${d.getFullYear()}${d.getMonth() + 1}${d.getDay()}`;
	const id = connection && connection.id ? simpleDate + connection.id : nanoid();

	if (!user?.profile?.email) {
		return {
			email: '',
			username: '',
			_id: id,
			roles: [EnumUserRoles.PUBLICO]
		};
	}

	try {
		const userProfile = await userprofileServerApi.getCollectionInstance().findOneAsync({
			email: user.profile.email
		});

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
			id,
			_id: id,
			roles: [EnumUserRoles.PUBLICO]
		};
	}
};

class UserProfileServerApi extends ProductServerBase<IUserProfile> {
	constructor() {
		super('userprofile', userProfileSch);
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
			check(userData, Object);
			assertRateLimit(
				`verify:${context.connection?.id || context.user?._id || 'anonymous'}:${userData.email || userData._id}`
			);
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

				Accounts.sendVerificationEmail(user._id);
			}
			return true;
		});

		this.registerMethod('sendResetPasswordEmail', async (userData: IUserProfile, context: IContext) => {
			check(userData, Object);
			assertRateLimit(
				`reset:${context.connection?.id || context.user?._id || 'anonymous'}:${userData.email || userData._id}`
			);
			if (Meteor.isServer && userData) {
				const user = userData._id
					? await Meteor.users.findOneAsync({ _id: userData._id })
					: userData.email
						? await Meteor.users.findOneAsync({ 'emails.address': userData.email })
						: null;

				if (user) {
					Accounts.sendResetPasswordEmail(user._id);
				}
			}
			return true;
		});

		this.registerMethod('ChangeUserStatus', this.changeUserStatus);

		this.addPublication('userProfileList', (filter = {}) => {
			return this.defaultListCollectionPublication(filter, {
				projection: { email: 1, username: 1, status: 1, roles: 1, createdAt: 1 }
			});
		});

		this.addPublication('userProfileDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {});
		});

		this.addPublication('getListOfusers', (filter = {}) => {
			const queryOptions = {
				fields: { photo: 1, email: 1, username: 1 }
			};

			return this.collectionInstance.find(Object.assign({}, { ...filter }), queryOptions);
		});

		this.addPublication('getLoggedUserProfile', async () => {
			const user: IMeteorUser | null = await Meteor.userAsync();

			if (!user) {
				return;
			}
			return this.collectionInstance.find({
				email: user && user.profile && user.profile.email ? user.profile.email : null
			});
		});

		// @ts-ignore
		userprofileData.collectionInstance = this.collectionInstance;
	}

	registrarUserProfileNoMeteor = async (userprofile: IUserProfileEstendido) => {
		if (Meteor.isServer) {
			if (userprofile.password) {
				userprofile._id = await Accounts.createUser({
					username: userprofile.email,
					password: userprofile.password,
					email: userprofile.email
				});
			} else {
				userprofile._id = await Accounts.createUser({
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
			dataObj = await this._checkDataBySchema(dataObj);
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
								}
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
			doc.createdBy = user ? user._id : defaultUser;
			doc.createdAt = new Date();
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
		if (!isAdminUser(context.user)) {
			docObj.roles = [EnumUserRoles.USUARIO];
		}
		return super.beforeInsert(docObj, context);
	}

	async afterInsert(doc: IUserProfileEstendido, _context: IContext) {
		if (Meteor.isServer) {
			if (doc.password) {
				Accounts.sendVerificationEmail(doc._id!);
			} else {
				Accounts.sendEnrollmentEmail(doc._id!);
			}
		}
	}

	async beforeUpdate(docObj: IUserProfile, context: IContext) {
		const user: IUserProfile = await getUserServer();
		if (
			!docObj._id ||
			(user && user._id !== docObj._id && user && user.roles && user.roles.indexOf('Administrador') === -1)
		) {
			throw new Meteor.Error('Acesso negado', `Vocẽ não tem permissão para alterar esses dados`);
		}

		if (user && user.roles && user.roles.indexOf('Administrador') === -1) {
			// prevent user change your self roles
			if (docObj && docObj.roles) delete docObj.roles;
		}

		return await super.beforeUpdate(docObj, context);
	}

	async beforeRemove(docObj: IUserProfile, context: IContext) {
		if (!isAdminUser(context.user)) {
			throw new Meteor.Error('Acesso negado', `Vocẽ não tem permissão para alterar esses dados`);
		}
		await super.beforeRemove(docObj, context);
		await Meteor.users.removeAsync({ _id: docObj._id });
		return true;
	}
}

export const userprofileServerApi = new UserProfileServerApi();
