import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { sysShadows, sysSizing } from "/imports/ui/materialui/styles";

interface IStyles {
	container: ElementType<BoxProps>;
	actionBox: ElementType<BoxProps>;
	status: ElementType<TypographyProps>;
}

const userCardStyles: IStyles = {
	container: styled(Box)(({ theme }) => ({
		"width": "100%",
		"backgroundColor": theme.palette.background.default,
		"borderRadius": sysSizing.radiusSm,
		"padding": sysSizing.spacingFixedMd,
		"boxShadow": sysShadows.shadow2,
		"display": "grid",
		"gap": "0.75rem 1.25rem",
		"gridTemplateColumns": "2fr 1fr 2fr 140px 64px",
		"gridTemplateAreas": '"name roles email status actions"',
		"alignItems": "center",
		[theme.breakpoints.down("lg")]: {
			gridTemplateColumns: "2fr 1fr 64px",
			gridTemplateAreas: '"name roles actions" "email status status"'
		},
		[theme.breakpoints.down("sm")]: {
			gridTemplateColumns: "1fr 1fr 64px",
			gridTemplateAreas: '"name name actions" "email email email" "roles status status"'
		},
		"& > p": {
			wordBreak: "break-all"
		}
	})),
	actionBox: styled(Box)(({ theme }) => ({
		"gridArea": "actions",
		"display": "flex",
		"justifyContent": "end",
		"gap": sysSizing.spacingFixedMd,
		"> svg": {
			cursor: "pointer",
			color: theme.palette.sysAction?.primaryIcon
		}
	})),
	status: styled(Typography)(({ theme }) => ({
		gridArea: "status",
		[theme.breakpoints.down("sm")]: {
			justifySelf: "end"
		}
	}))
};

export default userCardStyles;
