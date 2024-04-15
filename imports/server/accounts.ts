import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { userprofileServerApi } from '../modules/userprofile/api/UserProfileServerApi';
import { getHTMLEmailTemplate } from './email';
import req from 'request';

// @ts-ignore
import settings from '/settings';
import { Mongo } from 'meteor/mongo';

function getBase64FromURLImage(
	urlImage: string,
	callback = (e: any, r: any) => {
		console.log(e, r);
	}
) {
	const request = req.defaults({ encoding: null });

	request.get(urlImage, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			const data = 'data:' + response.headers['content-type'] + ';base64,' + new Buffer(body).toString('base64');
			callback(null, data);
		} else {
			callback(error, null);
		}
	});
}

function updateUserProfileImageFromURL(userId: string | Mongo.ObjectID | Mongo.Selector<any>, urlImage: string) {
	getBase64FromURLImage(
		urlImage,
		Meteor.bindEnvironment((err: any, res: any) => {
			// Everything is good now
			if (!err) {
				userprofileServerApi.getCollectionInstance().update(userId, {
					$set: { photo: res, lastupdate: new Date() }
				});
			}
		})
	);
}

function validateSocialLoginAndUpdateProfile(
	userProfile: {
		_id: string | Mongo.ObjectID | Mongo.Selector<any>;
		photo: any;
	},
	user: Mongo.OptionalId<any>,
	serviceName: string
) {
	if (!userProfile) {
		console.log('##Novo Usuário## >>>>>>>', user.profile, null, user.services);
		user.roles = ['Usuario'];
		user.otheraccounts = [{ _id: user._id, service: serviceName }];
		user.createdat = new Date();
		user.lastupdate = new Date();
		const userProfileID = userprofileServerApi.getCollectionInstance().insert(user);
		delete user.otheraccounts;
		Meteor.users.update(
			{ _id: user._id },
			{
				$set: user
			}
		);

		if (user.services && !!user.services.google && user.services.google.picture) {
			updateUserProfileImageFromURL(userProfileID, user.services.google.picture);
		}
	} else {
		console.log('Usuário já cadastrado:', user.username);
		Meteor.users.update(
			{ _id: user._id },
			{
				$set: {
					profile: user.profile,
					roles: user.roles ? user.roles : ['Usuario']
				}
			}
		);
		userprofileServerApi.getCollectionInstance().update(
			{ _id: userProfile._id },
			{
				$addToSet: { otheraccounts: { _id: user._id, service: serviceName } }
			}
		);

		if (!userProfile.photo) {
			if (user.services && !!user.services.google && user.services.google.picture) {
				updateUserProfileImageFromURL(userProfile._id, user.services.google.picture);
			}
		}
	}

	return true;
}

function validateLoginGoogle(user: Meteor.User & { name?: string; email?: string }) {
	console.log('Login com Google');
	user.username = `${user.services.google.name}`;
	user.name = `${user.services.google.name}`;
	user.email = user.services.google.email;
	const serviceName = 'google';
	const userProfile = userprofileServerApi.getCollectionInstance().findOne({
		email: user.email
	});

	return validateSocialLoginAndUpdateProfile(userProfile, user, serviceName);
}

function validateLoginFacebook(user: Meteor.User & { name?: string; email?: string }) {
	const serviceName = 'facebook';
	user.username = `${user.services.facebook.name}_facebook`;
	user.name = `${user.services.facebook.name}`;
	user.email = user.services.facebook.email;
	const userProfile = userprofileServerApi.getCollectionInstance().findOne({
		email: user.email
	});

	return validateSocialLoginAndUpdateProfile(userProfile, user, serviceName);
}

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
	Accounts.emailTemplates.from = settings.mail_system;
	Accounts.emailTemplates.siteName = settings.name;

	// region VERIFICAR_EMAIL
	Accounts.emailTemplates.verifyEmail.subject = () => {
		return settings.name;
	};
	Accounts.emailTemplates.verifyEmail.html = (user, url) => {
		const urlWithoutHash = url.replace('#/', '');
		const userData = userprofileServerApi.findOne({ _id: user._id }) || {};
		const email =
			`${
				`<p>Olá ${userData.username || 'usuário'},</p>` +
				'<p>Seja bem vindo ao &nbsp;<strong>MeteorReactBase-MUI</strong>.</p>' +
				'<p>Para confirmar seu cadastro clique no link abaixo:</p>' +
				'<p><ins><a href='
			}${urlWithoutHash}>${urlWithoutHash}</a></ins></p>` +
			'<p>Ficamos felizes com o seu cadastro.</p>' +
			'<p><br/>Equipe <b>MeteorReactBase-MUI</b></p>';
		const footer = `Essa mensagem foi gerada automaticamente!`;
		return getHTMLEmailTemplate('Confirmação do cadastro', email, footer);
	};

	Accounts.emailTemplates.enrollAccount.subject = () => {
		return settings.name;
	};

	Accounts.emailTemplates.enrollAccount.html = (user, url) => {
		const urlWithoutHash = url.replace('#/', '');
		const userData = userprofileServerApi.findOne({ _id: user._id }) || {};

		const email =
			`${
				`<p>Olá ${userData.username || 'usuário'},</p>` +
				'<p>Seja bem vindo ao &nbsp;<strong>MeteorReactBase-MUI</strong>.</p>' +
				'<p>Para concluir seu cadastro clique no link abaixo e informe uma senha:</p>' +
				'<p><ins><a href='
			}${urlWithoutHash}>${urlWithoutHash}</a></ins></p>` +
			'<p>Ficamos felizes com o seu cadastro.</p>' +
			'<p><br/>Equipe <b>MeteorReactBase-MUI</b></p>';
		const footer = `Essa mensagem foi gerada automaticamente!`;
		return getHTMLEmailTemplate('Conclua o seu cadastro', email, footer);
	};

	// endregion

	// region ALTERAR_SENHA
	Accounts.emailTemplates.resetPassword.subject = () => {
		return settings.name;
	};
	Accounts.emailTemplates.resetPassword.html = (user, url) => {
		const userData = userprofileServerApi.findOne({ _id: user._id }) || {};
		const urlWithoutHash = url.replace('#/', '');
		const email =
			`${
				`<p>Olá ${userData.username || 'usuário'},</p>` +
				'<p>Sua senha de acesso ao <strong>MeteorReactBase-MUI</strong> será alterada.</p>' +
				'<p>Clique no link abaixo e informe uma nova senha:</p>' +
				'<p><ins><a href='
			}${urlWithoutHash}>${urlWithoutHash}</a></ins></p>` +
			'<p></p>' +
			'<p><br/>Equipe <b>MeteorReactBase-MUI</b></p>';
		const footer = `Essa mensagem foi gerada automaticamente!`;
		return getHTMLEmailTemplate('Alteração da senha atual', email, footer);
	};

	Accounts.onLogin(
		(params: { user: { _id: any; username: any }; connection: { onClose: (arg0: () => void) => void } }) => {
			console.log(
				'OnLogin:',
				params && params.user
					? {
							_id: params.user._id,
							username: params.user.username
					  }
					: '-'
			);

			const userProfile = params.user ? userprofileServerApi.find({ _id: params.user._id }).fetch()[0] : undefined;

			// const userLanguage = userProfile && userProfile.language ? userProfile.language : 'pt-BR';

			if (userProfile) {
				userprofileServerApi.getCollectionInstance().update(
					{ _id: userProfile._id },
					{
						$set: { lastacess: new Date(), connected: true }
					}
				);
			}

			params.connection.onClose(
				Meteor.bindEnvironment(() => {
					if (userProfile) {
						userprofileServerApi.getCollectionInstance().update(
							{ _id: userProfile._id },
							{
								$set: { lastacess: new Date(), connected: false }
							}
						);
					}
					// console.log('OnDesconect:',params.user._id); // called once the user disconnects
				})
			);
		}
	);

	Accounts.onLogout((params) => {
		const userProfile = params.user ? userprofileServerApi.find({ _id: params.user._id }).fetch()[0] : undefined;

		if (userProfile) {
			userprofileServerApi.getCollectionInstance().update(
				{ _id: userProfile._id },
				{
					$set: { lastacess: new Date(), connected: false }
				}
			);
		}
		// console.log('Logoff',!!userProfile?userProfile._id:'noUser')
	});

	Accounts.config({
		sendVerificationEmail: true,
		forbidClientAccountCreation: false // impede que um usuário seja criado pelo cliente
	});

	Accounts.validateLoginAttempt(({ user, allowed }: { user: Meteor.User; allowed: boolean }) => {
		// console.log('user, allowed',user, allowed)
		if (!allowed) {
			console.log('Acesso não autorizado');
			return allowed;
		}

		// ################################ FACEBOOK ################################################
		if (user.services.facebook) {
			user.profile = {
				name: user.services.facebook.name,
				email: user.services.facebook.email
			};
			return validateLoginFacebook(user);
		} else if (user.services.google) {
			// ################################ GOOGLE ################################################
			user.profile = {
				name: user.services.google.name,
				email: user.services.google.email
			};
			return validateLoginGoogle(user);
		}
		if (!user || !user.emails || !user.emails[0].verified) {
			throw new Meteor.Error('Email ñao verificado', `Este email ainda não foi verificado!`);
		}
		console.log('Acesso autorizado');
		return true;
	});
});
