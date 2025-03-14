import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '../../../../ui/materialui/styles';
import { SysSectionPaddingXY } from '../../../../ui/layoutComponents/sysLayoutComponents';

interface IUserProfileListViewStyled {
	Container: ElementType<BoxProps>;
	Filters: ElementType<BoxProps>;
	FieldsForm: ElementType<BoxProps>;
}

const UserProfileListViewStyled: IUserProfileListViewStyled = {
	Container: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		gap: sysSizing.spacingFixedMd,
		marginBottom: sysSizing.contentFabDistance
	})),
	Filters: styled(Box)(({ theme }) => ({
		display: 'flex',
		gap: sysSizing.spacingFixedMd,
		alignItems: 'flex-end',
		width: 'min(600px, 100%)',
		marginBottom: sysSizing.spacingFixedMd,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column'
		}
	})),
	FieldsForm: styled(Box)(() => ({
		display: 'flex',
		gap: sysSizing.spacingFixedMd,
		flexDirection: 'column'
	}))
};

export default UserProfileListViewStyled;
