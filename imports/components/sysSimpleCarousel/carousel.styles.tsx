import { Box, BoxProps, ButtonBase } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { sysSizes } from "/imports/theme/sizes";

const Styles = {
	container: styled(Box)({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: sysSizes.spacingFixed.md,
		width: "100%"
	}),
	row: styled(Box)({
		display: "flex",
		width: "100%",
		maxWidth: "100%",
		alignItems: "center",
		gap: sysSizes.spacingRem.xs
	}),
	body: styled(Box)({
		width: "100%"
	}),
	btFooter: styled(ButtonBase)({}),
	markContainer: styled(Box)({
		display: "flex",
		gap: sysSizes.spacingFixed.sm
	}),
	mark: styled(Box)<BoxProps & { selected: "true" | "false" }>(({ theme, selected }) => ({
		backgroundColor: selected == "true" ? theme.palette.sysAction.auxiliary : theme.palette.sysBackground.bg2,
		width: "8px",
		height: "8px",
		borderRadius: "100px"
	}))
};

export default Styles;
