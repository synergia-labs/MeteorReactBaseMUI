import { PaletColorWithHover, Theme } from "@mui/material";
import { enumAutonomy } from "../../enums/autonomy";

function getDefaultReturnFromColor(color: {
	main: string;
	light: string;
	dark: string;
	contrastText: string;
	hover?: string;
}) {
	return {
		main: color.main,
		light: color.light,
		dark: color.dark,
		contrastText: color.contrastText,
		hover: color.hover ?? color.main
	};
}
export default function getAutonomyColor(
	theme: Theme,
	autonomy: enumAutonomy = enumAutonomy.NONE
): { main: string; light: string; dark: string; contrastText: string } {
	return autonomy == enumAutonomy.HIGH
		? getDefaultReturnFromColor(theme.palette.highAutonomy)
		: autonomy == enumAutonomy.MEDIUM
			? getDefaultReturnFromColor(theme.palette.mediumAutonomy)
			: autonomy == enumAutonomy.LOW
				? getDefaultReturnFromColor(theme.palette.lowAutonomy)
				: autonomy == enumAutonomy.NONE
					? getDefaultReturnFromColor(theme.palette.inexperienced)
					: autonomy == enumAutonomy.NOT_MAP
						? getDefaultReturnFromColor(theme.palette.defaultAutonomy as PaletColorWithHover)
						: getDefaultReturnFromColor(theme.palette.defaultAutonomy as PaletColorWithHover);
}
