import React, { ElementType, useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { NotFound } from '/imports/sysPages/pages/notFound/notFound';
import { hasValue } from '/imports/libs/hasValue';
import { SysLoading } from '/imports/ui/components/sysLoading/sysLoading';
import { IRoute, ITemplateRouteProps } from '/imports/modules/modulesTypings';
import AuthContext, { IAuthContext } from '../authProvider/authContext';
import sysRoutes from './routes';
import ScreenRouteRender from './screenRouteRender';

export const AppRouterSwitch: React.FC = React.memo(() => {
	const { user, userLoading } = useContext<IAuthContext>(AuthContext);

	if (userLoading) return <SysLoading size="large" label="Carregando..." />;

	const getProtectedRouteElement = (route: IRoute) => {
		if (!route.isProtected) return <ScreenRouteRender {...route} />;
		return hasValue(user) ? <ScreenRouteRender {...route} /> : <Navigate to="/guest/sign-in" replace />;
	};

	const getRecursiveRoutes = (
		routes: IRoute[],
		parentPath = '',
		parentTemplateProps?: ITemplateRouteProps
	): JSX.Element[] => {
		return routes.map(({ children, path, index, ...rest }) => {
			const fullPath = `${parentPath}/${path || ''}`.replace(/\/+/g, '/');
			const mergedTemplateProps = { ...parentTemplateProps, ...rest };

			const Component: ElementType = mergedTemplateProps.element as ElementType;

			const getElement = () =>
				!children ? (
					getProtectedRouteElement(mergedTemplateProps)
				) : (
					<Component>
						<Outlet />
					</Component>
				);

			return (
				<Route
					key={`${fullPath}`}
					path={path}
					element={getElement()}
					caseSensitive={mergedTemplateProps.caseSensitive}
					{...(index ? { index: false } : {})}>
					{children ? getRecursiveRoutes(children, fullPath, mergedTemplateProps) : null}
				</Route>
			);
		});
	};

	return (
		<Routes>
			{getRecursiveRoutes(sysRoutes.getRoutes())}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
});
