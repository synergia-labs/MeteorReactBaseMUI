import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter as Router,withRouter, NavLink } from 'react-router-dom'
import AppNavBar from "./AppNavBar";
import AppRouterSwitch from "./AppRouterSwitch";

const HomeIconButton = withRouter((props)=>{
    return <NavLink to={'/'}><div style={{
        width:60,height:40,display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <img style={{maxHeight:45}} src='/images/wireframe/logo.png' />
    </div></NavLink>
})

const FixedMenuLayout = (props) => (
    <Router>
        <AppBar position="static">
            <div style={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center'}}>
             <HomeIconButton />
            <Toolbar style={{width:'100%'}}>
                    <AppNavBar {...props} />
            </Toolbar>
            </div>
        </AppBar>
        <div style={{
            display:'flex',flexDirection:'column',alignItems:'center',
            overflowY:'auto',
            width:'100%',height:'calc(100% - 47px)',margin:0,padding:4 }}>
            <AppRouterSwitch {...props} />
        </div>
    </Router>
)

export default FixedMenuLayout