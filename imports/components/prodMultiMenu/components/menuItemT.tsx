import React, { forwardRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ISubMenu } from "../multiMenu";
import { Box, Typography, useTheme } from "@mui/material";
import { sysSizes } from "/imports/theme/sizes";
import { hasValue } from "/imports/libs/hasValue";

export const MenuItemT = forwardRef<HTMLLIElement, ISubMenu & { hasSub?: boolean }>(
	(
		{
			onClick,
			label,
			startComponent,
			endComponent,
			disable,
			hasSub = false,
			showDisabled,
			subLabel,
			passProps,
			isSelected
		},
		ref
	) => {
		const theme = useTheme();
		if (disable && !showDisabled) return;
		return (
			<MenuItem
				ref={ref}
				selected={isSelected ?? false}
				sx={{
					"padding": `${sysSizes.spacingRem.sm} ${sysSizes.spacingFixed.lg}`,
					"display": "flex",
					"alignItems": "center",
					"flexShrink": 0,
					"color": theme.palette.sysText.body,
					"textAlign": "start",
					"gap": sysSizes.spacingRem.sm,
					"&.Mui-disabled": {
						color: theme.palette.sysText.disabled2
					}
				}}
				onMouseDown={onClick}
				disabled={!!disable}>
				<>{startComponent?.(passProps)}</>
				<ListItemText>
					<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
						<Typography title={label} variant="body1">
							{label}
						</Typography>

						{hasValue(subLabel) && <Typography variant="caption3">{subLabel}</Typography>}
					</Box>
				</ListItemText>
				<>{endComponent?.(passProps)}</>
				{hasSub && <KeyboardArrowRightIcon sx={{ marginLeft: "10px", width: "16px", height: "16px" }} />}
			</MenuItem>
		);
	}
);
