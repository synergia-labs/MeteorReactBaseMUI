import React, { ReactNode } from 'react';
import { IShowDialogProps } from '../showDialog';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

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
						<SysIcon name={'close'}/>
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
