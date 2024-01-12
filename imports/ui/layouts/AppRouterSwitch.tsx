import React, { useContext } from 'react';
import { Route, Routes, useParams, useLocation, Location } from 'react-router-dom';
import { NotFound } from '../pages/NotFound/NotFound';
import { SignIn } from '../pages/SignIn/Signin';
import { getUser } from '/imports/libs/getUser';
import { segurancaApi } from '/imports/seguranca/api/SegurancaApi';
import { IRoute } from '/imports/modules/modulesTypings';
import { SysAppContext } from '../AppContainer';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { subjectRouter } from '/imports/analytics/AnalyticsSubscriber';
import SysRoutes from './routes';
import { SysTemplateOptions } from './templates/getTemplate';

interface IWrapComponentProps {
  component: React.ElementType;
  location?: Location;
  user?: IUserProfile | null;
  variant?: SysTemplateOptions | keyof typeof SysTemplateOptions;
  props?: any;
  setTempleteOptions?: ({
    variant,
    props,
  } : {
    variant?: SysTemplateOptions | keyof typeof SysTemplateOptions,
    props?: any,
  }) => void;
}

const WrapComponent: React.FC<IWrapComponentProps> = ({ component: Component, location, user, variant, props, setTempleteOptions }) => {
  const params = useParams();

  subjectRouter.next({ pathname: location?.pathname, params, user });
  setTempleteOptions?.({ variant, props });
  return <Component />;
};

interface IAppRouterSwitchProps {
  setTempleteOptions?: ({
    variant,
    props,
  } : {
    variant?: SysTemplateOptions | keyof typeof SysTemplateOptions,
    props?: any,
  }) => void;
}

export const AppRouterSwitch: React.FC<IAppRouterSwitchProps> = React.memo(({ setTempleteOptions }) => {
  const location = useLocation();
  const { isLoggedIn, user } = useContext(SysAppContext);

  return (
    <Routes location={location}>
      {!SysRoutes.checkIfRouteExists(location.pathname) ? (
        <Route path="*" element={<NotFound />} />
      ) : (
        SysRoutes.getRoutes().map((route: IRoute | null) => (
          <Route
            key={route?.path}
            path={route?.path as string}
            element={
              route?.isProtected
                ? (isLoggedIn && segurancaApi.podeAcessarRecurso(getUser(), ...route.resources || []))
                  ? <WrapComponent 
                      component={route.component as React.ElementType} 
                      location={location} 
                      user={user} 
                      variant={route.template}
                      props={route?.templateProps}
                      setTempleteOptions={setTempleteOptions}
                    />
                  : <WrapComponent 
                      component={SignIn} 
                      location={location} 
                      user={user}
                      variant={route.template}
                      props={route?.templateProps}
                      setTempleteOptions={setTempleteOptions}
                    />
                : <WrapComponent 
                    component={route?.component as React.ElementType} 
                    location={location} 
                    user={user} 
                    variant={route?.template}
                    props={route?.templateProps}
                    setTempleteOptions={setTempleteOptions}
                  />
            }
          />
        ))
      )}
    </Routes>
  );
});
