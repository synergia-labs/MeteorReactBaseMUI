import { Box, BoxProps, Typography } from "@mui/material";
import styled from "@mui/material/styles/styled";
import getAutonomyColor from "/imports/libs/autonomy/getAutonomyColor";
import { autonomyNumberToEnum } from "/imports/libs/autonomy/autonomyNumberToEnum";

interface IMappingSelector extends BoxProps {
	autonomy: number | undefined;
}

export default {
	container: styled(Box)({
		display: "flex",
		flex: "1",
		height: "24px",
		alignItems: "center"
	}),
	selector: styled(Box)<IMappingSelector>(({ theme, autonomy }) => ({
		minHeight: "8px",
		flex: "1",
		backgroundColor: getAutonomyColor(theme, autonomyNumberToEnum(autonomy)).main,
		borderRadius: "99999px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		transition: "transform 0.15s ease, box-shadow 0.2s ease",
		["&:hover"]: {
			transform: "scale(1.05)",
			boxShadow: `0 0 4px 2px ${getAutonomyColor(theme, autonomyNumberToEnum(autonomy)).main}`
		},
		["&:active"]: {
			transform: "scale(0.97)",
			boxShadow: `inset 0 0 6px ${getAutonomyColor(theme, autonomyNumberToEnum(autonomy)).dark}`
		}
	})),
	subAutonomyIndicator: styled(Typography)<IMappingSelector>(({ theme, autonomy }) => ({
		color: getAutonomyColor(theme, autonomyNumberToEnum(autonomy)).contrastText
	}))
};
