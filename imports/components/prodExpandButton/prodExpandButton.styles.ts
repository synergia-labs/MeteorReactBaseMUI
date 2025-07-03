import { IconButton } from "@mui/material";
import styled from "@mui/material/styles/styled";

export default {
	iconButton: styled(IconButton)(({ theme }) => ({
		color: theme.palette.sysAction.secondaryIcon,
		["&:hover"]: {
			color: theme.palette.sysAction.secondaryIcon
		},
		["&:active"]: {
			color: theme.palette.sysAction.secondaryIcon
		},
		["&:focus"]: {
			color: theme.palette.sysAction.secondaryIcon
		}
	}))
};
