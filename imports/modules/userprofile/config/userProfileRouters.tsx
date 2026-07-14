import { IRoute } from '../../../modules/modulesTypings';
import { Recurso } from './recurso';
import asyncComponent from '../../../libs/asyncComponent';

const UserProfileContainer = asyncComponent(() => import('../userProfileContainer'));

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
