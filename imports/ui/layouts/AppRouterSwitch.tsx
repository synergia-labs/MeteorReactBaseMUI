import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

import Modules from '../../modules';
import NotFound from '../pages/NotFound/NotFound'
import {getUser} from "/imports/libs/getUser";

class AppRouterSwitch extends React.Component {

    render() {
        return (<Switch>
                            {
                                (Modules.getListOfRouterModules() || []).map(routerData=>{
                                    if(routerData.isProtected) {
                                        return <ProtectedRoute key={routerData.path} exact={!!routerData.exact} path={routerData.path} generalProps={this.props} component={routerData.component} />
                                    } else {
                                        return <PublicRoute key={routerData.path}  exact={!!routerData.exact} path={routerData.path} generalProps={this.props} component={routerData.component} />
                                    }

                                })
                            }
                            <Route component={NotFound} />
                        </Switch>);
    }
}


/**
 * PublicRoute
 * @param {any} { component: Component,generalProps, ...rest }
 */
const PublicRoute = ({ component: Component,generalProps, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            return <Component {...props} {...generalProps} />
        }}
    />
)

/**
 * ProtectedRoute (see React Router v4 sample)
 * will check the Meteor login before routing to the requested page
 * @param {any} { component: Component,generalProps, ...rest }
 */
const ProtectedRoute = ({ component: Component,generalProps, ...rest }) => (
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
                        state: { from: props.location },
                    }}
                />
            )
        }}
    />
)




export default AppRouterSwitch;
