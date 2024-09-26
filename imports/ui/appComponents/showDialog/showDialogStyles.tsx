import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';


export const DialogTitleStyled = styled(DialogTitle)(({}) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	gap: '1rem',
	'& .MuiSvgIcon-root': {
		fontSize: '2.2rem'
	}
}));

export const DialogContentStyled = styled(DialogContent)(({}) => ({
	padding: 0,
	color: 'sysBackground.sysText.auxiliary',
	overflowY: 'hidden'
}));
