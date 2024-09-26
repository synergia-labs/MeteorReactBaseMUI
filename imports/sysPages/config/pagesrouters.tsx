import Home from '/imports/sysPages/pages/home/home';
import { SignUp } from '/imports/sysPages/pages/signUp/signUp';
import Signout from '/imports/sysPages/pages/signOut/signout';
import { EmailVerify } from '/imports/sysPages/pages/emailVerify/emailVerify';
import { ResetPassword } from '/imports/sysPages/pages/resetPassword/resetPassword';
import { PasswordRecovery } from '/imports/sysPages/pages/recoveryPassword/passwordRecovery';
import { IRoute } from '/imports/modules/modulesTypings';
import { NoPermission } from '/imports/sysPages/pages/noPermission/noPermission';
import SignInPage from '../pages/signIn/signIn';
import { HomeResources, SysFormTestPageResources } from './resources';
import SysFormPlayground from '/imports/sysPages/pages/sysFormPlayground/sysFormPlayground';

export const pagesRouterList: (IRoute | null)[] = [
	{
		path: '/',
		exact: true,
		component: Home,
		isProtected: true,
		resources: [HomeResources.HOME_VIEW]
	},
	{
		path: '/sysFormTests',
		component: SysFormPlayground,
		isProtected: true,
		resources: [SysFormTestPageResources.SYSFORMTESTS_VIEW]
	},
	{
		path: '/signin',
		component: SignInPage,
		isProtected: false,
		templateVariant: 'None'
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
		isProtected: true
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
	}
];
