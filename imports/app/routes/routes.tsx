import { AppMenuType, RouteType } from "./routeType";
import { sysRoutesList, sysRoutesListFullPaths } from "./register";
import securityApi from "/imports/base/services/security/security.api";
import { hasValue } from "/imports/libs/hasValue";
class SysRoutes {
	private permissions: Record<string, boolean> = {};
	private routes: Array<RouteType> = [];
	private menuItens: Array<AppMenuType> = [];

	constructor() {
		this.updateRoutesPermissions();
	}

	private _constructRoute = (routes: Array<RouteType>): Array<RouteType> => {
		return routes
			.filter((route) => {
				return hasValue(this.permissions[route.fullPath ?? "_"]);
			})
			.map((route): RouteType => {
				const children = hasValue(route.children) ? this._constructRoute(route.children as Array<RouteType>) : undefined;
				return { ...route, children };
			});
	};

	private _constructMenuItens = (routes: Array<RouteType>): Array<AppMenuType> => {
		return routes.map((route) => {
			return route.name
				? {
						name: route.name,
						path: route.fullPath,
						icon: route.icon,
						children: hasValue(route.children) ? this._constructMenuItens(route.children as Array<RouteType>) : undefined
					}
				: {};
		});
	};

	public async updateRoutesPermissions() {
		securityApi.checkMethodPermission({ names: sysRoutesListFullPaths }, (error, result) => {
			if (error) console.error("Error checking path permissions", error);
			console.log("Permissions", result);
			this.permissions = result;
			this.routes = this._constructRoute(sysRoutesList);
			this.menuItens = this._constructMenuItens(sysRoutesList);
			console.log("Routes", this.routes);
			console.log("MenuItens", this.menuItens);
		});
	}

	public getRoutes = (): Array<RouteType> => this.routes;
	public getMenuItens = (): Array<AppMenuType> => this.menuItens;
}

const sysRoutes = new SysRoutes();
export default sysRoutes;
