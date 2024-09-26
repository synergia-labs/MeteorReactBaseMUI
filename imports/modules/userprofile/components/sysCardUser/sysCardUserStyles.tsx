import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { sysShadows, sysSizing } from '../../../../ui/materialui/styles';

interface ISysCardUserStyled {
	Container: React.ElementType;
	ActionBox: React.ElementType;
	Status: React.ElementType;
}

const SysCardUserStyled: ISysCardUserStyled = {
	Container: styled(Box)(({ theme }) => ({
		width: '100%',
		backgroundColor: theme.palette.background.default,
		borderRadius: sysSizing.radiusSm,
		padding: sysSizing.spacingFixedMd,
		boxShadow: sysShadows.shadow2,
		display: 'grid',
		gap: '0.75rem 1.25rem',
		gridTemplateColumns: '2fr 1fr 2fr 140px 64px',
		gridTemplateAreas: '"name roles email status actions"',
		alignItems: 'center',
		[theme.breakpoints.down('lg')]: {
			gridTemplateColumns: '2fr 1fr 64px',
			gridTemplateAreas: '"name roles actions" "email status status"'
		},
		[theme.breakpoints.down('sm')]: {
			gridTemplateColumns: '1fr 1fr 64px',
			gridTemplateAreas: '"name name actions" "email email email" "roles status status"'
		},
		'& > p': {
			wordBreak: 'break-all'
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
		}
	})),
	Status: styled(Typography)(({ theme }) => ({
		gridArea: 'status',
		[theme.breakpoints.down('sm')]: {
			justifySelf: 'end'
		}
	}))
};

export default SysCardUserStyled;
