import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { sysSizing } from '../../../materialui/styles';

interface IInfo {
	type: 'label' | 'placeholder';
	disabled: boolean;
}

export const SysViewFieldStyle = {
	Container: styled(Box)(({}) => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedXs
	})),

	Info: styled(Typography)<IInfo>(({ theme, type, disabled }) => ({
		display: 'flex',
		alignItems: 'center',
		height: type === 'label' ? '21px' : '25px',
		color: disabled
			? theme.palette.sysText?.disabled
			: type == 'label'
				? theme.palette.sysText?.auxiliary
				: theme.palette.sysText?.body
	}))
};
