import React from "react";
import { createTheme } from "@mui/material/styles";
import sysLightPalette from "./pallete";
import SysFonts from "./fonts";
import getSysComponentsStyles from "./components";

const getTheme = (options: { fontScale: number; darkMode: boolean }) => {
	const fontScale = options.fontScale || 1;
	const theme = createTheme({
		palette: sysLightPalette,
		typography: SysFonts.getTypography(fontScale),
		spacing: 8
	});

	return {
		...theme,
		components: getSysComponentsStyles(theme, fontScale)
	};
};

export default getTheme;
