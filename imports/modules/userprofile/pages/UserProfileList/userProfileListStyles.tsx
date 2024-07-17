import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import  Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IUserProfileListViewStyled {
	Container: ElementType<BoxProps>;
	Filters: ElementType<BoxProps>;
	FieldsForm: ElementType<BoxProps>;
}

const UserProfileListViewStyled: IUserProfileListViewStyled = {
	Container: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
		gap: sysSizing.spacingFixedMd,
		marginBottom: sysSizing.base.baseFixed8
	})),
	Filters: styled(Box)(() => ({
		display: 'flex',
		gap: sysSizing.spacingFixedMd,
		alignItems: 'flex-end',
		width: '100%',
		maxWidth: '616px',
		marginBottom: sysSizing.spacingFixedMd
	})),
	FieldsForm: styled(Box)(() => ({
		display: 'flex',
		gap: sysSizing.spacingFixedMd,
		flexDirection: 'column'
	}))
};

export default UserProfileListViewStyled;
