import Home from '../../sysPages/pages/home/home';
import { IRoute } from '../../modules/modulesTypings';
import SysFormPlayground from '../../sysPages/pages/sysFormPlayground/sysFormPlayground';

export const pagesRouterList: Array<(IRoute | null)> = [
	{
		path: '/',
		element: Home,
		isProtected: true,	
		index: true,
	},
	{
		path: '/sysFormTests',
		element: SysFormPlayground,
		isProtected: true,
	}
];
