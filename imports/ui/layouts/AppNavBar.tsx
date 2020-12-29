import React from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modules from '../../modules';
import {isMobile} from "/imports/libs/deviceVerify";


const AppNavBar = ({ user,history }) => {
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

    return (
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',alignItems:'center'}}>
            <div style={{width:'100%'}}>
            {
                (Modules.getAppMenuItemList() || []).map(menuData=>{
                    return (<Button key={menuData.path} onClick={()=>history.push(menuData.path)}>
                        {menuData.icon?menuData.icon:null}
                        {isMobile?'':menuData.name}
                        </Button>
                    )

                })
            }
            </div>
            <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <AccountCircle />
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
                    [<MenuItem key={'userprofile'} as={NavLink} onClick={openPage(`/userprofile/view/${user._id}`)}>Meus dados</MenuItem>,
                    <MenuItem key={'signout'} as={NavLink} onClick={openPage("/signout")}>Sair</MenuItem>]
                )}
            </Menu>
            </div>

        </div>
    )
}


export default withRouter(AppNavBar);

