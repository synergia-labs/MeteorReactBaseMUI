import React from 'react'
import {
    Location,
    NavigateFunction,
    Route,
    Routes,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom'
import Modules from '../../modules'
import NotFound from '../pages/NotFound/NotFound'
import { getUser } from '/imports/libs/getUser'
import { segurancaApi } from '/imports/seguranca/api/SegurancaApi'
import { IRoute } from '/imports/modules/modulesTypings'
import { SignIn } from '../pages/SignIn/Signin'
import { subjectRouter } from '/imports/analytics/AnalyticsSubscriber'
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings'

interface IWrapComponent extends ILayoutProps {
    component: React.ElementType
    navigate: NavigateFunction
    location: Location
}

const WrapComponent = ({ component, ...props }: IWrapComponent) => {
    const RenderedComponent = component
    const params = useParams()

    subjectRouter.next({
        pathname: location.pathname,
        params,
        user: props.user,
    })

    return <RenderedComponent {...props} />
}

const AppRouterSwitch = React.memo((switchProps: ILayoutProps) => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <Routes location={location}>
            {(Modules.getListOfRouterModules() || [])
                .filter((r) => !!r)
                .map((routerData: IRoute | null) => {
                    if (routerData?.isProtected) {
                        const resources = routerData.resources

                        const isLogged = switchProps?.isLoggedIn
                        let possuiPermissao = true
                        if (resources) {
                            possuiPermissao = segurancaApi.podeAcessarRecurso(
                                getUser(),
                                ...resources
                            )
                        }
                        return (
                            <Route
                                key={routerData?.path}
                                exact={true}
                                path={routerData?.path}
                                element={
                                    isLogged && possuiPermissao ? (
                                        <WrapComponent
                                            component={routerData.component as React.ElementType}
                                            navigate={navigate}
                                            location={location}
                                            {...switchProps}
                                        />
                                    ) : (
                                        <WrapComponent
                                            component={SignIn}
                                            navigate={navigate}
                                            location={location}
                                            {...switchProps}
                                        />
                                    )
                                }
                            />
                        )
                    } else {
                        return (
                            <Route
                                key={routerData?.path}
                                exact={true}
                                path={routerData?.path}
                                element={
                                    <WrapComponent
                                        component={routerData.component as React.ElementType}
                                        navigate={navigate}
                                        location={location}
                                        {...switchProps}
                                    />
                                }
                            />
                        )
                    }
                })}
            <Route element={NotFound} />
        </Routes>
    )
})

export default AppRouterSwitch
