import { ElementType } from 'react';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionActions, { AccordionActionsProps } from '@mui/material/AccordionActions';
import AccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { Box, BoxProps, styled } from '@mui/material';
import { sysSizing } from '../../materialui/styles';

interface ISysAccordion {
	container: ElementType<BoxProps>;
	accordion: ElementType<AccordionProps>;
	accordionSummary: ElementType<ISummaryProps>;
	accordionActions: ElementType<AccordionActionsProps>;
}

interface ISummaryProps extends AccordionSummaryProps {
	posicaoIcone?: 'inicio' | 'fim';
}

const AccordionStyle: ISysAccordion = {
	container: styled(Box)(() => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	})),

	accordion: styled(Accordion)(() => ({
		width: '100%',
		borderRadius: `${sysSizing.spacingFixedXs} !important`
	})),

	accordionSummary: styled(AccordionSummary)<ISummaryProps>(({ posicaoIcone }) => ({
		flexDirection: posicaoIcone === 'inicio' ? 'row-reverse' : 'row',
		gap: sysSizing.spacingFixedSm
	})),

	accordionActions: styled(AccordionActions)(() => ({
		display: 'flex'
	}))
};

export default AccordionStyle;
