import React from 'react';
import { Box, styled } from '@mui/material';
import { sysShadows, sysSizing } from '/imports/ui/materialui/styles';

interface ISysCardUserStyled {
	Container: React.ElementType;
	ActionBox: React.ElementType;
}

const SysCardUserStyled: ISysCardUserStyled = {
	Container: styled(Box)(({ theme }) => ({
		width: '100%',
		backgroundColor: theme.palette.background.default,
		borderRadius: sysSizing.radiusSm,
		padding: sysSizing.spacingFixedMd,
		boxShadow: sysShadows.shadow2,
		display: 'grid',
    gap: '0.5rem 1rem',
    gridTemplateColumns: '2fr 1fr 2fr 140px 64px',
    gridTemplateAreas: '"name roles email status actions"',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '2fr 1fr 64px',
      gridTemplateAreas: '"name roles actions" "email status status"'
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr 1fr 64px',
      gridTemplateAreas: '"name name actions" "email email email" "roles status status"'
    }
	})),
	ActionBox: styled(Box)(({ theme }) => ({
    gridArea: 'actions',
		display: 'flex',
    justifyContent: 'end',
		gap: sysSizing.spacingFixedMd,
		'> svg': {
			cursor: 'pointer',
			color: theme.palette.sysAction?.primaryIcon
		},
	}))
};

export default SysCardUserStyled;
