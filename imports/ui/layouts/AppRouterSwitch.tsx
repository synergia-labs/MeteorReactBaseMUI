import React from 'react';
import {Redirect, Route, Switch,useLocation} from 'react-router-dom';

import Modules from '../../modules';
import NotFound from '../pages/NotFound/NotFound';

  function AppRouterSwitch(props) {
  let location = useLocation();

    return (
            <Switch location={location}>
              {
                (Modules.getListOfRouterModules() || []).filter(r => !!r).
                    map(routerData => {
                      if (routerData.isProtected) {
                        return <ProtectedRoute key={routerData.path}
                                               exact={!!routerData.exact}
                                               path={routerData.path}
                                               generalProps={props}
                                               component={routerData.component}/>;
                      } else {
                        return <PublicRoute key={routerData.path}
                                            exact={!!routerData.exact}
                                            path={routerData.path}
                                            generalProps={props}
                                            component={routerData.component}/>;
                      }

                    })
              }
              <Route component={NotFound}/>
            </Switch>
    );

}

/**
 * PublicRoute
 * @param {any} { component: Component,generalProps, ...rest }
 */
const PublicRoute = ({component: Component, generalProps, ...rest}) => (
    <Route
        {...rest}
        render={(props) => {
          return <Component {...props} {...generalProps} />;
        }}
    />
);

/**
 * ProtectedRoute (see React Router v4 sample)
 * will check the Meteor login before routing to the requested page
 * @param {any} { component: Component,generalProps, ...rest }
 */
const ProtectedRoute = ({component: Component, generalProps, ...rest}) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = generalProps.isLoggedIn;
          return isLogged ? (
              <Component {...props} {...generalProps} />
          ) : (
              <Redirect
                  to={{
                    pathname: '/signin',
                    state: {from: props.location},
                  }}
              />
          );
        }}
    />
);

export default AppRouterSwitch;
