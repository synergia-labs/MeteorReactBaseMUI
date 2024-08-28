import React, { ReactNode, useContext, useRef } from 'react';
import SysAppBarStyles from './sysAppBarStyles';
import { SysAvatar } from '/imports/ui/components/sysAvatar/sysAvatar';
import { IAppMenu } from '/imports/modules/modulesTypings';
import { useNavigate } from 'react-router-dom';
import { SysAppContext } from '/imports/app/appContainer';
import SysMenu, { SysMenuRef } from '/imports/ui/components/sysMenu/sysMenu';
import { SysNavLink } from '/imports/ui/components/sysNavLink/sysNavLink';
import SysRoutes from '/imports/app/routes';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Meteor } from 'meteor/meteor';
import { cleanUserCache } from '/imports/hooks/useUserAccount';
import { hasValue } from '/imports/libs/hasValue';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';



const {
  Container,
  IconButton,
  NavContainer,
} = SysAppBarStyles;

export interface ISysAppBarProps {
	logo?: ReactNode;
	menuOptions?: (IAppMenu | null)[];
}

export const SysAppBar: React.FC<ISysAppBarProps> = ({ logo, menuOptions }: ISysAppBarProps) => {
	const { user, isLoggedIn } = useContext(SysAppContext);
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
		!!!option || (!isLoggedIn && routes.checkIfRouteIsProtected(option.path || '')) ? null : (
			<SysNavLink key={index} active={SysRoutes.checkIsActiveRoute(option.path)} sysOptions={option} />
		)
	);

	const optionsMobile = menuOptions
		?.map((option) =>
			!!!option || (!isLoggedIn && routes.checkIfRouteIsProtected(option.path || ''))
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
		await cleanUserCache();
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
						accountMenu
						title={user?.username || '-'}
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
