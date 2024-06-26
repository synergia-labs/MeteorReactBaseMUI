import React, { useContext } from 'react';
import { Location, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { NotFound } from '../sysPages/pages/NotFound/NotFound';
import { getUser } from '/imports/libs/getUser';
import { segurancaApi } from '/imports/security/api/SegurancaApi';
import { IAppMenu, IRoute } from '/imports/modules/modulesTypings';
import { SysAppContext } from './AppContainer';
import { IUserProfile } from '/imports/modules/userprofile/api/UserProfileSch';
import { subjectRouter } from '/imports/analytics/AnalyticsSubscriber';
import SysRoutes from './routes';
import { ISysTemplate, SysTemplate, SysTemplateOptions } from '/imports/ui/templates/getTemplate';
import { NoPermission } from '../sysPages/pages/NoPermission/NoPermission';
import SignInPage from '../sysPages/pages/signIn/signIn';
import { SysLoading } from '../ui/components/sysLoading/sysLoading';

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
	const { isLoggedIn, userLoading } = useContext(SysAppContext);

	return (
		<Routes location={location}>
			{!routes.checkIfRouteExists(location.pathname) ? (
				<Route path="*" element={ <NotFound/> } />
			) : (
				routes.getRoutes().map((route: IRoute | null) => {
					if (route?.isProtected) {
						return isLoggedIn ? (
							segurancaApi.podeAcessarRecurso(getUser(), ...(route?.resources || [])) ? (
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
							) : (
								<Route
									key={route?.path}
									path={route?.path as string}
									element={
										<WrapComponent
											component={NoPermission}
											location={location}
											templateVariant={'None'}
											templateProps={undefined}
											templateMenuOptions={undefined}
											defaultTemplate={defaultTemplate}
										/>
									}
								/>
							)
						) : (
							<Route
								key={route?.path}
								path={route?.path as string}
								element={
									<WrapComponent
										component={SignInPage}
										location={location}
										templateVariant={'None'}
										templateProps={undefined}
										templateMenuOptions={undefined}
										defaultTemplate={defaultTemplate}
									/>
								}
							/>
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
