import { ElementType } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { sysSizing } from '../../../../ui/materialui/styles';

interface IUserProfileDetailStyles {
	Container: ElementType<BoxProps>;
	FieldsForm: ElementType<BoxProps>;
	Actions: ElementType<BoxProps>;
}

const UserProfileDetailStyles: IUserProfileDetailStyles = {
	Container: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedLg,
		width: '540px',
		padding: sysSizing.spacingFixedLg
	})),
	FieldsForm: styled(Box)(() => ({
		display: 'flex',
		gap: sysSizing.spacingFixedMd,
		flexDirection: 'column'
	})),
	Actions: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'row',
		gap: sysSizing.spacingRemMd,
		padding: 0,
		justifyContent: 'flex-end'
	}))
};

export default UserProfileDetailStyles;
