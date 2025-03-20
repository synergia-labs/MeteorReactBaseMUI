import React, { ElementType } from "react";
import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";
import Paper, { PaperProps } from "@mui/material/Paper";
import { sysSizing } from "../../materialui/styles";

interface IWrapper extends BoxProps {
	backgroundImagePath?: string;
}

interface IStyles {
	wrapper: ElementType<IWrapper>;
	container: ElementType<BoxProps>;
	dataContent: ElementType<PaperProps>;
}

const TemplateLoginStyles: IStyles = {
	wrapper: styled(Box, {
		shouldForwardProp: (prop) => prop !== "backgroundImagePath"
	})<IWrapper>(({ theme, backgroundImagePath = "/images/wireframe/background-synergia.svg" }) => ({
		minHeight: "100vh",
		width: "100%",
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		position: "relative",

		[theme.breakpoints.up("md")]: {
			backgroundImage: `url(${backgroundImagePath})`,
			backgroundSize: "cover",
			backgroundPosition: "right"
		}
	})),
	container: styled(Box)(({ theme }) => ({
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		gap: theme.spacing(6),
		padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedXl}`,

		[theme.breakpoints.up("md")]: {
			width: "auto",
			height: "auto",
			position: "absolute",
			top: "50%",
			left: "10%",
			transform: "translateY(-50%)"
		}
	})),
	dataContent: styled(Paper)(({ theme }) => ({
		width: "100%",
		padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedXl}`,
		borderRadius: sysSizing.radiusLg,
		boxShadow: theme.shadows[3],
		gap: sysSizing.spacingFixedXl,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		maxWidth: "400px"
	}))
};

export default TemplateLoginStyles;
