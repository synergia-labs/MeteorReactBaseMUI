import React from "react";
import { Box, styled, Button } from "@mui/material";
import SysTooltipTypography from "../../sysTooltipTypography/sysTooltipTypography";
import { sysSizes } from "/imports/theme/sizes";

const SysUploadFileStyle = {
	container: styled(Box)(({}) => ({
		display: "flex",
		flexDirection: "column",
		width: "100%",
		minWidth: "279px",
		padding: sysSizes.spacingRem.md,
		gap: sysSizes.spacingFixed.sm
	})),

	button: styled(Button)(({ theme }) => ({
		"width": "100%",
		"height": "96px",
		"display": "flex",
		"flexDirection": "column",
		"gap": sysSizes.spacingFixed.sm,
		"alignItems": "center",
		"justifyContent": "center",
		"borderRadius": sysSizes.radius.xs,
		"border": `1px dashed ${theme.palette.divider}`,
		"cursor": "pointer",
		"&: hover": {
			background: theme.palette.sysBackground?.bg1,
			border: `1px dashed ${theme.palette.divider}`
		},
		"background": theme.palette.common.white
	})),

	typographyInfo: styled(SysTooltipTypography)(({ theme }) => ({
		color: theme.palette.sysText?.auxiliary
	})),

	typographyAdd: styled(SysTooltipTypography)(({ theme }) => ({
		color: theme.palette.sysAction.primary,
		display: "flex",
		alignItems: "center",
		gap: sysSizes.components.buttonGap
	})),

	boxItem: styled(Box)(({ theme }) => ({
		width: "100%",
		height: "80px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		gap: sysSizes.spacingRem.md,
		padding: sysSizes.spacingRem.md,
		backgroundColor: theme.palette.sysBackground?.bg1,
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: sysSizes.radius.sm
	})),

	boxIcon: styled(Box)(({ theme }) => ({
		minWidth: "48px",
		minHeight: "48px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "50%",
		background: theme.palette.sysAction?.primaryBgHover
	})),

	cardInfo: styled(Box)(({}) => ({
		maxHeight: "120px",
		display: "flex",
		flexDirection: "column",
		flexShrink: 0,
		gap: sysSizes.spacingRem.xs,
		flex: 1
	})),

	elipsesText: styled(SysTooltipTypography)(({}) => ({
		textOverflow: "ellipsis",
		overflow: "hidden"
	})),

	boxIconsCard: styled(Box)(({}) => ({
		display: "flex",
		justifyContent: "space-between"
	}))
};

export default SysUploadFileStyle;
