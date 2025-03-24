import React, { ElementType, useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { hasValue } from "/imports/libs/hasValue";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import ScreenRouteRender from "./screenRouteRender";
import NotFoundErrorPage from "/imports/sysPages/pages/error/notFoundErrorPage";
import ForbiddenErrorPage from "/imports/sysPages/pages/error/forbiddenErrorPage";
import { RouteType, ITemplateRouteProps } from "./routeType";
import { RouterContext } from "./routesProvider";

export const AppRouterSwitch: React.FC = React.memo(() => {
	const { routes, routerLoading } = useContext(RouterContext);

	if (routerLoading) return <SysLoading size="large" label="Carregando..." />;

	const getRecursiveRoutes = (routes: RouteType[], parentTemplateProps?: ITemplateRouteProps): JSX.Element[] => {
		return routes.map(({ children, path, index, fullPath, ...rest }) => {
			const mergedTemplateProps = { ...parentTemplateProps, ...rest } as RouteType;

			const Component: ElementType = mergedTemplateProps.element as ElementType;

			return (
				<Route
					key={`${fullPath}`}
					path={path}
					element={
						!hasValue(children) ? (
							<ScreenRouteRender {...mergedTemplateProps} />
						) : (
							<Component>
								<Outlet />
							</Component>
						)
					}
					caseSensitive={mergedTemplateProps.caseSensitive}
					{...(index ? { index: false } : {})}>
					{children ? getRecursiveRoutes(children, mergedTemplateProps) : null}
				</Route>
			);
		});
	};

	return (
		<Routes>
			{getRecursiveRoutes(routes)}
			<Route path="/forbidden" element={<ForbiddenErrorPage />} />
			<Route path="*" element={<NotFoundErrorPage />} />
		</Routes>
	);
});
