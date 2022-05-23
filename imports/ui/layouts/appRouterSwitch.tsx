import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Modules from '../../modules';
import NotFound from '../pages/NotFound/NotFound';
import { getUser } from '/imports/libs/getUser';
import { segurancaApi } from '/imports/modules/seguranca/api/SegurancaApi';
import { IRoute } from '/imports/modules/modulesTypings';

interface IPublicRoute extends IRoute {
	generalProps?: {isLoggedIn: boolean};
}

const AppRouterSwitch = (props: any) => {
	let location = useLocation();

	return (
		<Switch location={location}>
			{(Modules.getListOfRouterModules() || [])
				.filter(r => !!r)
				.map((routerData: IRoute | null) => {
					if (routerData?.isProtected) {
						return <ProtectedRoute key={routerData.path}
							exact={!!routerData.exact}
							path={routerData.path}
							resources={routerData.resources}
							generalProps={props}
							component={routerData.component} />;
					} else {
						return <PublicRoute key={routerData?.path}
							exact={!!routerData?.exact}
							path={routerData?.path}
							generalProps={props}
							component={routerData!.component} />;
					}
				})}
			<Route component={NotFound} />
		</Switch>
	);
}

/**
 * PublicRoute
 * @param {any} { component: Component,generalProps, ...rest }
 */
const PublicRoute = ({ component: Component, generalProps, resources, ...rest } :IPublicRoute	) => (
	<Route
		{...rest}
		render={(props: any) => {
			//@ts-ignore
			return <Component {...props} {...generalProps} />;
		}}
	/>
);

/**
 * ProtectedRoute (see React Router v4 sample)
 * will check the Meteor login before routing to the requested page
 * @param {any} { component: Component,generalProps, ...rest }
 */
const ProtectedRoute = ({ component: Component, generalProps, resources, ...rest } :IPublicRoute ) => (
	<Route
		{...rest}
		render={(props: any) => {
			const isLogged = generalProps?.isLoggedIn;
			let possuiPermissao = true;
			if (resources)
				possuiPermissao = segurancaApi.podeAcessarRecurso(getUser(), ...resources)
			if (isLogged && possuiPermissao)
			//@ts-ignore
				return <Component {...props} {...generalProps} />
			return (
				<Redirect
					to={{
						pathname: '/signin',
						state: { from: props.location },
					}}
				/>
			);
		}}
	/>
);

export default AppRouterSwitch;
