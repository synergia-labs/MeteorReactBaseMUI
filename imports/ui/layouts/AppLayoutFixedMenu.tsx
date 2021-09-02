import React from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import AppNavBar from "./AppNavBar";
import AppRouterSwitch from "./AppRouterSwitch";
import {isMobile} from "/imports/libs/deviceVerify";

import {appLayoutMenuStyle} from "./AppLayoutFixedMenuStyle";


const FixedMenuLayout = (props) => (
    <Router>
        <div style={appLayoutMenuStyle.containerAppRouter}>
        {!isMobile?(
                <AppNavBar {...props} />
        ):null}
        <div style={appLayoutMenuStyle.routerSwitch}>
            <AppRouterSwitch {...props} />
        </div>
        {isMobile?(
           <AppNavBar {...props} />
        ):null}
        </div>
    </Router>
)

export default FixedMenuLayout
