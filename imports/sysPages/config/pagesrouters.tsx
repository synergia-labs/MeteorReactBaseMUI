import { IRoute } from '../../modules/modulesTypings';
import { HomeResources, SysFormTestPageResources } from './resources';
import asyncComponent from '../../libs/asyncComponent';

const Home = asyncComponent(() => import('../pages/home/home'));
const SignUp = asyncComponent(() => import('../pages/signUp/signUp').then(({ SignUp }) => ({ default: SignUp })));
const EmailVerify = asyncComponent(() =>
	import('../pages/emailVerify/emailVerify').then(({ EmailVerify }) => ({ default: EmailVerify }))
);
const ResetPassword = asyncComponent(() =>
	import('../pages/resetPassword/resetPassword').then(({ ResetPassword }) => ({ default: ResetPassword }))
);
const PasswordRecovery = asyncComponent(() =>
	import('../pages/recoveryPassword/passwordRecovery').then(({ PasswordRecovery }) => ({ default: PasswordRecovery }))
);
const NoPermission = asyncComponent(() =>
	import('../pages/noPermission/noPermission').then(({ NoPermission }) => ({ default: NoPermission }))
);
const SignInPage = asyncComponent(() => import('../pages/signIn/signIn'));
const SysFormPlayground = asyncComponent(() => import('../pages/sysFormPlayground/sysFormPlayground'));

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
