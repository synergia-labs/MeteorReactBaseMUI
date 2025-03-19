import React, { useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { NotFound } from '/imports/sysPages/pages/notFound/notFound';
import { getUser } from '/imports/libs/getUser';
import { segurancaApi } from '/imports/security/api/segurancaApi';
import { IRoute } from '/imports/modules/modulesTypings';
import AuthContext, { IAuthContext } from '../authProvider/authContext';
import sysRoutes from './routes';
import ScreenRouteRender from './screenRouteRender';
import { hasValue } from '/imports/libs/hasValue';
import { SysLoading } from '/imports/ui/components/sysLoading/sysLoading';

export const AppRouterSwitch: React.FC = React.memo(() => {
	const { user, userLoading } = useContext<IAuthContext>(AuthContext);
	const location = useLocation();

	const getProtectedRouteElement = (route: IRoute) => {
		if(!route.isProtected) return <ScreenRouteRender {...route} />;
		if (!hasValue(user)) return <Navigate to='/sign-in' />;
		
		const hasAccess = segurancaApi.podeAcessarRecurso(getUser(), ...(route.resources || []));
		return hasAccess ? <ScreenRouteRender {...route} /> : <Navigate to='/sign-in' />;
	};

	if (!sysRoutes.checkIfRouteExists(location.pathname)) return <NotFound />;	
	if(userLoading) return <SysLoading size="large" label="Carregando..." />;

	return (
		<Routes>
			{sysRoutes.getRoutes().map((route) => (
				<Route
					key={route.path}
					path={route.path as string}
					element={getProtectedRouteElement(route)}
				/>
			))}
		</Routes>
	);
});
