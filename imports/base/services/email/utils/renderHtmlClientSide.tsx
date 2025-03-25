import React, { ReactNode } from "react";
import { getTheme } from "/imports/ui/materialui/theme";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { render } from "@react-email/render";

const theme = getTheme({ darkMode: false, fontScale: 1 });

const renderHtmlClientSide = async (element: ReactNode): Promise<string> => {
	const ElementWithTeme = (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{element}
		</ThemeProvider>
	);

	const html = await render(ElementWithTeme);
	return html;
};

export default renderHtmlClientSide;
