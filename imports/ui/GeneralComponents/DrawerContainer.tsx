import React from 'react';
import { MemoryRouter } from 'react-router';
import { Theme, useTheme } from '@mui/material';
import { ICommonOptions, commonOptions } from '../AppGeneralComponents';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import { isMobile } from '/imports/libs/deviceVerify';
import { useUserAccount } from '/imports/hooks/useUserAccount';
import { AppRouterSwitch } from '../layouts/AppRouterSwitch';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';

export interface IDrawerContainerOptions extends ICommonOptions {
	component?: typeof React.Component;
	url?: string;
	anchor?: 'bottom' | 'left' | 'right' | 'top' | undefined;
	title?: string;
}

export const DrawerContainer = (options: IDrawerContainerOptions = commonOptions) => {
	const theme = useTheme();
	const { isLoggedIn, user, userLoading } = useUserAccount();

	const Component = options.component;
	const url = options.url;
	return (
		<Drawer aria-labelledby="Drawer" onClose={options.onClose} open={options.open} anchor={options.anchor || 'right'}>
			<div
				style={{
					height: '100%',
					maxHeight: '100vh',
					minWidth: isMobile ? '100%' : 360,
					maxWidth: 460,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}>
				{options.title ? (
					<div
						style={{
							backgroundColor: theme.palette.primary.main,
							color: '#FFF',
							width: '100%',
							minHeight: 40,
							height: 40,
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							paddingLeft: 8
						}}>
						<IconButton onClick={options.onClose}>
							<Close style={{ color: '#FFF' }} />
						</IconButton>
						<h3 style={{ paddingLeft: 8 }}>{options.title}</h3>
					</div>
				) : null}
				{Component ? <Component /> : null}
				{url ? (
					<MemoryRouter initialEntries={[url]} initialIndex={0}>
						<AppRouterSwitch
							{...options}
							close={options.onClose}
							viewer={'drawer'}
							user={user as IUserProfile}
							isLoggedIn={isLoggedIn}
							userLoading={userLoading}
							theme={theme}
						/>
					</MemoryRouter>
				) : null}
			</div>
		</Drawer>
	);
};
