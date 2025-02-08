import Modules from '../../modules';
import Pages from '../../sysPages/config';
import { IAppMenu, IRoute } from '../../modules/modulesTypings';
import { useLocation } from 'react-router-dom';

class SysRoutes {
	private routes: Array<IRoute | null>;
	private menuItens: Array<IAppMenu | null>;
	public getRoutes = (): Array<IRoute>  => this.routes.filter((route) => route !== null) as Array<IRoute>;
	public getMenuItens = () => {
		return this.menuItens.map((item) => {
			if(!item?.path) return undefined;
			const routeResources = this.routes.filter((route) => route?.path === item.path).map((route) => route?.resources);
			return {
				...item,
				resources: routeResources.length > 0 ? routeResources[0] : undefined
			}
		});
	};

	constructor() {
		this.routes = [...Modules.pagesRouterList, ...Pages.pagesRouterList ];
		this.menuItens = [...Pages.pagesMenuItemList, ...Modules.pagesMenuItemList];
	}

	public checkIfRouteExists = (path: string) =>
		this.routes.some((route) => {
			if (!route?.path) return false;
			const routeRegex = new RegExp('^' + route.path.replace(/:[^\s/]+/g, '([^/]+)') + '$');
			return routeRegex.test(path);
		});

	public checkIfRouteIsProtected = (path: string): boolean => {
		for (const route of this.routes) {
			if (!route?.path || route.path !== path) continue;
			return route.isProtected || false;
		}
		return false;
	};

	public checkIsActiveRoute = (routePath?: string) => {
		const location = useLocation().pathname;
		if (!routePath) return false;
		if (routePath === '/') return location === '/';

		const normalizedRoutePath = routePath.replace(/\/$/, '');

		return location.startsWith(normalizedRoutePath);
	};
}

const sysRoutes = new SysRoutes();
export default sysRoutes;
