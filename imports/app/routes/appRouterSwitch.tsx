import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import { NotFound } from '/imports/sysPages/pages/notFound/notFound';
import { getUser } from '/imports/libs/getUser';
import { segurancaApi } from '/imports/security/api/segurancaApi';
import { IRoute } from '/imports/modules/modulesTypings';
import { subjectRouter } from '/imports/analytics/analyticsSubscriber';
import AuthContext, { IAuthContext } from '../authProvider/authContext';
import sysRoutes from './routes';
import SignInPage from '/imports/sysPages/pages/signIn/signIn';
import { SysLoading } from '/imports/ui/components/sysLoading/sysLoading';
import ScreenRouteRender from './screenRouteRender';

export const AppRouterSwitch: React.FC = React.memo(() => {
	const { isLoggedIn, userLoading, user } = useContext<IAuthContext>(AuthContext);
	const location = useLocation();
	const params = useParams();

	useEffect(() => {
		subjectRouter.next({ pathname: location.pathname, params, user });
	}, [location, params, user]);
	
	const getProtectedRouteElement = (route: IRoute) => {
		if(!route.isProtected) return <ScreenRouteRender {...route} />;
		if (!isLoggedIn) return <ScreenRouteRender component={SignInPage} templateVariant="None" />;
		
		const hasAccess = segurancaApi.podeAcessarRecurso(getUser(), ...(route.resources || []));
		return hasAccess ? <ScreenRouteRender {...route} /> : <ScreenRouteRender component={SignInPage} templateVariant="None" />;
	};
	
	if (!sysRoutes.checkIfRouteExists(location.pathname)) return <NotFound />;	

	if (userLoading) return <SysLoading size="large" label="Carregando..." />;
	
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
