import React from "react";
import { AppMenuType, RouteType } from "./routeType";
import { hasValue } from "/imports/libs/hasValue";
import securityApi from "/imports/base/services/security/security.api";
import { sysRoutesList, sysRoutesListFullPaths } from "./register";

interface IRouteProvider {
	routes: RouteType[];
	menuItens: AppMenuType[];
	routerLoading: boolean;
}

export const RouterContext = React.createContext<IRouteProvider>({} as IRouteProvider);

export default function AppRouterProvider({ children }: { children: React.ReactNode }) {
	const [routes, setRoutes] = React.useState<RouteType[]>([]);
	const [menuItens, setMenuItens] = React.useState<AppMenuType[]>([]);
	const [routerLoading, setRouterLoading] = React.useState<boolean>(true);
	const permissions = React.useRef<Record<string, boolean>>({});

	function _constructRoute(routes: Array<RouteType>): Array<RouteType> {
		return routes
			.filter((route) => {
				return hasValue(permissions.current[route.fullPath ?? "_"]);
			})
			.map((route): RouteType => {
				const children = hasValue(route.children) ? _constructRoute(route.children as Array<RouteType>) : undefined;
				return { ...route, children };
			});
	}

	function _constructMenuItens(routes: Array<RouteType>): Array<AppMenuType> {
		return routes.map((route) => {
			return route.name
				? {
						name: route.name,
						path: route.fullPath,
						icon: route.icon,
						children: hasValue(route.children) ? _constructMenuItens(route.children as Array<RouteType>) : undefined
					}
				: {};
		});
	}

	async function updateRoutesPermissions() {
		securityApi.checkMethodPermission({ names: sysRoutesListFullPaths }, (error, result) => {
			setRouterLoading(false);
			if (error) console.error("Error checking path permissions", error);
			permissions.current = result;
			setRoutes(_constructRoute(sysRoutesList));
			setMenuItens(_constructMenuItens(sysRoutesList));
		});
	}

	React.useEffect(() => {
		updateRoutesPermissions();
	}, []);

	const value = React.useMemo(() => {
		// console.log("Permissions", permissions.current);
		// console.log("Routes", routes);
		// console.log("MenuItens", menuItens);

		return {
			routes: routes,
			menuItens: menuItens,
			routerLoading: routerLoading
		};
	}, [routes, menuItens]);

	return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}
