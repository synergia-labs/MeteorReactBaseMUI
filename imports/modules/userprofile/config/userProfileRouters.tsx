import UserProfileContainer from '../userProfileContainer';
import { IRoute } from '/imports/modules/modulesTypings';
import { Recurso } from './Recurso';

export const userProfileRouterList: (IRoute | null)[] = [
	{
		path: '/userprofile/:screenState/:userprofileId',
		component: UserProfileContainer,
		isProtected: true,
		resources: [Recurso.USUARIO_VIEW]
	},
	{
		path: '/userprofile/:screenState',
		component: UserProfileContainer,
		isProtected: true,
		resources: [Recurso.USUARIO_VIEW]
	},
	{
		path: '/userprofile',
		component: UserProfileContainer,
		isProtected: true,
		resources: [Recurso.USUARIO_VIEW]
	}
];
