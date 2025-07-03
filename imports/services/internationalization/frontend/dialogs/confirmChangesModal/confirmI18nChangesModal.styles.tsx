import React, { ElementType } from "react";
import { Box, BoxProps, Paper, PaperProps, styled } from "@mui/material";

interface IStyles {
	container: ElementType<BoxProps>;
	body: ElementType<BoxProps>;
	absolute: {
		container: ElementType<BoxProps>;
		changeContainer: ElementType<BoxProps>;
	};
	table: {
		container: ElementType<BoxProps>;
		header: ElementType<BoxProps>;
		body: ElementType<BoxProps>;
	};
	translateItem: ElementType<PaperProps>;
	footer: ElementType<BoxProps>;
}

const ConfirmI18nChangesModalStyles: IStyles = {
	container: styled(Box)(({ theme }) => ({
		width: "min(1200px, 90vw)",
		height: "80vh",
		padding: theme.spacing(4, 3),
		display: "flex",
		flexDirection: "column",
		gap: theme.spacing(2)
	})),
	body: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		flexGrow: 1,
		overflowY: "auto",
		gap: theme.spacing(3)
	})),
	absolute: {
		container: styled(Box)(({ theme }) => ({
			position: "absolute",
			top: 0,
			right: 0,
			width: "100%",
			height: "100%",
			display: "flex",
			flexDirection: "row",
			alignItems: "stretch",
			gap: theme.spacing(2),
			padding: theme.spacing(0, 1),
			pointerEvents: "none"
		})),
		changeContainer: styled(Box)(({ theme }) => ({
			opacity: 0.1,
			padding: theme.spacing(0, 1),
			borderRadius: theme.shape.borderRadius * 2
		}))
	},
	table: {
		container: styled(Box)(({ theme }) => ({
			display: "flex",
			flexDirection: "column",
			gap: theme.spacing(3),
			position: "relative",
			padding: theme.spacing(3, 0),
			maxHeight: "calc(100% - 80px)",
			overflow: "hidden"
		})),
		header: styled(Box)(({ theme }) => ({
			display: "flex",
			flexDirection: "row",
			gap: theme.spacing(2)
		})),
		body: styled(Box)(({ theme }) => ({
			display: "flex",
			flexDirection: "column",
			alignItems: "stretch",
			justifyContent: "flex-start",
			height: "auto",
			maxHeight: "100%",
			overflowY: "auto",
			gap: theme.spacing(2)
		}))
	},
	translateItem: styled(Paper)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing(2),
		padding: theme.spacing(2, 1.5),
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: theme.shape.borderRadius * 2
	})),
	footer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: theme.spacing(2)
	}))
};

export default ConfirmI18nChangesModalStyles;
