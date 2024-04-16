// region Imports
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { IUserProfile, userProfileSch } from './UserProfileSch';
import { getUser, userprofileData } from '../../../libs/getUser';
import settings from '../../../../settings.json';
import { check } from 'meteor/check';
import { IContext } from '/imports/typings/IContext';
import { IDoc } from '/imports/typings/IDoc';
import { ProductServerBase } from '/imports/api/productServerBase';

interface IUserProfileEstendido extends IUserProfile {
	password?: string;
}

class UserProfileServerApi extends ProductServerBase<IUserProfile> {
	constructor() {
		super('userprofile', userProfileSch);
		this.addPublicationMeteorUsers();
		this.addUserProfileProfilePublication();
		this.serverInsert = this.serverInsert.bind(this);
		this.afterInsert = this.afterInsert.bind(this);
		this.beforeInsert = this.beforeInsert.bind(this);
		this.afterUpdate = this.afterUpdate.bind(this);
		this.beforeUpdate = this.beforeUpdate.bind(this);
		this.beforeRemove = this.beforeRemove.bind(this);
		this._includeAuditData = this._includeAuditData.bind(this);
		this.changeUserStatus = this.changeUserStatus.bind(this);

		this.noImagePath = `${Meteor.absoluteUrl()}images/wireframe/user_no_photo.png`;

		this.afterInsert = this.afterInsert.bind(this);

		this.registerMethod('sendVerificationEmail', (userData: IUserProfile) => {
			check(userData, Object);
			if (Meteor.isServer && userData) {
				if (userData._id) {
					Accounts.sendVerificationEmail(userData._id);
				} else if (userData.email) {
					const user = Meteor.users.findOne({
						'emails.address': userData.email
					});
					Accounts.sendVerificationEmail(user?._id ?? '');
				}
			}
		});

		this.registerMethod('sendResetPasswordEmail', (userData: IUserProfile) => {
			check(userData, Object);
			if (Meteor.isServer && userData) {
				if (userData._id) {
					Accounts.sendResetPasswordEmail(userData._id);
				} else if (userData.email) {
					const user = Meteor.users.findOne({
						'emails.address': userData.email
					});
					if (user) {
						Accounts.sendResetPasswordEmail(user._id);
					} else {
						return false;
					}
				}
			}
			return true;
		});

		this.registerMethod('ChangeUserStatus', this.changeUserStatus);

		this.addPublication('userProfileList', (filter = {}) => {
			return this.defaultListCollectionPublication(filter, {
				projection: { email: 1, username: 1, status: 1, roles: 1, createdat: 1 }
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

		this.addPublication('getLoggedUserProfile', () => {
			const user = Meteor.user();

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

	registrarUserProfileNoMeteor = (userprofile: IUserProfileEstendido) => {
		if (Meteor.isServer) {
			if (userprofile.password) {
				userprofile._id = Accounts.createUser({
					username: userprofile.email,
					password: userprofile.password,
					email: userprofile.email
				});
			} else {
				userprofile._id = Accounts.createUser({
					username: userprofile.email,
					email: userprofile.email
				});
			}
		}
	};

	changeUserStatus = (userId: string) => {
		const user = this.collectionInstance.findOne({_id: userId})
		let newStatus = '';
		try {
			if(user){
				if(user.status !== 'active') {
					newStatus = 'active';
				} else {
					newStatus = 'disabled';
				}
				this.collectionInstance.update(
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
			console.log('error :>> ', error);
			throw new Meteor.Error('Acesso negado', `Vocẽ não tem permissão para alterar esses dados`);
		}
	};

	serverInsert(dataObj: IUserProfileEstendido & { otheraccounts: any }, context: IContext) {
		let insertId = null;
		try {
			const { password } = dataObj;
			dataObj = this._checkDataBySchema(dataObj);
			if (password) {
				dataObj = Object.assign({}, dataObj, { password });
			}

			this._includeAuditData(dataObj, 'insert');
			if (this.beforeInsert(dataObj, context)) {
				this.registrarUserProfileNoMeteor(dataObj);
				delete dataObj.password;
				if (!dataObj.roles) {
					dataObj.roles = ['Usuario'];
				} else if (dataObj.roles.indexOf('Usuario') === -1) {
					dataObj.roles.push('Usuario');
				}

				const userProfile = this.collectionInstance.findOne({
					email: dataObj.email
				});
				if (!userProfile) {
					dataObj.otheraccounts = [
						{
							_id: dataObj._id,
							service: settings.service
						}
					];

					insertId = this.collectionInstance.insert(dataObj);

					delete dataObj.otheraccounts;
					Meteor.users.update(
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

					Meteor.users.update(
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
					this.collectionInstance.update(
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

				this.afterInsert(dataObj, context);
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
	_includeAuditData(doc: IDoc, action: string, defaultUser: string = 'Anonymous') {
		const user = getUser();
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
			Meteor.publish('statusCadastroUserProfile', (userId) => {
				check(userId, String);
				const user = getUser();

				if (user && user.roles && user.roles.indexOf('Administrador') !== -1) {
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
				return Meteor.users.find({ _id: userId });
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

	beforeInsert(docObj: IUserProfile, context: IContext) {
		return super.beforeInsert(docObj, context);
	}

	afterInsert(doc: IUserProfileEstendido, _context: IContext) {
		if (Meteor.isServer) {
			if (doc.password) {
				Accounts.sendVerificationEmail(doc._id!);
			} else {
				Accounts.sendEnrollmentEmail(doc._id!);
			}
		}
	}

	beforeUpdate(docObj: IUserProfile, context: IContext) {
		const user = getUser();
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

		return super.beforeUpdate(docObj, context);
	}

	beforeRemove(docObj: IUserProfile, context: IContext) {
		super.beforeRemove(docObj, context);
		Meteor.users.remove({ _id: docObj._id });
		return true;
	}
}

export const userprofileServerApi = new UserProfileServerApi();
