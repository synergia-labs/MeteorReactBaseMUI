import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Modules from '../../modules';
import { isMobile } from '/imports/libs/deviceVerify';
import Tabs from '@mui/material/Tabs';
import { appNavBarStyle } from './AppNavBarStyle';
import AppBar from '@mui/material/AppBar';
import { appLayoutMenuStyle } from '/imports/ui/layouts/AppLayoutFixedMenuStyle';
import Toolbar from '@mui/material/Toolbar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import * as appStyle from '/imports/materialui/styles';
import Container from '@mui/material/Container';
import { IAppMenu } from '/imports/modules/modulesTypings';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { FormControlLabel, Theme } from '@mui/material';
import Switch from '@mui/material/Switch';
import { ILayoutProps } from '/imports/typings/BoilerplateDefaultTypings';
import { DayNightToggle } from '/imports/ui/layouts/components/daynightToggle';
import Box from '@mui/material/Box';

const HomeIconButton = ({ navigate }: any) => {
    return (
        <div onClick={() => navigate('/')} style={appLayoutMenuStyle.containerHomeIconButton}>
            <img style={appLayoutMenuStyle.homeIconButton} src="/images/wireframe/logo.png" />
        </div>
    );
};

interface IAppNavBar extends ILayoutProps {}

const AppNavBar = (props: IAppNavBar) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, theme } = props;

    const pathIndex = (Modules.getAppMenuItemList() || [])
        .filter(
            (item: IAppMenu | null) =>
                !item?.isProtected || (user && user.roles.indexOf('Publico') === -1)
        )
        .findIndex(
            (menuData) =>
                (menuData?.path === '/' && location.pathname === '/') ||
                (menuData?.path !== '/' &&
                    location &&
                    location.pathname.indexOf(menuData?.path) === 0)
        );
    if (isMobile) {
        return (
            <div
                style={{
                    minHeight: 55,
                    width: '100%',
                    backgroundColor: theme.palette.primary.main,
                }}
            >
                <FormControlLabel
                    control={
                        <Switch
                            color={'secondary'}
                            value={props.themeOptions.isDarkThemeMode}
                            onChange={(evt) =>
                                props.themeOptions.setDarkThemeMode(evt.target.checked)
                            }
                        />
                    }
                    label="DarkMode"
                />
                <div style={{ width: '100%' }}>
                    {(Modules.getAppMenuItemList() || [])
                        .filter(
                            (item: IAppMenu | null) =>
                                !item?.isProtected || (user && user.roles.indexOf('Publico') === -1)
                        )
                        .map((menuData, menuIndex) => (
                            <Button key={menuData?.path} onClick={() => navigate(menuData?.path)}>
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
                        ))}
                </div>
                <IconButton
                    onClick={viewProfileMobile}
                    style={{ position: 'absolute', right: 10, bottom: 13 }}
                >
                    <AccountCircle style={appNavBarStyle.accountCircle} />
                </IconButton>
            </div>
        );
    }

    return (
        <AppBar position="static" enableColorOnDark>
            <Container style={appLayoutMenuStyle.containerFixedMenu}>
                <HomeIconButton navigate={navigate} />
                <Toolbar style={appLayoutMenuStyle.toolbarFixedMenu}>
                    <Box
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        {(Modules.getAppMenuItemList() || [])
                            .filter(
                                (item: IAppMenu | null) =>
                                    !item?.isProtected ||
                                    (user && user.roles.indexOf('Publico') === -1)
                            )
                            .map((menuData, ind) => (
                                <Button
                                    variant={pathIndex !== ind ? 'outlined' : 'contained'}
                                    style={{
                                        ...appNavBarStyle.buttonMenuItem,
                                        color: pathIndex !== ind ? appStyle.secondaryColor : '#FFF',
                                    }}
                                    key={menuData?.path}
                                    onClick={() => navigate(menuData?.path)}
                                >
                                    {menuData?.name}
                                </Button>
                            ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default AppNavBar;
