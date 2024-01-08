import React from 'react';
import Home from '../pages/Home/Home';
import { SignUp } from '../pages/SignUp/SignUp';
import Signout from '../pages/SignOut/Signout';
import { EmailVerify } from '../pages/EmailVerify/EmailVerify';
import { ResetPassword } from '/imports/ui/pages/ResetPassword/ResetPassword';
import { SignIn } from '../pages/SignIn/Signin';
import { PasswordRecovery } from '../pages/RecoveryPassword/PasswordRecovery';
import { IRoute } from '/imports/modules/modulesTypings';

export const pagesRouterList : (IRoute | null)[] = [
	{
		path: '/',
		exact: true,
		component: Home,
		isProtected: false
	},
	{
		path: '/signin',
		component: SignIn,
		isProtected: false
	},
	{
		path: '/signup',
		component: SignUp,
		isProtected: false
	},
	{
		path: '/signout',
		component: Signout,
		isProtected: true
	},
	{
		path: '/password-recovery',
		component: PasswordRecovery
	},
	{
		path: '/reset-password/:token',
		component: ResetPassword
	},
	{
		path: '/enroll-account/:token',
		component: ResetPassword
	},
	{
		path: '/verify-email/:token',
		component: EmailVerify
	}
];
