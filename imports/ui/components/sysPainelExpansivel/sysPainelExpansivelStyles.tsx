import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import { Box, styled } from '@mui/material';
import { sysSizing } from '../../materialui/styles';

interface ISumary {
	posicaoIcone?: 'inicio' | 'fim';
}

const PainelExpansivoStyle = {
	container: styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	})),

	acordion: styled(Accordion)(({ theme }) => ({
		width: '100%',
		borderRadius: `${sysSizing.spacingFixedXs} !important`
	})),

	acordionSumamry: styled(AccordionSummary)<ISumary>(({ theme, posicaoIcone }) => ({
		flexDirection: posicaoIcone === 'inicio' ? 'row-reverse' : 'row',
		gap: sysSizing.spacingFixedSm
	})),

	acordionDetail: styled(AccordionDetails)(({ theme }) => ({})),

	acordionActions: styled(AccordionActions)(({ theme }) => ({
		display: 'flex'
	})),

	actionButton: styled(Button)(({ theme }) => ({}))
};

export default PainelExpansivoStyle;
