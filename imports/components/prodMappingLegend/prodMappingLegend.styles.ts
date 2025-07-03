import { Box, Typography } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { enumAutonomy } from "/imports/enums/autonomy";
import { Theme } from "@mui/material/styles";
import QuillText from "../prodQuillText/quillText";
import { sysSizes } from "/imports/theme/sizes";

interface IAutonomy {
	autonomy: enumAutonomy;
}

const getAutonomyColor = (theme: Theme, autonomy: enumAutonomy) => {
	return autonomy === enumAutonomy.LOW
		? theme.palette.lowAutonomy
		: autonomy === enumAutonomy.MEDIUM
			? theme.palette.mediumAutonomy
			: theme.palette.highAutonomy;
};

export default {
	container: styled(Box)({
		width: "100%"
	}),
	collapseContainer: styled(Box)({
		display: "flex",
		flexDirection: "column",
		gap: sysSizes.spacingFixed.md,
		marginTop: sysSizes.spacingFixed.md
	}),
	title: styled(Typography, { shouldForwardProp: (prop) => prop !== "autonomy" })<IAutonomy>(({ theme, autonomy }) => ({
		color: getAutonomyColor(theme, autonomy).main,
		fontSize: "16px"
	})),
	description: styled(QuillText)(({ theme }) => ({
		color: theme.palette.sysText.auxiliary,
		fontSize: "12px"
	})),
	autonomyNumericIndicator: styled(Typography)(({ theme }) => ({
		color: theme.palette.sysText.auxiliary
	})),
	fourAutonomyContainer: styled(Box)({
		display: "flex",
		gap: "4px"
	}),
	twoAutonomyContainer: styled(Box)({
		flex: "1"
	}),
	twoAutonomyIndicatorContainer: styled(Box)({
		display: "flex",
		gap: "4px"
	}),
	oneAutonomyContainer: styled(Box)(({ theme }) => ({
		flex: "1",
		height: "24px",
		color: theme.palette.sysText.auxiliary,
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-between"
	})),
	autonomyIndicatorBar: styled(Box, { shouldForwardProp: (prop) => prop !== "autonomy" })<IAutonomy>(
		({ theme, autonomy }) => ({
			width: "100%",
			height: "4px",
			borderRadius: "2px",
			backgroundColor: getAutonomyColor(theme, autonomy).main
		})
	),
	twoAutonomyDescriptionContainer: styled(Box, { shouldForwardProp: (prop) => prop !== "autonomy" })<IAutonomy>(
		({ theme, autonomy }) => {
			const autonomyColors = getAutonomyColor(theme, autonomy);
			return {
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: autonomyColors.hover,
				color: autonomyColors.main,
				height: "24px"
			};
		}
	)
};
