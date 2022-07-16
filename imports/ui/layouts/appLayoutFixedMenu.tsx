import React from 'react';

import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import AppNavBar from './appNavBar';
import AppRouterSwitch from './appRouterSwitch';

import { appLayoutMenuStyle } from './AppLayoutFixedMenuStyle';
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DayNightToggle } from '/imports/ui/layouts/components/daynightToggle';
import Button from '@mui/material/Button';
import { appNavBarStyle } from '/imports/ui/layouts/AppNavBarStyle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const AppTopMenu = (props: ILayoutProps) => {
    const { user, showDrawer, showWindow, theme } = props;

    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState<Object | null>(null);
    const open = Boolean(anchorEl);

    const openPage = (url: string) => () => {
        handleClose();
        navigate(url);
    };

    const viewProfile = () => {
        handleClose();
        showDrawer && showDrawer({ title: 'Usuário', url: `/userprofile/view/${user._id}` });
    };

    const viewProfileMobile = () => {
        handleClose();
        showWindow && showWindow({ title: 'Usuário', url: `/userprofile/view/${user._id}` });
    };

    const handleMenu = (event: React.SyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box style={{ width: '100%', backgroundColor: '#d5d5d5' }}>
            <Container
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 40,
                    maxHeight: 40,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <DayNightToggle
                        isDarkMode={props.themeOptions.isDarkThemeMode}
                        setDarkMode={(evt) => {
                            console.log('evt', evt.target);
                            props.themeOptions.setDarkThemeMode(evt.target.checked);
                        }}
                    />
                    <Box
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            border: '1px solid #CCC',
                            color: props.theme.palette.primary.main,
                        }}
                    >
                        <Button
                            variant={'contained'}
                            color={'secondary'}
                            style={{
                                minWidth: 15,
                                minHeight: 15,
                                width: 15,
                                height: 15,
                                maxWidth: 15,
                                maxHeight: 15,
                            }}
                            onClick={() =>
                                props.themeOptions.setFontScale(props.themeOptions.fontScale * 0.85)
                            }
                        >
                            {'-'}
                        </Button>
                        {'F'}
                        <Button
                            variant={'contained'}
                            color={'secondary'}
                            style={{
                                minWidth: 15,
                                minHeight: 15,
                                width: 15,
                                height: 15,
                                maxWidth: 15,
                                maxHeight: 15,
                            }}
                            onClick={() =>
                                props.themeOptions.setFontScale(props.themeOptions.fontScale * 1.15)
                            }
                        >
                            {'+'}
                        </Button>
                    </Box>
                </Box>
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
                    <AccountCircle id="Perfil" name="Perfil" style={appNavBarStyle.accountCircle} />
                    <ArrowDropDownIcon
                        style={{
                            color: props.theme.palette.primary.main,
                            width: 17,
                        }}
                    />
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
                    {!props.user || !props.user._id
                        ? [
                              <MenuItem key={'signin'} onClick={openPage('/signin')}>
                                  Entrar
                              </MenuItem>,
                          ]
                        : [
                              <MenuItem key={'userprofile'} onClick={viewProfile}>
                                  {user.username || 'Editar'}
                              </MenuItem>,
                              <MenuItem key={'signout'} onClick={openPage('/signout')}>
                                  <ExitToAppIcon fontSize="small" /> Sair
                              </MenuItem>,
                          ]}
                </Menu>
            </Container>
        </Box>
    );
};

const FixedMenuLayout = (props: ILayoutProps) => {
    return (
        <Router>
            <div
                style={{
                    ...appLayoutMenuStyle.containerAppRouter,
                    backgroundColor: props.theme.palette.background.default,
                }}
            >
                <AppTopMenu {...props} />

                {!props.isMobile && <AppNavBar {...props} />}
                <div style={appLayoutMenuStyle.routerSwitch}>
                    <AppRouterSwitch {...props} />
                </div>
                {props.isMobile && <AppNavBar {...props} />}
            </div>
        </Router>
    );
};

export default FixedMenuLayout;
