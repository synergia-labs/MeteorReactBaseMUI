import React from 'react';
import {NavLink, withRouter, RouteComponentProps} from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Modules from '../../modules';
import {isMobile} from '/imports/libs/deviceVerify';
import Tabs from '@mui/material/Tabs';
import {appNavBarStyle} from './AppNavBarStyle';
import AppBar from '@mui/material/AppBar';
import {appLayoutMenuStyle} from '/imports/ui/layouts/AppLayoutFixedMenuStyle';
import Toolbar from '@mui/material/Toolbar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import * as appStyle from '/imports/materialui/styles';
import Container from '@mui/material/Container';
import { Theme } from '@mui/material';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { IAppMenu } from '/imports/modules/modulesTypings';

const HomeIconButton = withRouter(() => {
  return <NavLink to={'/'}>
    <div style={appLayoutMenuStyle.containerHomeIconButton}>
      <img style={appLayoutMenuStyle.homeIconButton}
           src="/images/wireframe/logo.png"/>
    </div>
  </NavLink>;
});

interface IAppNavBar{
  user: IUserProfile;
  history: RouteComponentProps['history'];
  showDrawer: (options?: Object) => void;
  showWindow: (options?: Object) => void;
  theme: Theme;
  location: RouteComponentProps['location'];
}

const AppNavBar = (props: IAppNavBar) => {

  const { user, history, showDrawer, showWindow, theme, location} = props;

  if (location && location.pathname.indexOf('/full') !== -1 || location &&
      location.pathname.indexOf('/print') !== -1) {
    return null;
  }

  const [anchorEl, setAnchorEl] = React.useState<Object | null>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPage = (url: string) => () => {
    handleClose();
    history.push(url);
  };

  const viewProfile = () => {
    handleClose();
    showDrawer({title: 'Usuário', url: `/userprofile/view/${user._id}`});
  };

  const viewProfileMobile = () => {
    handleClose();
    showWindow({title: 'Usuário', url: `/userprofile/view/${user._id}`});
  };

  const pathIndex = (Modules.getAppMenuItemList() || []).filter(
      (item: (IAppMenu | null)) => !item?.isProtected || user && user.roles.indexOf('Publico') ===
          -1).
      findIndex(
          menuData => menuData?.path === '/' && history.location.pathname === '/'
              || menuData?.path !== '/' && history.location &&
              history.location.pathname.indexOf(menuData?.path) === 0);
  if (isMobile) {
    return (
        <div style={{
          minHeight: 55,
          width: '100%',
          backgroundColor: theme.palette.primary.main,
        }}>
          <Tabs
              value={pathIndex}
              aria-label="icon label tabs example"
              centered
          >
            {
              (Modules.getAppMenuItemList() || []).filter(
                (item: (IAppMenu | null)) => !item?.isProtected || user &&
                      user.roles.indexOf('Publico') === -1).
                  map((menuData, menuIndex) => (
                      <Button key={menuData?.path}
                              onClick={() => history.push(menuData?.path)}>
                        <div
                            style={{
                              display: 'flex',
                              flexDirection: isMobile ? 'column' : 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              paddingTop: 10,
                            }}
                        >
                          {menuData?.icon ? menuData?.icon : null}
                        </div>

                      </Button>
                  ))
            }
          </Tabs>
          <IconButton
              onClick={viewProfileMobile}
              style={{position: 'absolute', right: 10, bottom: 13}}
          >
            <AccountCircle style={appNavBarStyle.accountCircle}/>
          </IconButton>
        </div>

    );
  }

  return (
      <AppBar position="static">
        <Container style={appLayoutMenuStyle.containerFixedMenu}>
          <HomeIconButton/>
          <Toolbar style={appLayoutMenuStyle.toolbarFixedMenu}>
            <div style={appNavBarStyle.containerNavBar}>
              <div style={appNavBarStyle.subContainerNavBar}>
                <Tabs
                    aria-label="icon label tabs example"
                >
                  {
                    (Modules.getAppMenuItemList() || []).filter(
                      (item: (IAppMenu | null)) => !item?.isProtected || user &&
                            user.roles.indexOf('Publico') === -1).
                        map((menuData, ind) => (
                            <Button
                                style={{
                                  ...appNavBarStyle.buttonMenuItem,
                                  color: pathIndex === ind
                                      ? appStyle.secondaryColor
                                      : undefined,
                                }} key={menuData?.path}
                                onClick={() => history.push(menuData?.path)}
                            >
                              {menuData?.name}
                            </Button>
                        ))
                  }
                </Tabs>
              </div>
              <Button
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  id="Perfil"
                  label="Perfil"
                  style={appNavBarStyle.containerAccountCircle}
              >
                <AccountCircle id="Perfil" name="Perfil"
                               style={appNavBarStyle.accountCircle}/>
                <ArrowDropDownIcon style={appNavBarStyle.dropDown}/>
              </Button>
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
                {!user || !user._id ? (
                    [
                      <MenuItem key={'signin'}
                                onClick={openPage('/signin')}>Entrar</MenuItem>]
                ) : (
                    [
                      <MenuItem
                          key={'userprofile'}
                          onClick={viewProfile}
                      >{user.username || 'Editar'}</MenuItem>,
                      <MenuItem key={'signout'}
                                onClick={openPage('/signout')}><ExitToAppIcon
                          fontSize="small"
                      /> Sair</MenuItem>]
                )}
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

  );
};

export default withRouter(AppNavBar);
