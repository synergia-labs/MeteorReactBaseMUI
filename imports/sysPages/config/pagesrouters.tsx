import Home from "../../sysPages/pages/home/home";
import { RouteType } from "../../modules/modulesTypings";
import SysFormPlayground from "../../sysPages/pages/sysFormPlayground/sysFormPlayground";

export const pagesRouterList: Array<RouteType | null> = [
	{
		path: "/",
		element: Home,
		isProtected: true,
		index: true
	},
	{
		path: "/sysFormTests",
		element: SysFormPlayground,
		isProtected: true
	}

	// {
	// 	path: '/',
	// 	exact: true,
	// 	component: Home,
	// 	isProtected: true,
	// 	resources: [enumHomeResources.HOME_VIEW]
	// },
	// {
	// 	path: '/sysFormTests',
	// 	component: SysFormPlayground,
	// 	isProtected: true,
	// 	resources: [enumSysFormTestPageResources.SYSFORMTESTS_VIEW]
	// },
	// {
	// 	path: '/signin',
	// 	component: SignInPage,
	// 	isProtected: false,
	// 	templateVariant: 'None'
	// },
	// {
	// 	path: '/signup',
	// 	component: SignUp,
	// 	isProtected: false,
	// 	templateVariant: 'None'
	// },
	// {
	// 	path: '/no-permission',
	// 	component: NoPermission,
	// 	isProtected: true
	// },
	// {
	// 	path: '/password-recovery',
	// 	component: PasswordRecovery,
	// 	templateVariant: 'None'
	// },
	// {
	// 	path: '/reset-password/:token',
	// 	component: ResetPassword,
	// 	templateVariant: 'None'
	// },
	// {
	// 	path: '/enroll-account/:token',
	// 	component: ResetPassword,
	// 	templateVariant: 'None'
	// },
	// {
	// 	path: '/verify-email/:token',
	// 	component: EmailVerify,
	// 	templateVariant: 'None'
	// }
];
