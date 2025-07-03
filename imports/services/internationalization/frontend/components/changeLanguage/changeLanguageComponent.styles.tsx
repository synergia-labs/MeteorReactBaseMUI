import React, { ElementType } from "react";
import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";

interface IStyles {
	container: ElementType<BoxProps>;
}

const changeLanguageComponentStyles: IStyles = {
	container: styled(Box)({})
};

export default changeLanguageComponentStyles;
