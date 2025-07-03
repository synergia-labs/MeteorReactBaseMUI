import React, { ElementType, useContext, Suspense, useEffect, ReactNode } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { hasValue } from "/imports/libs/hasValue";
import NotFoundErrorPage from "../../../modules/basicPages/frontend/pages/error/notFoundErrorPage";
import ForbiddenErrorPage from "../../../modules/basicPages/frontend/pages/error/forbiddenErrorPage";
import { RouteType, ITemplateRouteProps } from "../types/routeType";
import { RouterContext } from "./routesProvider";
import { SysTemplateContext } from "../../templates/templateContext";
import { enumSysTemplateOptions } from "../../templates/enum/sysTemplateOptions";
import LinearIndeterminateLoading from "/imports/components/LinearIndeterminateLoading/loading";

const RouteWrapper = ({
	children,
	canUpdateTemplate,
	props,
	variant
}: {
	children: React.ReactNode;
	canUpdateTemplate: boolean;
	variant?: enumSysTemplateOptions;
	props?: Record<string, any>;
}) => {
	const { setTemplate } = useContext(SysTemplateContext);
	useEffect(() => {
		setTemplate &&
			canUpdateTemplate &&
			setTemplate({
				variant: variant ?? enumSysTemplateOptions.APPBAR,
				props: props
			});
	}, [variant]); // A dependência vazia [] faz a função ser chamada apenas na montagem

	return <>{children}</>;
};

export const AppRouterSwitch: React.FC = React.memo(() => {
	const { routes, routerLoading } = useContext(RouterContext);

	if (routerLoading) return;

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
							<RouteWrapper
								canUpdateTemplate={!hasValue(children)}
								variant={mergedTemplateProps.templateVariant}
								props={mergedTemplateProps.templateProps}>
								<Suspense fallback={<LinearIndeterminateLoading isLoading={true} />}>
									{!hasValue(children) ? (
										<Component />
									) : (
										<Component>
											<Outlet />
										</Component>
									)}
								</Suspense>
							</RouteWrapper>
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

	const renderErrorRoute = (children: ReactNode) => (
		<RouteWrapper canUpdateTemplate={true} variant={enumSysTemplateOptions.NONE}>
			<Suspense fallback={<LinearIndeterminateLoading isLoading={true} />}>{children}</Suspense>
		</RouteWrapper>
	);

	return (
		<Routes>
			{getRecursiveRoutes(routes)}
			<Route path="/forbidden" element={renderErrorRoute(<ForbiddenErrorPage />)} />
			<Route path="*" element={renderErrorRoute(<NotFoundErrorPage />)} />
		</Routes>
	);
});
