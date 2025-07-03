if (!Meteor.isClient) throw new Meteor.Error("isClient", "Esse arquivo só deve ser executado no cliente");
import { Meteor } from "meteor/meteor";
import { OAuth } from "meteor/oauth";
import { Random } from "meteor/random";
import { Configuration, ServiceConfiguration } from "meteor/service-configuration";

// Tipo para o callback de credenciais
type CredentialRequestCompleteCallbackType = (
	error?: Error | Meteor.Error | Meteor.TypedError,
	credentials?: {
		token: string;
		[key: string]: any;
	}
) => void;

const serviceName = "microsoft";

(Accounts as any).oauth.registerService(serviceName);

function requestCredential(
	options: Meteor.IMicrosoftLoginOptions,
	credentialRequestCompleteCallback: CredentialRequestCompleteCallbackType
) {
	if (!options) options = {};

	const config: Configuration | undefined = ServiceConfiguration.configurations.findOne({ service: serviceName });
	if (!config)
		return credentialRequestCompleteCallback?.(
			new Meteor.Error("ServiceConfiguration.ConfigError", `Serviço ${serviceName} não configurado`)
		);

	const credentialToken = Random.secret();
	const loginStyle = OAuth._loginStyle(serviceName, config, options) || "popup";

	const redirectUri = OAuth._redirectUri(serviceName, config);

	const state = OAuth._stateParam(loginStyle, credentialToken, options.redirectUrl || null);

	const loginUrl =
		`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
		`client_id=${encodeURIComponent(config.clientId)}` +
		`&response_type=code` +
		`&redirect_uri=${encodeURIComponent(redirectUri)}` +
		`&scope=${encodeURIComponent(["openid", "email", "profile", "User.Read", "GroupMember.Read.All"].join(" "))}` +
		`&state=${encodeURIComponent(state)}` +
		`&response_mode=query`;

	OAuth.launchLogin({
		loginService: serviceName,
		loginStyle: loginStyle,
		loginUrl: loginUrl,
		credentialRequestCompleteCallback: credentialRequestCompleteCallback,
		credentialToken: credentialToken,
		popupOptions: { width: 800, height: 600 }
	});
}

Meteor.loginWithMicrosoft = function (
	options: Meteor.IMicrosoftLoginOptions = {},
	callback?: Meteor.LoginCallbackType
) {
	if (!callback && typeof options === "function") {
		callback = options as unknown as Meteor.LoginCallbackType;
		options = {};
	}

	const credentialRequestCompleteCallback = (Accounts as any).oauth.credentialRequestCompleteHandler(callback);
	requestCredential(options, credentialRequestCompleteCallback);
};
