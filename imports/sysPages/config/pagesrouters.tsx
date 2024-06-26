import Home from '../pages/Home/Home';
import { SignUp } from '../pages/SignUp/SignUp';
import Signout from '../pages/SignOut/Signout';
import { EmailVerify } from '../pages/EmailVerify/EmailVerify';
import { ResetPassword } from '../pages/ResetPassword/ResetPassword';
import { PasswordRecovery } from '../pages/RecoveryPassword/PasswordRecovery';
import { IRoute } from '/imports/modules/modulesTypings';
import { NoPermission } from '../pages/NoPermission/NoPermission';
import SignInPage from '../pages/signIn/signIn';
import { HomeResources, SysFormTestPageResources } from './resources';
import SysFormPlayground from '../pages/SysFormPlayground/sysFormPlayground';

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
