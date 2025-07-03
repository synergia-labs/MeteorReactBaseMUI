/* eslint-disable @typescript-eslint/naming-convention */
declare module "meteor/service-configuration" {
	interface Configuration {
		clientId: string;
		secret: string;
		scopes?: Array<string>;
	}
}
