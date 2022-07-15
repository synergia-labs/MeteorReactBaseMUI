import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import AppNavBar from './appNavBar'
import AppRouterSwitch from './appRouterSwitch'

import { appLayoutMenuStyle } from './AppLayoutFixedMenuStyle'
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings'

const FixedMenuLayout = (props: ILayoutProps) => {
    return (
        <Router>
            <div
                style={{
                    ...appLayoutMenuStyle.containerAppRouter,
                    backgroundColor: props.theme.palette.background.default,
                }}
            >
                <AppNavBar {...props} />
                <div style={appLayoutMenuStyle.routerSwitch}>
                    <AppRouterSwitch {...props} />
                </div>
            </div>
        </Router>
    )
}

export default FixedMenuLayout
