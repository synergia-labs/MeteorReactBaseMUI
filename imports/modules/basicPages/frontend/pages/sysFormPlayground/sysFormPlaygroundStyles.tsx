import { ElementType } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { getSysSizes } from "../../../../../theme/sizes";
import SysSectionPaddingXY from "/imports/components/layoutComponents/sectionPaddingXY";

interface ISysFormPlaygroundStyles {
	Container: ElementType<BoxProps>;
	Description: ElementType<BoxProps>;
	Playground: ElementType<BoxProps>;
	FormContainer: ElementType<BoxProps>;
	ControlerContainer: ElementType<BoxProps>;
	DocContainer: ElementType<BoxProps>;
	ButtonContainer: ElementType<BoxProps>;
	RowElement: ElementType<BoxProps>;
	SchemaContainer: ElementType<BoxProps>;
}

const SysFormPlaygroundStyles: ISysFormPlaygroundStyles = {
	Container: styled(SysSectionPaddingXY)(({ theme }) => ({
		gap: getSysSizes(theme).spacingFixed.md,
		display: "flex",
		flexDirection: "column"
	})),
	Description: styled(Box)(({ theme }) => ({
		textAlign: "justify",
		display: "flex",
		flexDirection: "column",
		gap: getSysSizes(theme).spacingFixed.sm
	})),
	Playground: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		gap: "32px 64px",
		marginTop: getSysSizes(theme).spacingFixed.lg,
		[theme.breakpoints.down("md")]: {
			flexDirection: "column-reverse"
		}
	})),
	FormContainer: styled(Box)(({ theme }) => ({
		flex: 1,
		display: "flex",
		flexDirection: "column",
		gap: getSysSizes(theme).spacingFixed.md,
		height: "fit-content"
	})),
	ControlerContainer: styled(Box)(({ theme }) => ({
		flex: 1,
		display: "flex",
		flexDirection: "column",
		gap: getSysSizes(theme).spacingFixed.lg,
		borderRadius: getSysSizes(theme).radius.sm,
		padding: getSysSizes(theme).spacingFixed.md,
		backgroundColor: theme.palette.sysAction?.primaryBgHover,
		height: "fit-content"
	})),
	DocContainer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: theme.palette.sysBackground?.default,
		borderRadius: getSysSizes(theme).radius.sm,
		minHeight: "157px",
		maxHeight: "350px",
		padding: getSysSizes(theme).spacingFixed.md
	})),
	ButtonContainer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		rowGap: getSysSizes(theme).spacingRem.md,
		columnGap: getSysSizes(theme).spacingRem.md
	})),
	RowElement: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		gap: getSysSizes(theme).spacingFixed.md,
		alignItems: "start"
	})),
	SchemaContainer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		borderRadius: getSysSizes(theme).radius.sm,
		padding: getSysSizes(theme).spacingFixed.md,
		backgroundColor: theme.palette.sysBackground?.default,
		border: `1px solid ${theme.palette.divider}`,
		overflow: "auto"
	}))
};

export default SysFormPlaygroundStyles;
