import { RouteType } from "./routeType";
import exampleRouterList from "/imports/modules/example/routes/exampleRouters";
// import usersRouterList from "/imports/modules/userprofile/routes/usersRouters";

export const sysRoutesListFullPaths: Array<string> = [];

function addFullPathToRoutes(routes: Array<RouteType>, parentPath = ""): Array<RouteType> {
	return routes.map((route) => {
		const fullPath = `${parentPath}/${route.path}`;
		sysRoutesListFullPaths.push(fullPath);
		const children = route.children ? addFullPathToRoutes(route.children, fullPath) : undefined;
		return { ...route, fullPath, children };
	});
}

export const sysRoutesList: Array<RouteType> = addFullPathToRoutes([
	...exampleRouterList
	//	...usersRouterList
]);

addFullPathToRoutes(sysRoutesList);
