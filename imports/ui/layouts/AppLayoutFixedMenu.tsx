import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter as Router,withRouter, NavLink } from 'react-router-dom'
import AppNavBar from "./AppNavBar";
import AppRouterSwitch from "./AppRouterSwitch";
import {isMobile} from "/imports/libs/deviceVerify";

import {appLayoutMenuStyle} from "./AppLayoutFixedMenuStyle";

const HomeIconButton = withRouter((props)=>{
    return <NavLink to={'/'}><div style={appLayoutMenuStyle.containerHomeIconButton}>
        <img style={appLayoutMenuStyle.homeIconButton} src='/images/wireframe/logo.png' />
    </div></NavLink>
})

const FixedMenuLayout = (props) => (
    <Router>
        <div style={{
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',
            overflowY:'auto',
            width:'100%',height:'100%',overflow:"hidden",margin:0}}>
        {!isMobile?(
            <AppBar position="static">
                <div style={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center'}}>
                    <HomeIconButton />
                    <Toolbar style={{width:'100%'}}>
                        <AppNavBar {...props} />
                    </Toolbar>
                </div>
            </AppBar>
        ):null}
        <div style={{width:'100%',height:'calc(100% - 55px)',overflowY:'auto'}}>
            <AppRouterSwitch {...props} />
        </div>
        {isMobile?(
            <div style={{minHeight:55,width:'100%',backgroundColor:props.theme.palette.primary.main}}>
           <AppNavBar {...props} />
            </div>
        ):null}
        </div>
    </Router>
)

export default FixedMenuLayout
