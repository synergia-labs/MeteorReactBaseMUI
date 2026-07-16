import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { getUserProfileSelector, userprofileServerApi } from '../modules/userprofile/api/userProfileServerApi';
import { getHTMLEmailTemplate } from './email';
import { serverSettings as settings } from '/imports/config/serverSettings';
import { Mongo } from 'meteor/mongo';

const maxSocialImageBytes = Number(process.env.SOCIAL_IMAGE_MAX_BYTES || 2 * 1024 * 1024);
const socialImageTimeoutMs = Number(process.env.SOCIAL_IMAGE_TIMEOUT_MS || 5000);
const defaultAllowedSocialImageHosts = ['googleusercontent.com', 'graph.facebook.com', 'fbcdn.net'];
const allowedSocialImageHosts = (process.env.SOCIAL_IMAGE_ALLOWED_HOSTS || defaultAllowedSocialImageHosts.join(','))
	.split(',')
	.map((host) => host.trim().toLowerCase())
	.filter(Boolean);

const escapeHtml = (value: unknown) =>
	String(value ?? '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const isAllowedSocialImageUrl = (urlImage: string) => {
	try {
		const imageUrl = new URL(urlImage);
		const hostname = imageUrl.hostname.toLowerCase();
		return (
			imageUrl.protocol === 'https:' &&
			allowedSocialImageHosts.some((allowedHost) => hostname === allowedHost || hostname.endsWith(`.${allowedHost}`))
		);
	} catch (_error) {
		return false;
	}
};

async function getBase64FromURLImage(urlImage: string) {
	if (!isAllowedSocialImageUrl(urlImage)) {
		throw new Error('Social image URL is not allowed');
	}

	const abortController = new AbortController();
	const timeout = setTimeout(() => abortController.abort(), socialImageTimeoutMs);

	try {
		const response = await fetch(urlImage, { signal: abortController.signal });
		if (!response.ok) throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);

		const contentType = response.headers.get('content-type') || 'application/octet-stream';
		if (!contentType.toLowerCase().startsWith('image/')) throw new Error(`Invalid image content-type: ${contentType}`);

		const contentLength = Number(response.headers.get('content-length') || 0);
		if (contentLength > maxSocialImageBytes) throw new Error('Social image exceeds max allowed size');

		const body = Buffer.from(await response.arrayBuffer());
		if (body.length > maxSocialImageBytes) throw new Error('Social image exceeds max allowed size');

		return `data:${contentType};base64,${body.toString('base64')}`;
	} finally {
		clearTimeout(timeout);
	}
}

async function updateUserProfileImageFromURL(userId: string | Mongo.ObjectID | Mongo.Selector<any>, urlImage: string) {
	try {
		const image = await getBase64FromURLImage(urlImage);
		await userprofileServerApi.getCollectionInstance().updateAsync(userId, {
			$set: { photo: image, lastupdate: new Date() }
		});
	} catch (error) {
		console.warn('Não foi possível atualizar a imagem do perfil social:', error);
	}
}

async function validateSocialLoginAndUpdateProfile(
	userProfile: {
		_id: string | Mongo.ObjectID | Mongo.Selector<any>;
		photo: any;
	},
	user: Mongo.OptionalId<any>,
	serviceName: string
) {
	if (!userProfile) {
		user.roles = ['Usuario'];
		user.status = 'active';
		user.otheraccounts = [{ _id: user._id, service: serviceName }];
		user.createdat = new Date();
		user.lastupdate = new Date();
		const userProfileID = await userprofileServerApi.getCollectionInstance().insertAsync(user);
		delete user.otheraccounts;
		await Meteor.users.updateAsync(
			{ _id: user._id },
			{
				$set: user
			}
		);

		if (user.services && !!user.services.google && user.services.google.picture) {
			await updateUserProfileImageFromURL(userProfileID, user.services.google.picture);
		}
	} else {
		await Meteor.users.updateAsync(
			{ _id: user._id },
			{
				$set: {
					profile: user.profile,
					roles: user.roles ? user.roles : ['Usuario']
				}
			}
		);
		await userprofileServerApi.getCollectionInstance().updateAsync(
			{ _id: userProfile._id },
			{
				$addToSet: { otheraccounts: { _id: user._id, service: serviceName } }
			}
		);

		if (!userProfile.photo) {
			if (user.services && !!user.services.google && user.services.google.picture) {
				await updateUserProfileImageFromURL(userProfile._id, user.services.google.picture);
			}
		}
	}

	return true;
}

async function validateLoginGoogle(user: Meteor.User & { name?: string; email?: string }) {
	const google = user.services?.google;
	if (!google?.email) throw new Meteor.Error('invalid-social-profile', 'O Google não retornou um e-mail válido.');
	user.username = `${google.name ?? google.email}`;
	user.name = `${google.name ?? google.email}`;
	user.email = google.email;
	const serviceName = 'google';
	const userProfile = await userprofileServerApi.getCollectionInstance().findOneAsync({
		email: user.email
	});

	return validateSocialLoginAndUpdateProfile(userProfile, user, serviceName);
}

async function validateLoginFacebook(user: Meteor.User & { name?: string; email?: string }): Promise<Boolean> {
	const serviceName = 'facebook';
	const facebook = user.services?.facebook;
	if (!facebook?.email) throw new Meteor.Error('invalid-social-profile', 'O Facebook não retornou um e-mail válido.');
	user.username = `${facebook.name ?? facebook.email}_facebook`;
	user.name = `${facebook.name ?? facebook.email}`;
	user.email = facebook.email;
	const userProfile = await userprofileServerApi.getCollectionInstance().findOneAsync({
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
		const urlWithoutHash = escapeHtml(url.replace('#/', ''));
		const username = user.username || user.profile?.name || user.profile?.email || 'usuário';
		const email =
			`${
				`<p>Olá ${escapeHtml(username)},</p>` +
				'<p>Seja bem vindo ao &nbsp;<strong>MeteorReactBase-MUI</strong>.</p>' +
				'<p>Para confirmar seu cadastro clique no link abaixo:</p>' +
				'<p><ins><a href="'
			}${urlWithoutHash}">${urlWithoutHash}</a></ins></p>` +
			'<p>Ficamos felizes com o seu cadastro.</p>' +
			'<p><br/>Equipe <b>MeteorReactBase-MUI</b></p>';
		const footer = `Essa mensagem foi gerada automaticamente!`;
		return getHTMLEmailTemplate('Confirmação do cadastro', email, footer);
	};

	Accounts.emailTemplates.enrollAccount.subject = () => {
		return settings.name;
	};

	Accounts.emailTemplates.enrollAccount.html = (user, url) => {
		const urlWithoutHash = escapeHtml(url.replace('#/', ''));
		const username = user.username || user.profile?.name || user.profile?.email || 'usuário';

		const email =
			`${
				`<p>Olá ${escapeHtml(username)},</p>` +
				'<p>Seja bem vindo ao &nbsp;<strong>MeteorReactBase-MUI</strong>.</p>' +
				'<p>Para concluir seu cadastro clique no link abaixo e informe uma senha:</p>' +
				'<p><ins><a href="'
			}${urlWithoutHash}">${urlWithoutHash}</a></ins></p>` +
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
		const urlWithoutHash = escapeHtml(url.replace('#/', ''));
		const username = user.username || user.profile?.name || user.profile?.email || 'usuário';
		const email =
			`${
				`<p>Olá ${escapeHtml(username)},</p>` +
				'<p>Sua senha de acesso ao <strong>MeteorReactBase-MUI</strong> será alterada.</p>' +
				'<p>Clique no link abaixo e informe uma nova senha:</p>' +
				'<p><ins><a href="'
			}${urlWithoutHash}">${urlWithoutHash}</a></ins></p>` +
			'<p></p>' +
			'<p><br/>Equipe <b>MeteorReactBase-MUI</b></p>';
		const footer = `Essa mensagem foi gerada automaticamente!`;
		return getHTMLEmailTemplate('Alteração da senha atual', email, footer);
	};

	Accounts.onLogin(async (params: { user: Meteor.User; connection: { onClose: (arg0: () => void) => void } }) => {
		//@ts-ignore
		const userProfile = params.user
			? await userprofileServerApi.getCollectionInstance().findOneAsync({ email: params.user?.profile?.email })
			: undefined;

		if (userProfile)
			await userprofileServerApi
				.getCollectionInstance()
				.updateAsync({ _id: userProfile._id }, { $set: { lastacess: new Date(), connected: true } });

		params.connection.onClose(
			Meteor.bindEnvironment(() => {
				if (userProfile)
					void userprofileServerApi
						.getCollectionInstance()
						.updateAsync({ _id: userProfile._id }, { $set: { lastacess: new Date(), connected: false } })
						.catch((error) => console.error('Falha ao registrar desconexão de usuário', error));
			})
		);
	});

	Accounts.onLogout(async (params) => {
		//@ts-ignore
		const userProfile = params.user
			? await userprofileServerApi.getCollectionInstance().findOneAsync({ email: params.user?.profile?.email })
			: undefined;
		if (userProfile)
			await userprofileServerApi
				.getCollectionInstance()
				.updateAsync({ _id: userProfile._id }, { $set: { lastacess: new Date(), connected: false } });
	});

	Accounts.config({
		sendVerificationEmail: true,
		forbidClientAccountCreation: process.env.ALLOW_CLIENT_ACCOUNT_CREATION !== 'true'
	});

	Accounts.validateLoginAttempt(async ({ user, allowed }: { user: Meteor.User; allowed: boolean }) => {
		if (!allowed) return allowed;
		if (!user) return false;

		// ################################ FACEBOOK ################################################
		if (user.services?.facebook) {
			user.profile = {
				name: user.services.facebook.name,
				email: user.services.facebook.email
			};
			if (!(await validateLoginFacebook(user))) return false;
		} else if (user.services?.google) {
			// ################################ GOOGLE ################################################
			user.profile = {
				name: user.services.google.name,
				email: user.services.google.email
			};
			if (!(await validateLoginGoogle(user))) return false;
		} else if (!user.emails || !user.emails[0].verified) {
			throw new Meteor.Error('Email ñao verificado', `Este email ainda não foi verificado!`);
		}

		const profile = await userprofileServerApi.getCollectionInstance().findOneAsync(getUserProfileSelector(user), {
			fields: { _id: 1, status: 1 }
		});
		if (!profile) {
			throw new Meteor.Error('profile-not-found', 'Não existe um perfil vinculado a esta conta.');
		}
		if (profile.status === 'disabled') {
			throw new Meteor.Error('user-disabled', 'Este usuário está desativado.');
		}
		return true;
	});
});
