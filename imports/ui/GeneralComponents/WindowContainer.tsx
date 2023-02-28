import React from 'react';
import { MemoryRouter } from 'react-router';
import { useTheme } from '@mui/material';
import { ICommonOptions, commonOptions } from '../AppGeneralComponents';
import { useUserAccount } from '/imports/hooks/useUserAccount';
import { AppRouterSwitch } from '../layouts/AppRouterSwitch';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';

export interface IWindowContainerOptions extends ICommonOptions {
	component?: typeof React.Component;
	url?: string;
}

export const WindowContainer = (options: IWindowContainerOptions = commonOptions) => {
	const theme = useTheme();

	const { isLoggedIn, user, userLoading } = useUserAccount();
	const Component = options.component;
	const url = options.url;

	return (
		<div
			className={'fadeDiv'}
			style={{
				position: 'fixed',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				zIndex: 1200,
				backgroundColor: '#FFF',
				top: 0,
				left: 0
			}}>
			<div
				style={{
					height: '100%',
					maxHeight: '100%',
					overflowY: 'auto',
					overflowX: 'hidden',
					minWidth: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}>
				{Component ? <Component /> : null}
				{url ? (
					<MemoryRouter initialEntries={[url]} initialIndex={0}>
						<AppRouterSwitch
							{...options}
							user={user as IUserProfile}
							isLoggedIn={isLoggedIn}
							userLoading={userLoading}
							theme={theme}
						/>
					</MemoryRouter>
				) : null}
			</div>
		</div>
	);
};
