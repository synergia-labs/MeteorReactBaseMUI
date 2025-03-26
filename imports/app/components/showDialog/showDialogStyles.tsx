import React, { ElementType } from "react";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { sisSizes } from "../../../theme/sizes";

interface IStyles {
	container: ElementType<BoxProps>;
	messageContent: ElementType<BoxProps>;
	header: ElementType<BoxProps>;
	footer: ElementType<BoxProps>;
}

const showDialogStyles: IStyles = {
	container: styled(Box)(({ theme }) => ({
		padding: sisSizes(theme).spacingFixed.lg,
		borderRadius: sisSizes(theme).radius.lg,
		gap: sisSizes(theme).spacingFixed.lg,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		minWidth: "500px",
		minHeight: "160px",
		maxWidth: "550px",

		[theme.breakpoints.down("sm")]: {
			minWidth: "auto",
			minHeight: "auto"
		}
	})),
	messageContent: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		gap: sisSizes(theme).spacingFixed.md
	})),
	header: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: sisSizes(theme).spacingFixed.md
	})),
	footer: styled(Box)(({ theme }) => ({
		gap: sisSizes(theme).spacingRem.md,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center"
	}))
};

export default showDialogStyles;

export const DialogContentStyled = styled(DialogContent)(() => ({
	padding: 0,
	color: "sysBackground.sysText.auxiliary",
	overflowY: "hidden"
}));
