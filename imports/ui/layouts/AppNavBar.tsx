import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modules from '../../modules';
import {isMobile} from "/imports/libs/deviceVerify";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {appNavBarStyle} from "./AppNavBarStyle";


const AppNavBar = ({ user,history,showDrawer,showWindow }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPage = url=> () => {
        handleClose();
        history.push(url);
    }

    const viewProfile = () => {
        handleClose();
        showDrawer({title:'Usuário',url:`/userprofile/view/${user._id}`})
    }

    const viewProfileMobile = () => {
        handleClose();
        showWindow({title:'Usuário',url:`/userprofile/view/${user._id}`})
    }

   const pathIndex = (Modules.getAppMenuItemList() || []).findIndex(menuData=>menuData.path==='/'&&history.location.pathname==='/'
    ||menuData.path!=='/'&&history.location.pathname.indexOf(menuData.path)===0);
    if(isMobile) {
        return (
            <div style={{width:'100%'}}>
                <Tabs
                    value={pathIndex}
                    indicatorColor="secondary"
                    aria-label="icon label tabs example"
                    centered={true}
                >
                    {
                        (Modules.getAppMenuItemList() || []).map((menuData,menuIndex)=>{
                            return (<Button key={menuData.path} onClick={()=>history.push(menuData.path)}>
                                    <div style={{display:'flex',flexDirection:isMobile?'column':'row',alignItems:'center',justifyContent:'center'}}>
                                        {menuData.icon?menuData.icon:null}
                                        {isMobile&&pathIndex!==menuIndex?'':menuData.name}
                                    </div>

                                </Button>
                            )

                        })
                    }
                </Tabs>
                <IconButton
                    onClick={viewProfileMobile}
                    style={{position:'absolute',right:10,bottom:13}}
                >
                    <AccountCircle color={'secondary'} />
                </IconButton>
            </div>

        )
    }
    return (
        <div style={appNavBarStyle.containerNavBar}>
            <div style={appNavBarStyle.subContainerNavBar}>
              <Tabs
                  value={pathIndex}
                  indicatorColor="secondary"
                  aria-label="icon label tabs example"
              >
              {
                  (Modules.getAppMenuItemList() || []).map(menuData=>{
                      return (<Button style={appNavBarStyle.buttonMenuItem} key={menuData.path} onClick={()=>history.push(menuData.path)}>
                          {menuData.icon?menuData.icon:null}
                          {menuData.name}
                          </Button>
                      )

                  })
              }
            </Tabs>
          </div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle style={appNavBarStyle.accountCircle}/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                {!user||!user._id? (
                    [<MenuItem key={'signin'} as={NavLink} onClick={openPage("/signin")}>Entrar</MenuItem>,
                    <MenuItem key={'signup'} as={NavLink} onClick={openPage("/signup")}>Cadastrar-se</MenuItem>]
                ) : (
                    [<MenuItem key={'userprofile'} as={NavLink} onClick={viewProfile}>Meus dados</MenuItem>,
                    <MenuItem key={'signout'} as={NavLink} onClick={openPage("/signout")}>Sair</MenuItem>]
                )}
            </Menu>
        </div>
    )
}


export default withRouter(AppNavBar);
