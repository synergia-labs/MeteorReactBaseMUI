import { ElementType } from "react";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionActions, { AccordionActionsProps } from "@mui/material/AccordionActions";
import AccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { getSysSizes } from "../../theme/sizes";

interface ISysAccordion {
	Container: ElementType<BoxProps>;
	Accordion: ElementType<AccordionProps>;
	AccordionSummary: ElementType<ISummaryProps>;
	AccordionActions: ElementType<AccordionActionsProps>;
}

interface ISummaryProps extends AccordionSummaryProps {
	posicaoIcone?: "inicio" | "fim";
}

const AccordionStyle: ISysAccordion = {
	Container: styled(Box)(() => ({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%"
	})),

	Accordion: styled(Accordion)(({ theme }) => ({
		width: "100%",
		borderRadius: `${getSysSizes(theme).spacingFixed.xs} !important`
	})),

	AccordionSummary: styled(AccordionSummary)<ISummaryProps>(({ posicaoIcone, theme }) => ({
		flexDirection: posicaoIcone === "inicio" ? "row-reverse" : "row",
		gap: getSysSizes(theme).spacingFixed.sm
	})),

	AccordionActions: styled(AccordionActions)(() => ({
		display: "flex"
	}))
};

export default AccordionStyle;
