import { ElementType } from "react";
import { Box, BoxProps, IconButton, IconButtonProps, styled } from "@mui/material";
import { sysSizes } from "../../../../../theme/sizes";

interface ISysAppBarStyles {
	wrapper: ElementType<BoxProps>;
	container: ElementType<BoxProps>;
	navContainerDesktop: ElementType<BoxProps>;
	navContainerMobile: ElementType<BoxProps>;
	iconButton: ElementType<IconButtonProps>;
}

const SysAppBarStyles: ISysAppBarStyles = {
	wrapper: styled(Box)(({ theme }) => ({
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText
	})),
	container: styled(Box)(({ theme }) => ({
		display: "flex",
		flexGrow: 1,
		flexShrink: 0,
		alignItems: "center",
		justifyContent: "space-between",
		maxWidth: sysSizes.maxDisplayWidth,
		padding: `${sysSizes.spacingFixed.sm} ${sysSizes.content.px}`,
		transition: "padding 0.3s ease",
		[theme.breakpoints.down("sm")]: { padding: sysSizes.spacingFixed.sm }
	})),
	navContainerDesktop: styled(Box)(({ theme }) => ({
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		gap: sysSizes.spacingRem.md,
		paddingRight: sysSizes.spacingFixed.md,
		[theme.breakpoints.down("md")]: { display: "none" }
	})),
	navContainerMobile: styled(Box)(({ theme }) => ({
		display: "none",
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingRight: sysSizes.spacingFixed.md,
		[theme.breakpoints.down("md")]: { display: "flex" }
	})),
	iconButton: styled(IconButton)(({ theme }) => ({
		"color": theme.palette.primary.contrastText,
		"padding": 0,
		"margin": 0,
		"& .MuiSvgIcon-root:hover": { color: theme.palette.sysAction?.bgDisabled }
	}))
};

export default SysAppBarStyles;
