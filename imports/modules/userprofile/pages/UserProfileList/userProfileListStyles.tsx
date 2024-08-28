import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import  Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import {SysSectionPaddingXY} from "/imports/ui/layoutComponents/sysLayoutComponents";

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
