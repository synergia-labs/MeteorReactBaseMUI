import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Modules from '../../modules'
import { isMobile } from '/imports/libs/deviceVerify'
import Tabs from '@mui/material/Tabs'
import { appNavBarStyle } from './AppNavBarStyle'
import AppBar from '@mui/material/AppBar'
import { appLayoutMenuStyle } from '/imports/ui/layouts/AppLayoutFixedMenuStyle'
import Toolbar from '@mui/material/Toolbar'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import * as appStyle from '/imports/materialui/styles'
import Container from '@mui/material/Container'
import { IAppMenu } from '/imports/modules/modulesTypings'
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch'
import { FormControlLabel, Theme } from '@mui/material'
import Switch from '@mui/material/Switch'

const HomeIconButton = ({ navigate }: any) => {
    return (
        <div onClick={() => navigate('/')} style={appLayoutMenuStyle.containerHomeIconButton}>
            <img
                style={appLayoutMenuStyle.homeIconButton}
                src="data:image/png;base64,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"
            />
        </div>
    )
}

interface IAppNavBar {
    user: IUserProfile
    showDrawer: (options?: Object) => void
    showWindow: (options?: Object) => void
    theme: Theme
    themeOptions: {
        setFontScale: (scale: number) => void
        fontScale: number
        setDarkThemeMode: (isDarkMode: boolean) => void
        isDarkThemeMode: boolean
    }
}

const AppNavBar = (props: IAppNavBar) => {
    const navigate = useNavigate()
    const location = useLocation()

    const { user, showDrawer, showWindow, theme } = props

    const [anchorEl, setAnchorEl] = React.useState<Object | null>(null)
    const open = Boolean(anchorEl)

    const handleMenu = (event: React.SyntheticEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const openPage = (url: string) => () => {
        handleClose()
        navigate(url)
    }

    const viewProfile = () => {
        handleClose()
        showDrawer({ title: 'Usuário', url: `/userprofile/view/${user._id}` })
    }

    const viewProfileMobile = () => {
        handleClose()
        showWindow({ title: 'Usuário', url: `/userprofile/view/${user._id}` })
    }

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
        )
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
        )
    }

    return (
        <AppBar position="static" enableColorOnDark>
            <Container style={appLayoutMenuStyle.containerFixedMenu}>
                <HomeIconButton navigate={navigate} />
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
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        border: '1px solid #CCC',
                    }}
                >
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        style={{ width: 40, height: 40 }}
                        onClick={() =>
                            props.themeOptions.setFontScale(props.themeOptions.fontScale * 0.85)
                        }
                    >
                        {'-'}
                    </Button>
                    {'FontSize'}
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        style={{ width: 40, height: 40 }}
                        onClick={() =>
                            props.themeOptions.setFontScale(props.themeOptions.fontScale * 1.15)
                        }
                    >
                        {'+'}
                    </Button>
                </div>

                <Toolbar style={appLayoutMenuStyle.toolbarFixedMenu}>
                    <div style={appNavBarStyle.containerNavBar}>
                        <div style={appNavBarStyle.subContainerNavBar}>
                            <div style={{ width: '100%' }}>
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
                                                color:
                                                    pathIndex !== ind
                                                        ? appStyle.secondaryColor
                                                        : '#FFF',
                                            }}
                                            key={menuData?.path}
                                            onClick={() => navigate(menuData?.path)}
                                        >
                                            {menuData?.name}
                                        </Button>
                                    ))}
                            </div>
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
                            <AccountCircle
                                id="Perfil"
                                name="Perfil"
                                style={appNavBarStyle.accountCircle}
                            />
                            <ArrowDropDownIcon style={appNavBarStyle.dropDown} />
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
                            {!user || !user._id
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
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default AppNavBar
