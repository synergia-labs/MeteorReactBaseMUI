import React from "react";

import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { getSysSizes } from "../../../theme/sizes";

interface ISysUploadFileStyle {
	container: React.ComponentType<BoxProps>;
	button: React.ComponentType<ButtonProps>;
	typographyInfo: React.ComponentType<TypographyProps>;
	typographyAdd: React.ComponentType<TypographyProps>;
	loadingContainer: React.ComponentType<BoxProps>;
}

const SysUploadFileStyle: ISysUploadFileStyle = {
	container: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		width: "100%",
		minWidth: "279px",
		padding: getSysSizes(theme).spacingRem.md,
		gap: getSysSizes(theme).spacingFixed.sm
	})),
	loadingContainer: styled(Box)(() => ({
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		display: "flex",
		zIndex: 999,
		backgroundColor: "rgba(255,255,255,0.4)"
	})),
	button: styled(Button)(({ theme }) => ({
		"width": "100%",
		"height": "96px",
		"display": "flex",
		"flexDirection": "column",
		"gap": getSysSizes(theme).spacingFixed.sm,
		"alignItems": "center",
		"justifyContent": "center",
		"borderRadius": getSysSizes(theme).radius.xs,
		"border": `1px dashed ${theme.palette.divider}`,
		"cursor": "pointer",
		"&: hover": {
			background: theme.palette.sysBackground?.bg1,
			border: `1px dashed ${theme.palette.divider}`
		},
		"background": theme.palette.common.white
	})),

	typographyInfo: styled(Typography)(({ theme }) => ({
		color: theme.palette.sysText?.auxiliary
	})),

	typographyAdd: styled(Typography)(({ theme }) => ({
		color: theme.palette.primary.dark,
		display: "flex",
		alignItems: "center",
		gap: getSysSizes(theme).components.buttonGap
	}))
};

export default SysUploadFileStyle;
