import React, { ElementType } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IStyles {
	container: ElementType<BoxProps>;
	body: ElementType<BoxProps>;
	footer: ElementType<BoxProps>;
}


const passwordRecoveryStyle: IStyles = {
	container: styled(Box)(({
		gap: sysSizing.spacingFixedXl,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	})),
	body: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: theme.spacing(2),
	})),
	footer: styled(Box)(({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: sysSizing.spacingFixedMd,
		justifyContent: 'space-between',
	})),
}


export default passwordRecoveryStyle;
