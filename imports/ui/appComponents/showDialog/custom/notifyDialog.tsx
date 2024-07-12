import React, { ReactNode } from 'react';
import { IShowDialogProps } from '../showDialog';
import { Box, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Header = styled(Box)(({}) => ({
	display: 'flex',
	justifyContent: 'flex-end'
}));

const Body = styled(DialogContent)(({}) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	height: '100%',
	'& .MuiSvgIcon-root': {
		fontSize: '7rem'
	}
}));

interface INotifyDialogProps {
	showDialog: (options?: IShowDialogProps) => void; // Esse método é obrigatório para todo componente customizado de diálogo.
	closeDialog: (
		event?: {},
		reason?: 'backdropClick' | 'escapeKeyDown',
		callBack?: (event?: {}, reason?: 'backdropClick' | 'escapeKeyDown') => void
	) => void; // Esse método é obrigatório para todo componente customizado de diálogo.
	title?: string;
	duration?: number;
	icon: ReactNode;
}

function NotifyDialog({ showDialog, closeDialog, title, duration, icon }: INotifyDialogProps) {
	showDialog({
		duration,
		sx: {
			minHeight: '250px'
		},
		children: (
			<>
				<Header>
					<IconButton onClick={closeDialog}>
						<CloseIcon />
					</IconButton>
				</Header>
				<Body>
					{icon}
					<DialogTitle>{title}</DialogTitle>
				</Body>
			</>
		)
	});
}

export default NotifyDialog;
