import React, { ElementType, useContext, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { hasValue } from "/imports/libs/hasValue";
import { SysLoading } from "../../../components/sysLoading/sysLoading";
import ScreenRouteRender from "./screenRouteRender";
import NotFoundErrorPage from "../../../modules/basicPages/frontend/pages/error/notFoundErrorPage";
import ForbiddenErrorPage from "../../../modules/basicPages/frontend/pages/error/forbiddenErrorPage";
import { RouteType, ITemplateRouteProps } from "../types/routeType";
import { RouterContext } from "./routesProvider";

export const AppRouterSwitch: React.FC = React.memo(() => {
	const { routes, routerLoading } = useContext(RouterContext);

	if (routerLoading) return <SysLoading size="large" label="Carregando..." />;

	const getRecursiveRoutes = (routes: RouteType[], parentTemplateProps?: ITemplateRouteProps) => {
		try {
			return routes.map(({ children, path, index, fullPath, ...rest }) => {
				const mergedTemplateProps = { ...parentTemplateProps, ...rest } as RouteType;

				// Verifica se o elemento existe antes de tentar usá-lo
				if (!mergedTemplateProps.element) {
					console.error(`Elemento indefinido para a rota: ${fullPath}`);
					return null;
				}

				// Obtém o componente corretamente
				const Component: ElementType = mergedTemplateProps.element as ElementType;

				return (
					<Route
						key={`${fullPath}`}
						path={path}
						element={
							<Suspense fallback={<SysLoading size="large" label="Carregando página..." />}>
								{!hasValue(children) ? (
									<ScreenRouteRender {...mergedTemplateProps} />
								) : (
									<Component>
										<Outlet />
									</Component>
								)}
							</Suspense>
						}
						caseSensitive={mergedTemplateProps.caseSensitive}
						{...(index ? { index: false } : {})}>
						{children ? getRecursiveRoutes(children, mergedTemplateProps) : null}
					</Route>
				);
			});
		} catch (error) {
			console.error("Erro ao processar rotas:", error);
			return [];
		}
	};

	return (
		<Routes>
			{getRecursiveRoutes(routes)}
			<Route path="/forbidden" element={<ForbiddenErrorPage />} />
			<Route path="*" element={<NotFoundErrorPage />} />
		</Routes>
	);
});
