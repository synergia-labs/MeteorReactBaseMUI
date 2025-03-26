import React, { ElementType } from "react";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { sysSizes } from "../../../theme/sizes";

interface IStyles {
	container: ElementType<BoxProps>;
	messageContent: ElementType<BoxProps>;
	header: ElementType<BoxProps>;
	footer: ElementType<BoxProps>;
}

const showDialogStyles: IStyles = {
	container: styled(Box)(({ theme }) => ({
		padding: sysSizes.spacingFixed.lg,
		borderRadius: sysSizes.radius.lg,
		gap: sysSizes.spacingFixed.lg,
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
	messageContent: styled(Box)(() => ({
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		gap: sysSizes.spacingFixed.md
	})),
	header: styled(Box)(() => ({
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: sysSizes.spacingFixed.md
	})),
	footer: styled(Box)(() => ({
		gap: sysSizes.spacingRem.md,
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
