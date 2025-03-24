import { RouteType } from "./routeType";
import { sysRoutesList, sysRoutesListFullPaths } from "./register";
import securityApi from "/imports/base/services/security/security.api";
import { hasValue } from "/imports/libs/hasValue";
class SysRoutes {
	private permissions: Record<string, boolean> = {};
	private routes: Array<RouteType> = [];

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

	public async updateRoutesPermissions() {
		securityApi.checkMethodPermission({ names: sysRoutesListFullPaths }, (error, result) => {
			if (error) console.error("Error checking path permissions", error);
			this.permissions = result;
			this.routes = this._constructRoute(sysRoutesList);
		});
	}

	public getRoutes = (): Array<RouteType> => this.routes;
	public getMenuItens = () => {
		return this.menuItens.map((item) => {
			if (!item?.path) return undefined;
			return {
				...item,
				resources: false
			};
		});
	};
}

const sysRoutes = new SysRoutes();
export default sysRoutes;
