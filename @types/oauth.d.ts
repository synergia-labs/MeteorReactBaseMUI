declare module "meteor/oauth" {
	namespace OAuth {
		//@ts-ignore
		function _loginStyle(service: string, config: Configuration, options: Meteor.IMicrosoftLoginOptions): string;
		function _stateParam(loginStyle: string, credentialToken: string, redirectUrl: string | null): string;
		function _redirectUri(service: string, config: Configuration): string;

		interface ILaunchLoginOptions {
			loginService: string;
			loginStyle: string;
			loginUrl: string;
			//@ts-ignore
			credentialRequestCompleteCallback: CredentialRequestCompleteCallbackType;
			credentialToken: string;
			popupOptions?: {
				width?: number;
				height?: number;
				[key: string]: any;
			};
		}

		function launchLogin(options: ILaunchLoginOptions): void;
	}
}
