import React, { useContext } from 'react';
import { Location, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { NotFound } from '/imports/sysPages/pages/notFound/notFound';
import { getUser } from '/imports/libs/getUser';
import { segurancaApi } from '/imports/security/api/segurancaApi';
import { IAppMenu, IRoute } from '/imports/modules/modulesTypings';
import { SysAppContext } from './appContainer';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import { subjectRouter } from '/imports/analytics/analyticsSubscriber';
import SysRoutes from './routes';
import { ISysTemplate, SysTemplate, SysTemplateOptions } from '/imports/ui/templates/getTemplate';
import { NoPermission } from '/imports/sysPages/pages/noPermission/noPermission';
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

  if (userLoading) return <SysLoading size={'large'} label={'Carregando...'} />;

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
