import React from "react";
import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";

interface IStyleProps {
	container: React.ElementType<BoxProps>;
}

const Style: IStyleProps = {
	container: styled(Box)({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: "auto",
		height: "100%"
	})
};

export default Style;
