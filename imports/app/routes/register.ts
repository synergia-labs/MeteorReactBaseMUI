import { RouteType } from "./types/routeType";
import basicPagesRouterList from "/imports/modules/basicPages/routes";
import usersRouterList from "/imports/modules/userprofile/usersRouters";

export const sysRoutesListFullPaths: Array<string> = [];

function addFullPathToRoutes(routes: Array<RouteType>, parentPath = ""): Array<RouteType> {
	return routes.map((route) => {
		const fullPath = `${parentPath}/${route.path}`;
		sysRoutesListFullPaths.push(fullPath);
		const children = route.children ? addFullPathToRoutes(route.children, fullPath) : undefined;
		return { ...route, fullPath, children };
	});
}

export const sysRoutesList: Array<RouteType> = addFullPathToRoutes([...basicPagesRouterList, ...usersRouterList]);

addFullPathToRoutes(sysRoutesList);
