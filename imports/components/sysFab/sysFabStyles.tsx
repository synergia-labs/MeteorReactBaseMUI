import { Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import Fab, { FabProps } from "@mui/material/Fab";
import React from "react";
import { sisSizes } from "../../theme/sizes";

interface ISysFabProps extends FabProps {
	fixed?: boolean;
	theme?: Theme;
}

export const SysFabStyled = styled(({ fixed, ...otherProps }: ISysFabProps) => <Fab {...otherProps} />)<ISysFabProps>(({
	theme,
	fixed
}) => {
	const defaultStyle = {
		"borderRadius": sisSizes(theme).radius.infinite,
		"backgroundColor": theme?.palette.sysAction?.primary,
		"color": theme?.palette.sysAction?.primaryContrastText,
		"&:hover": {
			backgroundColor: theme?.palette.sysAction?.primaryHover
		},
		"display": "flex",
		"justifyContent": "center",
		"alignItems": "center",
		"gap": sisSizes(theme).components.buttonGap,
		"transition": "all 0.3s ease"
	};

	const fixedStyle = {
		position: "fixed",
		right: "72px",
		bottom: "56px",
		[theme.breakpoints.down("md")]: {
			right: "40px",
			bottom: "32px"
		},
		[theme.breakpoints.down("sm")]: {
			right: "24px"
		}
	};

	if (fixed)
		return {
			...defaultStyle,
			...fixedStyle
		};
	return defaultStyle;
});
