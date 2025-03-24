import React, { ElementType, useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { hasValue } from "/imports/libs/hasValue";
import { SysLoading } from "/imports/ui/components/sysLoading/sysLoading";
import AuthContext, { IAuthContext } from "../authProvider/authContext";
import sysRoutes from "./routes";
import ScreenRouteRender from "./screenRouteRender";
import NotFoundErrorPage from "/imports/sysPages/pages/error/notFoundErrorPage";
import ForbiddenErrorPage from "/imports/sysPages/pages/error/forbiddenErrorPage";
import { RouteType, ITemplateRouteProps } from "./routeType";

export const AppRouterSwitch: React.FC = React.memo(() => {
	const { user, userLoading } = useContext<IAuthContext>(AuthContext);

	if (userLoading) return <SysLoading size="large" label="Carregando..." />;

	const getProtectedRouteElement = (route: RouteType) => {
		if (!route.isProtected) return <ScreenRouteRender {...route} />;
		return hasValue(user) ? <ScreenRouteRender {...route} /> : <Navigate to="/guest/sign-in" replace />;
	};

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
							getProtectedRouteElement(mergedTemplateProps)
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
			{getRecursiveRoutes(sysRoutes.getRoutes())}
			<Route path="/forbidden" element={<ForbiddenErrorPage />} />
			<Route path="*" element={<NotFoundErrorPage />} />
		</Routes>
	);
});
