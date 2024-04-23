import { Box, BoxProps, styled } from '@mui/material';
import { ElementType } from 'react';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IFieldsWithErrorDialog {
	container: ElementType<BoxProps>;
	header: ElementType<BoxProps>;
	body: ElementType<BoxProps>;
}

const FieldsWithErrorDialogStyles: IFieldsWithErrorDialog = {
	container: styled(Box)({
		display: 'flex',
		flexDirection: 'column',
		gap: '16px',
		minWidth: '500px',
		minHeight: '300px',
		padding: '16px'
	}),
	header: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		gap: '16px',
		justifyContent: 'space-between'
	}),
	body: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
		borderRadius: sysSizing.radiusMd,
		backgroundColor: theme.palette.sysAction?.primaryBgHover,
		padding: sysSizing.spacingFixedMd
	}))
};

export default FieldsWithErrorDialogStyles;
