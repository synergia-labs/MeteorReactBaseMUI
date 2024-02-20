import React, { useContext } from 'react';
import { Route, Routes, useParams, useLocation, Location } from 'react-router-dom';
import { NotFound } from '../pages/NotFound/NotFound';
import { SignIn } from '../pages/SignIn/Signin';
import { getUser } from '/imports/libs/getUser';
import { segurancaApi } from '/imports/seguranca/api/SegurancaApi';
import { IAppMenu, IRoute } from '/imports/modules/modulesTypings';
import { SysAppContext } from '../AppContainer';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { subjectRouter } from '/imports/analytics/AnalyticsSubscriber';
import SysRoutes from './routes';
import { ISysTemplate, SysTemplate, SysTemplateOptions } from './templates/getTemplate';
import { NoPermission } from '../pages/NoPermission/NoPermission';

const routes = new SysRoutes();

interface IWrapComponentProps {
	component: React.ElementType;
	location?: Location;
	user?: IUserProfile | null;
	templateVariant?: SysTemplateOptions | keyof typeof SysTemplateOptions;
	templateMenuOptions?: (IAppMenu | null)[];
	templateProps?: any;
	defaultTemplate: ISysTemplate;
}

const WrapComponent: React.FC<IWrapComponentProps> = ({
	component: Component,
	location,
	user,
	templateVariant,
	templateMenuOptions,
	templateProps,
	defaultTemplate
}) => {
	const params = useParams();
	subjectRouter.next({ pathname: location?.pathname, params, user });

	return (
		<SysTemplate
			variant={templateVariant ?? defaultTemplate.variant}
			props={templateProps ?? defaultTemplate.props}
			menuOptions={templateMenuOptions ?? defaultTemplate.menuOptions}>
			<Component />
		</SysTemplate>
	);
};

interface IAppRouterSwitchProps {
	defaultTemplate: ISysTemplate;
}


export const AppRouterSwitch: React.FC<IAppRouterSwitchProps> = React.memo(({ defaultTemplate }) => {
	const location = useLocation();
	const { isLoggedIn, user } = useContext(SysAppContext);

	return (
		<Routes location={location}>
			{!routes.checkIfRouteExists(location.pathname) ? (
				<Route path="*" element={<NotFound />} />
			) : (
				routes.getRoutes().map((route: IRoute | null) => {
					if (route?.isProtected) {
						return (
							isLoggedIn? (
								segurancaApi.podeAcessarRecurso(getUser(), ...(route?.resources || []))? (
									<Route
										key={route?.path}
										path={route?.path as string}
										element={
											<WrapComponent
												component={route?.component as React.ElementType}
												location={location}
												templateVariant={route?.templateVariant}
												templateProps={route?.templateProps}
												templateMenuOptions={route?.templateMenuOptions}
												defaultTemplate={defaultTemplate}
											/>
									}
								/>
								):(
								<Route
									key={route?.path}
									path={route?.path as string}
									element={
										<WrapComponent
											component={NoPermission}
											location={location}
											templateVariant={route?.templateVariant}
											templateProps={route?.templateProps}
											templateMenuOptions={route?.templateMenuOptions}
											defaultTemplate={defaultTemplate}
										/>
									}
								/>
								)
							):(
								<Route
								key={route?.path}
								path={route?.path as string}
								element={
									<WrapComponent
										component={SignIn}
										location={location}
										templateVariant={route?.templateVariant}
										templateProps={route?.templateProps}
										templateMenuOptions={route?.templateMenuOptions}
										defaultTemplate={defaultTemplate}
									/>
								}
							/>
							)		
						);
					} else
						return (
							<Route
								key={route?.path}
								path={route?.path as string}
								element={
									<WrapComponent
										component={route?.component as React.ElementType}
										location={location}
										templateVariant={route?.templateVariant}
										templateProps={route?.templateProps}
										templateMenuOptions={route?.templateMenuOptions}
										defaultTemplate={defaultTemplate}
									/>
								}
							/>
						);
				})
			)}
		</Routes>
	);
});
