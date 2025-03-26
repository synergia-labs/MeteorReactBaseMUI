import { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { sisSizes } from "../../../../theme/sizes";

interface ITemplateAppBarStyles {
	container: ElementType<BoxProps>;
	contentWrapper: ElementType<BoxProps>;
	contentContainer: ElementType<BoxProps>;
}

const TemplateAppBarStyles: ITemplateAppBarStyles = {
	container: styled(Box)({
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		justifyContent: "flex-start",
		width: "100vw",
		height: "100vh",
		overflow: "hidden"
	}),
	contentWrapper: styled(Box)({
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		flex: 1,
		overflow: "auto",
		position: "relative"
	}),
	contentContainer: styled(Box)({
		display: "flex",
		flexDirection: "column",
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		flex: 1,
		maxWidth: sisSizes().maxDisplayWidth
	})
};

export default TemplateAppBarStyles;
