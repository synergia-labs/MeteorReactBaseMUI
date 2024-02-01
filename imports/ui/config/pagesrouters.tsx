import React from 'react';
import Home from '../pages/Home/Home';
import { SignUp } from '../pages/SignUp/SignUp';
import Signout from '../pages/SignOut/Signout';
import { EmailVerify } from '../pages/EmailVerify/EmailVerify';
import { ResetPassword } from '/imports/ui/pages/ResetPassword/ResetPassword';
import { SignIn } from '../pages/SignIn/Signin';
import { PasswordRecovery } from '../pages/RecoveryPassword/PasswordRecovery';
import { IRoute } from '/imports/modules/modulesTypings';
import {Recurso} from '../pages/Home/Recurso';
import { NoPermission } from '../pages/NoPermission/NoPermission';

export const pagesRouterList : (IRoute | null)[] = [
	{
		path: '/',
		exact: true,
		component: Home,
		isProtected: true,
		resources: [Recurso.HOME_VIEW]
	},
	{
		path: '/signin',
		component: SignIn,
		isProtected: false,
		templateVariant: 'None',
	},
	{
		path: '/signup',
		component: SignUp,
		isProtected: false,
		templateVariant: 'None'
	},
	{
		path: '/signout',
		component: Signout,
		isProtected: true,
		templateVariant: 'None'
	},
	{
		path: '/no-permission',
		component: NoPermission,
		isProtected: true,
	},
	{
		path: '/password-recovery',
		component: PasswordRecovery,
		templateVariant: 'None'
	},
	{
		path: '/reset-password/:token',
		component: ResetPassword,
		templateVariant: 'None'
	},
	{
		path: '/enroll-account/:token',
		component: ResetPassword,
		templateVariant: 'None'
	},
	{
		path: '/verify-email/:token',
		component: EmailVerify,
		templateVariant: 'None'
	},
];
