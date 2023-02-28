import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { MemoryRouter } from 'react-router';
import { useTheme } from '@mui/material';
import { ICommonOptions, commonOptions } from '../AppGeneralComponents';
import { SxProps } from '@mui/system';
import { useUserAccount } from '/imports/hooks/useUserAccount';
import { AppRouterSwitch } from '../layouts/AppRouterSwitch';

export interface IModalContainer extends ICommonOptions {
	url?: string;
	style?: object | SxProps;
	component?: React.ElementType;
	modalOnClose?: boolean;
	fullScreenOnMobile?: boolean;
}

export const ModalContainer = (options: IModalContainer = commonOptions) => {
	const theme = useTheme();
	const { isLoggedIn, user, userLoading } = useUserAccount();
	const RenderedComponent = options.component;
	const url = options.url;

	const { fullScreenOnMobile } = options;

	let style = options.style
		? options.style
		: {
				position: 'absolute' as 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				maxWidth: { xs: '100vw', sm: '800px', lg: '1000px' },
				bgcolor: 'background.paper',
				background: 'white',
				boxShadow: 24,
				p: { xs: '1rem', sm: '2rem' },
				overflowX: 'none',
				overflowY: 'auto',
				maxHeight: { xs: '100vh', sm: 'calc(100vh - 2rem)' },
				borderRadius: { xs: '0', sm: '24px' }
		  };

	if (fullScreenOnMobile) {
		style = { ...style, height: { xs: '100%', sm: 'auto' }, width: { xs: '100%', sm: 'auto' } };
	}

	return (
		<Modal
			open={options.open}
			onClose={options.modalOnClose ? options.onClose : undefined}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description">
			<Box id="modalDiv" sx={style}>
				{RenderedComponent ? RenderedComponent : null}
				{url ? (
					<MemoryRouter initialEntries={[url]} initialIndex={0}>
						<AppRouterSwitch
							{...options}
							close={options.onClose}
							viewer={'modal'}
							user={user}
							isLoggedIn={isLoggedIn}
							userLoading={userLoading}
							theme={theme}
						/>
					</MemoryRouter>
				) : null}
			</Box>
		</Modal>
	);
};
