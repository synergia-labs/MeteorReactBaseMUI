import OAuthBase from "../oAuth.base";
import { microsoftServiceDataSchema, MicrosoftServiceDataType } from "../../../common/types/serviceMicrosoftData";
import { Meteor } from "meteor/meteor";
import { hasValue } from "/imports/libs/hasValue";
import storageServer from "/imports/services/storage/storage.server";
import usersServer from "../../server";
import { UserProfileType } from "../../../common/types/meteorUser";
import enumUserRoles from "../../../common/enums/enumUserRoles";
import externalApiServer from "/imports/services/externalApis/backend/server";

class MicrosoftEntraOauth extends OAuthBase<MicrosoftServiceDataType> {
	constructor() {
		super({
			serviceName: Meteor.settings?.auth?.microsoft?.serviceName,
			clientId: Meteor.settings?.auth?.microsoft?.clientId,
			secret: Meteor.settings?.auth?.microsoft?.secret,
			schema: microsoftServiceDataSchema,
			registerHandler: true,
			scopes: [
				"openid", // Permissão básica de OpenID Connect
				"email", // Permissão para acessar o e-mail do usuário
				"profile", // Permissão para acessar o perfil básico do usuário
				"User.Read", // Permissão para ler as informações do usuário
				"GroupMember.Read.All" // Permissão para ler grupos que o usuário pertence
			]
		});
	}

	public async afterRegister(): Promise<void> {
		(Accounts as any).oauth.registerService(this.getServiceName());
		await externalApiServer.azureRegisterOauth({
			serviceName: this.getServiceName(),
			oAuthVersion: this.getOAuthVersion()
		});
		(Accounts as any).addAutopublishFields({
			forLoggedInUser: ["services.microsoft.email", "services.microsoft.name"],
			forOtherUsers: ["services.microsoft.name"]
		});
	}

	protected async onUserMatched(serviceData: any, { accessToken }: any): Promise<Meteor.User | null> {
		const user = (await Accounts.findUserByEmail(serviceData.email)) as Meteor.User;
		if (!user) return null;

		if (!hasValue(user?.profile?.photo)) {
			const buffer = await externalApiServer.getAzureUserPhoto({ accessToken: accessToken });

			if (hasValue(buffer)) {
				const imageName = `${serviceData.email}`;
				const { _id } = await storageServer.uploadImage({
					archive: {
						content: buffer!,
						name: `${imageName}.jpeg`,
						alt: imageName,
						type: "image/jpeg",
						size: buffer!.length
					}
				});
				await usersServer.gerMongo().updateAsync({ _id: user._id }, { $set: { "profile.photo": _id } });
			}
		}

		return user;
	}

	public async onCreateUser(user: Meteor.User, { accessToken }: any): Promise<Meteor.User> {
		if (!user.services?.microsoft) throw new Meteor.Error("servicesNotFound", "Serviços não encontrados");
		if (user?.services?.microsoft?.id) user._id = user.services.microsoft.id;
		const bufferImage = await externalApiServer.getAzureUserPhoto({ accessToken: accessToken });
		let imageId: string | undefined;
		if (hasValue(bufferImage)) {
			const imageName = `${user.services.microsoft.email}`;
			const { _id } = await storageServer.uploadImage({
				archive: {
					content: bufferImage!,
					name: `${imageName}.jpeg`,
					alt: imageName,
					type: "image/jpeg",
					size: bufferImage!.length
				}
			});
			imageId = _id;
		}

		const profile: UserProfileType = {
			name: user.services?.microsoft?.displayName || "-",
			roles: [enumUserRoles.ADMIN],
			photo: imageId
		};
		return {
			...user,
			profile: profile
		};
	}
}

const microsoftEntraOauth = new MicrosoftEntraOauth();
export default microsoftEntraOauth;
