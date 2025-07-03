import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { sysSizes } from "/imports/theme/sizes";

export default {
	container: styled(Box)(({ theme }) => ({
		background: theme.palette.sysBackground.default,
		padding: sysSizes.spacingFixed.sm,
		display: "flex",
		gap: sysSizes.spacingFixed.md,
		[theme.breakpoints.down("md")]: {
			display: "none"
		}
	})),
	restrictMappingBarContainer: styled(Box)(({ theme }) => ({
		background: theme.palette.sysBackground.default,
		padding: sysSizes.spacingFixed.sm,
		display: "flex",
		gap: sysSizes.spacingFixed.md,
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	})),
	subContainer: styled(Box)({
		flex: "1",
		display: "flex",
		gap: sysSizes.spacingFixed.sm
	})
};
