import styled from "@mui/material/styles/styled";
import Switch from "@mui/material/Switch";
import { sysSizes } from "/imports/theme/sizes";

export default {
	switch: styled(Switch)(({ theme }) => ({
		"width": 40,
		"height": 20,
		"padding": 0,
		"display": "flex",
		"&:active": {
			"& .MuiSwitch-thumb": {
				width: 15
			},
			"& .MuiSwitch-switchBase.Mui-checked": {
				transform: "translateX(9px)"
			}
		},
		"& .MuiSwitch-switchBase": {
			"padding": 3,
			"&.Mui-checked": {
				"transform": "translateX(20px)",
				"color": theme.palette.sysAction.primaryContrastText,
				"& + .MuiSwitch-track": {
					opacity: 1,
					backgroundColor: theme.palette.sysAction.auxiliary,
					...theme.applyStyles("dark", {
						backgroundColor: "#177ddc"
					})
				}
			}
		},
		"& .MuiSwitch-thumb": {
			boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
			width: 14,
			height: 14,
			borderRadius: sysSizes.radius.infinite,
			transition: theme.transitions.create(["width"], {
				duration: 200
			})
		},
		"& .MuiSwitch-track": {
			borderRadius: sysSizes.radius.infinite,
			border: `1px solid ${theme.palette.sysAction.primary}`,
			opacity: 1,
			backgroundColor: theme.palette.sysBackground.default,
			boxSizing: "border-box",
			...theme.applyStyles("dark", {
				backgroundColor: "rgba(255,255,255,.35)"
			})
		}
	}))
};
