import { AccountCircle } from '@mui/icons-material';
import { Box, Button, Container, Menu } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DayNightToggle } from './DayNightToggle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { appTopMenuStyle } from './AppTopMenuStyle';
import { AppContext } from '../../AppGeneralComponents';

export const AppTopMenu = () => {
	const { user, showDrawer, showWindow, theme, themeOptions } = React.useContext(AppContext);

	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState<Object | null>(null);
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
		<Box sx={{ width: '100%', backgroundColor: '#d5d5d5' }}>
			<Container
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: 40,
					maxHeight: 40
				}}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<DayNightToggle
						isDarkMode={themeOptions?.isDarkThemeMode as boolean}
						setDarkMode={(evt) => {
							themeOptions?.setDarkThemeMode(evt.target.checked);
						}}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							border: '1px solid #CCC',
							color: theme.palette.primary.main
						}}>
						<Button
							variant={'contained'}
							color={'secondary'}
							sx={{
								minWidth: 15,
								minHeight: 15,
								width: 15,
								height: 15,
								maxWidth: 15,
								maxHeight: 15
							}}
							onClick={() => themeOptions?.setFontScale(themeOptions?.fontScale * 0.85)}>
							{'-'}
						</Button>
						{'F'}
						<Button
							variant={'contained'}
							color={'secondary'}
							sx={{
								minWidth: 15,
								minHeight: 15,
								width: 15,
								height: 15,
								maxWidth: 15,
								maxHeight: 15
							}}
							onClick={() => themeOptions?.setFontScale(themeOptions?.fontScale * 1.15)}>
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
					sx={appTopMenuStyle.containerAccountCircle}>
					<>
						<AccountCircle id="Perfil" name="Perfil" style={appTopMenuStyle.accountCircle} />
						<ArrowDropDownIcon
							style={{
								color: theme.palette.primary.main,
								width: 17
							}}
						/>
					</>
				</Button>
				<Menu
					id="menu-appbar"
					anchorEl={anchorEl as Element}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
					open={open}
					onClose={handleClose}>
					{!user || !user._id
						? [
								<MenuItem key={'signin'} onClick={openPage('/signin')}>
									Entrar
								</MenuItem>
						  ]
						: [
								<MenuItem key={'userprofile'} onClick={viewProfile}>
									{user.username || 'Editar'}
								</MenuItem>,
								<MenuItem key={'signout'} onClick={openPage('/signout')}>
									<ExitToAppIcon fontSize="small" /> Sair
								</MenuItem>
						  ]}
				</Menu>
			</Container>
		</Box>
	);
};
