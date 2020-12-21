import React from 'react'
import PropTypes from 'prop-types'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { withRouter, NavLink } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';


import Modules from '../../modules';
import {userprofileApi} from "../../userprofile/api/UserProfileApi";
import {isMobile} from "/imports/libs/deviceVerify";


const AppNavBar = ({ currentUser,history }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
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
                {!currentUser||!currentUser._id? (
                    [<MenuItem key={'signin'} as={NavLink} onClick={()=>history.push("/signin")}>Entrar</MenuItem>,
                    <MenuItem key={'signup'} as={NavLink} onClick={()=>history.push("/signup")}>Cadastrar-se</MenuItem>]
                ) : (
                    [<MenuItem key={'userprofile'} as={NavLink} onClick={()=>history.push(`/userprofile/view/${currentUser._id}`)}>Meus dados</MenuItem>,
                    <MenuItem key={'signout'} as={NavLink} onClick={()=>history.push("/signout")}>Sair</MenuItem>]
                )}
            </Menu>
            </div>

        </div>
    )
}

AppNavBar.propTypes = { currentUser: PropTypes.object }
AppNavBar.defaultProps = { currentUser: null }

// withRouter HOC.
// see explanation: https://reacttraining.com/react-router/web/api/withRouter

const AppNavBarContainer = withTracker((props) => {

    const subHandle = userprofileApi.subscribe('getLoggedUserProfile')
    const MeteorUser = Meteor.user();
    const currentUser = subHandle.ready()?(userprofileApi.findOne({email:MeteorUser?MeteorUser.profile.email:'NoUser'})):(MeteorUser||null)

    return(
        {
            currentUser,
        }
        )
})(AppNavBar)

export default withRouter(AppNavBarContainer)

