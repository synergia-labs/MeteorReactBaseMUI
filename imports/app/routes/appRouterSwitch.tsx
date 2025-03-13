import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { NotFound } from '/imports/sysPages/pages/notFound/notFound';
import { getUser } from '/imports/libs/getUser';
import { segurancaApi } from '/imports/security/api/segurancaApi';
import { IRoute } from '/imports/modules/modulesTypings';
import AuthContext, { IAuthContext } from '../authProvider/authContext';
import sysRoutes from './routes';
import ScreenRouteRender from './screenRouteRender';
import UserProfileContainer from '/imports/modules/userprofile/frontend/pages/userProfileContainer';
import { hasValue } from '/imports/libs/hasValue';

export const AppRouterSwitch: React.FC = React.memo(() => {
	const { user } = useContext<IAuthContext>(AuthContext);
	const location = useLocation();

	const getProtectedRouteElement = (route: IRoute) => {
		return <ScreenRouteRender component={UserProfileContainer} templateVariant="None" />;
		if(!route.isProtected) return <ScreenRouteRender {...route} />;
		if (!hasValue(user)) return <ScreenRouteRender component={UserProfileContainer} templateVariant="None" />;
		
		const hasAccess = segurancaApi.podeAcessarRecurso(getUser(), ...(route.resources || []));
		return hasAccess ? <ScreenRouteRender {...route} /> : <ScreenRouteRender component={UserProfileContainer} templateVariant="None" />;
	};
	
	if (!sysRoutes.checkIfRouteExists(location.pathname)) return <NotFound />;	
	
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
