import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { ElementType } from 'react';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IFieldsWithErrorDialog {
	Container: ElementType<BoxProps>;
	Header: ElementType<BoxProps>;
	Body: ElementType<BoxProps>;
}

const FieldsWithErrorDialogStyles: IFieldsWithErrorDialog = {
	Container: styled(Box)({
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
		minWidth: '500px',
		minHeight: '300px',
		padding: '16px'
	}),
	Header: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		gap: '16px',
		justifyContent: 'space-between'
	}),
	Body: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		borderRadius: sysSizing.radiusMd,
		backgroundColor: theme.palette.sysAction?.primaryBgHover,
		padding: sysSizing.spacingFixedMd
	}))
};

export default FieldsWithErrorDialogStyles;
