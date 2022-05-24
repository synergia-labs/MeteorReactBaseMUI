import React from 'react';
import { Route, Routes, useLocation,useNavigate } from 'react-router-dom';
import Modules from '../../modules';
import NotFound from '../pages/NotFound/NotFound';
import { getUser } from '/imports/libs/getUser';
import { segurancaApi } from '/imports/seguranca/api/SegurancaApi';
import { IRoute } from '/imports/modules/modulesTypings';
import Signin from '/imports/ui/pages/SignIn/Signin';

interface IPublicRoute extends IRoute {
	generalProps?: {isLoggedIn: boolean};
}

const AppRouterSwitch = (switchProps: any) => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<Routes location={location}>
			{(Modules.getListOfRouterModules() || [])
				.filter(r => !!r)
				.map((routerData: IRoute | null) => {
					if (routerData?.isProtected) {
						const Component = routerData.component;
						const resources = routerData.resources;

						const isLogged = switchProps?.isLoggedIn;
						let possuiPermissao = true;
						if (resources) {
							possuiPermissao = segurancaApi.podeAcessarRecurso(getUser(), ...resources)
						}
						return <Route
								key={routerData?.path}
								exact={true}
								path={routerData?.path}
								element={isLogged && possuiPermissao?<Component navigate={navigate} {...switchProps} />:<Signin navigate={navigate} location={location} {...switchProps} />}
						/>
					} else {
						const Component = routerData.component;
						return <Route
								key={routerData?.path}
								exact={true}
								path={routerData?.path}
								element={<Component navigate={navigate} {...switchProps} />}

						/>
					}
				})}
			<Route element={NotFound} />
		</Routes>
	);
}


export default AppRouterSwitch;
