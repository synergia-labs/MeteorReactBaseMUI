import React from "react";
import { AppMenuType, RouteType } from "./routeType";
import { hasValue } from "/imports/libs/hasValue";
import securityApi from "/imports/base/services/security/security.api";
import { sysRoutesList, sysRoutesListFullPaths } from "./register";

interface IRouteProvider {
	routes: RouteType[];
	menuItens: AppMenuType[];
}

export const RouterContext = React.createContext<IRouteProvider>({} as IRouteProvider);

export default function AppRouteProvider({ children }: { children: React.ReactNode }) {
	const [routes, setRoutes] = React.useState<RouteType[]>([]);
	const [menuItens, setMenuItens] = React.useState<AppMenuType[]>([]);
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
			if (error) console.error("Error checking path permissions", error);
			permissions.current = result;
			setRoutes(_constructRoute(sysRoutesList));
			console.log("Permissions", result);
			setMenuItens(_constructMenuItens(sysRoutesList));
			console.log("Routes", routes);
			console.log("MenuItens", menuItens);
		});
	}

	React.useEffect(() => {
		updateRoutesPermissions();
	}, []);

	const value = React.useMemo(() => {
		return {
			routes: routes,
			menuItens: menuItens
		};
	}, [routes, menuItens]);

	return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}
