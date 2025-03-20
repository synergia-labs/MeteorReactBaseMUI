import './accounts';
import githubOAuth from './githubOauth';
import googleOAuth from './googleOauth';
import OAuthBase from '/imports/base/services/auth/oAuth.base';

const oAuthInstances: Array<OAuthBase<any>> = [githubOAuth, googleOAuth];

Meteor.startup(async () => {
	for (const oAuthInstance of oAuthInstances) await oAuthInstance.register();
	(Accounts as any).setAdditionalFindUserOnExternalLogin(
		async ({ serviceName, serviceData }: { serviceName: string; serviceData: any }) => {
			const authInstance = oAuthInstances.find((oAuthInstance) => oAuthInstance.getServiceName() === serviceName);
			if (authInstance) return await authInstance.additionalFindUserOnExternalLogin(serviceData);
		}
	);
});
