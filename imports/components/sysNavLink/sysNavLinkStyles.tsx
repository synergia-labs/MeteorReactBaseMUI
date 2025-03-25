import React from "react";
import { Box, BoxProps, styled } from "@mui/material";
import { getSysSizes } from "../../theme/sizes";

interface ISysNavLinkStyles {
	Container: React.ElementType<BoxProps & IContainer>;
}

interface IContainer {
	active: boolean;
	disabled: boolean;
}

const SysNavLinkStyles: ISysNavLinkStyles = {
	Container: styled(({ active, disabled, ...otherProps }: IContainer) => <Box {...otherProps} />)<IContainer>(
		({ theme, active, disabled }) => ({
			"padding": `${getSysSizes(theme).spacingRem.xs} ${getSysSizes(theme).spacingRem.md}`,
			"borderRadius": getSysSizes(theme).radius.infinite,
			"display": "flex",
			"alignItems": "center",
			"justifyContent": "center",
			"gap": getSysSizes(theme).spacingRem.sm,
			"cursor": disabled ? "default" : "pointer",
			"backgroundColor": active ? theme.palette.sysAction?.primaryHover : "transparent",
			"color": disabled ? theme.palette.primary.light : theme.palette.sysAction?.primaryContrastText,
			"transition": "all 150ms linear",
			"&:hover": !active &&
				!disabled && {
					backgroundColor: theme.palette.sysAction?.primaryContrastBg,
					color: theme.palette.sysAction?.primaryContrastText,
					transition: "all 150ms linear"
				}
		})
	)
};

export default SysNavLinkStyles;
