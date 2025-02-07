import React, { ReactNode, useContext, useRef } from 'react';
import SysAppBarStyles from './sysAppBarStyles';
import { SysAvatar } from '../../../../ui/components/sysAvatar/sysAvatar';
import { IAppMenu } from '../../../../modules/modulesTypings';
import SysMenu, { SysMenuRef } from '../../../../ui/components/sysMenu/sysMenu';
import { SysNavLink } from '../../../../ui/components/sysNavLink/sysNavLink';
import SysRoutes from '../../../../app/routes';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Meteor } from 'meteor/meteor';
import { hasValue } from '../../../../libs/hasValue';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import Typography from '@mui/material/Typography';
import { sysSizing } from '../../../../ui/materialui/styles';
import { useNavigate } from 'react-router-dom';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';

const { Container, IconButton, NavContainer } = SysAppBarStyles;

export interface ISysAppBarProps {
	logo?: ReactNode;
	menuOptions?: (IAppMenu | null)[];
}

export const SysAppBar: React.FC<ISysAppBarProps> = ({ logo, menuOptions }: ISysAppBarProps) => {
	const { user, isLoggedIn } = useContext<IAuthContext>(AuthContext);
	const navigate = useNavigate();
	const onLogoClick = () => navigate('/');
	const routes = new SysRoutes();

	const menuRef = useRef<SysMenuRef>(null);
	const menuNavRef = useRef<SysMenuRef>(null);
	const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => menuRef.current?.handleOpen(event);
	const openNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => menuNavRef.current?.handleOpen(event);

	const theme = useTheme();
	const isSmallerThanLg = useMediaQuery(theme.breakpoints.down('lg'));

	const options = menuOptions?.map((option, index) =>
		!option || (!isLoggedIn && routes.checkIfRouteIsProtected(option.path || '')) ? null : (
			<SysNavLink key={index} active={SysRoutes.checkIsActiveRoute(option.path)} sysOptions={option} />
		)
	);

	const optionsMobile = menuOptions
		?.map((option) =>
			!option || (!isLoggedIn && routes.checkIfRouteIsProtected(option.path || ''))
				? null
				: {
						text: option.name || '',
						icon: option.icon,
						onClick: () => navigate(option.path || '')
					}
		)
		.filter((option) => option !== null);

	const userLogout = async () => {
		Meteor.logout();
		// await cleanUserCache();
		navigate('/');
	};

	const userLogin = () => navigate('/signin');

	return (
		<Container>
			<Box sx={{ cursor: 'pointer' }} onClick={onLogoClick}>
				{logo}
			</Box>
			<NavContainer>
				{isSmallerThanLg && hasValue(optionsMobile) ? (
					<>
						<IconButton onClick={openNavMenu}>
							<SysIcon name={'menu'} />
						</IconButton>
						<SysMenu
							ref={menuNavRef}
							// @ts-ignore
							options={optionsMobile}
						/>
					</>
				) : (
					options
				)}
			</NavContainer>
			{isLoggedIn ? (
				<>
					<SysAvatar name={user?.username[0]} onClick={openMenu} />
					<SysMenu
						ref={menuRef}
						header={
							<Typography variant={'subtitle1'} color={'sysText.title'} sx={{ px: sysSizing.spacingFixedLg }}>
								{user?.username || 'Menu do usuário'}
							</Typography>
						}
						options={[
							{
								text: 'Sair',
								icon: <SysIcon name={'logout'} />,
								onClick: userLogout
							}
						]}
					/>
				</>
			) : (
				<Button startIcon={<SysIcon name={'logout'} />} onClick={userLogin} size="small">
					Login
				</Button>
			)}
		</Container>
	);
};
