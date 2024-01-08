import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Modules from '../../modules';
import { isMobile } from '/imports/libs/deviceVerify';
import { appNavBarStyle } from './AppNavBarStyle';
import AppBar from '@mui/material/AppBar';
import { fixedMenuLayoutStyle } from './FixedMenuLayoutStyle';
import Toolbar from '@mui/material/Toolbar';
import * as appStyle from '/imports/materialui/styles';
import Container from '@mui/material/Container';
import { IAppMenu } from '/imports/modules/modulesTypings';
import { FormControlLabel } from '@mui/material';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';

const HomeIconButton = ({ navigate }: any) => {
	return (
		<Box onClick={() => navigate('/')} sx={fixedMenuLayoutStyle.containerHomeIconButton}>
			<img style={fixedMenuLayoutStyle.homeIconButton} src="/images/wireframe/logo.png" />
		</Box>
	);
};


export const AppNavBar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { user, theme, themeOptions } = React.useContext(AppContext);

	const pathIndex = (Modules.getAppMenuItemList() || [])
		.filter((item: IAppMenu | null) => !item?.isProtected || (user && user.roles?.indexOf('Publico') === -1))
		.findIndex(
			(menuData) =>
				(menuData?.path === '/' && location.pathname === '/') ||
				(menuData?.path !== '/' && location && location.pathname.indexOf(menuData?.path as string) === 0)
		);
	if (isMobile) {
		return (
			<Box
				sx={{
					minHeight: 55,
					width: '100%',
					backgroundColor: theme.palette.primary.main
				}}>
				<FormControlLabel
					control={
						<Switch
							color={'secondary'}
							value={themeOptions?.isDarkThemeMode}
							onChange={(evt) => themeOptions?.setDarkThemeMode(evt.target.checked)}
						/>
					}
					label="DarkMode"
				/>
				<Box sx={{ width: '100%' }}>
					{(Modules.getAppMenuItemList() || [])
						.filter((item: IAppMenu | null) => !item?.isProtected || (user && user.roles?.indexOf('Publico') === -1))
						.map((menuData, menuIndex) => (
							<Button key={menuData?.path} onClick={() => navigate(menuData?.path as string)}>
								<Box
									sx={{
										display: 'flex',
										flexDirection: isMobile ? 'column' : 'row',
										alignItems: 'center',
										justifyContent: 'center',
										paddingTop: 10
									}}>
									{menuData?.icon ? menuData?.icon : null}
								</Box>
							</Button>
						))}
				</Box>
				<IconButton onClick={() => {}} style={{ position: 'absolute', right: 10, bottom: 13 }}>
					<AccountCircle style={appNavBarStyle.accountCircle} />
				</IconButton>
			</Box>
		);
	}

	return (
		<AppBar position="static" enableColorOnDark>
			<Container sx={fixedMenuLayoutStyle.containerFixedMenu}>
				<HomeIconButton navigate={navigate} />
				<Toolbar sx={fixedMenuLayoutStyle.toolbarFixedMenu}>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'flex-end'
						}}>
						{(Modules.getAppMenuItemList() || [])
							.filter((item: IAppMenu | null) => !item?.isProtected || (user && user.roles?.indexOf('Publico') === -1))
							.map((menuData, ind) => (
								<Button
									variant={pathIndex !== ind ? 'outlined' : 'contained'}
									sx={{
										...appNavBarStyle.buttonMenuItem,
										color: pathIndex !== ind ? appStyle.secondaryColor : '#FFF'
									}}
									key={menuData?.path}
									onClick={() => navigate(menuData?.path as string)}>
									{menuData?.name}
								</Button>
							))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
