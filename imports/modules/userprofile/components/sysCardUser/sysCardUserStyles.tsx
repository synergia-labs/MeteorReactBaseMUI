import React from 'react';
import { Box, styled } from '@mui/material';
import { sysAction, sysSizing } from '../../../../ui/materialui/styles';

interface ISysCardUserStyled {
	Container: React.ElementType;
	InfoBox: React.ElementType;
	ActionBox: React.ElementType;
	TitleBox: React.ElementType;
}

const SysCardUserStyled: ISysCardUserStyled = {
	Container: styled(Box)(({ theme }) => ({
		minHeight: '56px',
		width: '100%',
		backgroundColor: theme.palette.background.default,
		borderRadius: sysSizing.radiusSm,
		padding: sysSizing.spacingFixedMd,
		boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.15)',
		display: 'flex',
		justifyContent: 'space-between'
	})),
	TitleBox: styled(Box)(({}) => ({
		width: '100%',
		maxWidth: '250px',
		'.title': {
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		}
	})),
	InfoBox: styled(Box)(({}) => ({
		display: 'flex',
		gap: sysSizing.spacingFixedMd,
		width: '100%',
		justifyContent: 'center',
		'.roles': {
			width: '100%',
			maxWidth: '150px'
		},
		'.email': {
			width: '100%',
			maxWidth: '200px'
		},
		'.status': {
			width: '100%',
			maxWidth: '100px'
		}
	})),
	ActionBox: styled(Box)(({}) => ({
		display: 'flex',
		gap: sysSizing.spacingFixedMd,
		'> svg': {
			cursor: 'pointer',
			color: sysAction.primaryIcon
		}
	}))
};

export default SysCardUserStyled;
