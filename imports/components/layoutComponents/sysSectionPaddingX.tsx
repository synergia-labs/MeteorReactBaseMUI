import React from "react";
import styled from "@mui/material/styles/styled";
import { sysSizes } from "/imports/theme/sizes";
import Box, { BoxProps } from "@mui/material/Box";

interface ISysSectionPaddingXProps extends BoxProps {}

const SysSectionPaddingX = styled(Box)<ISysSectionPaddingXProps>(({ theme }) => ({
	paddingLeft: "10vw",
	paddingRight: "10vw",
	[theme.breakpoints.down("md")]: {
		paddingLeft: "5vw",
		paddingRight: "5vw"
	},
	[theme.breakpoints.down("sm")]: {
		paddingLeft: `${sysSizes.spacingFixed.md}`,
		paddingRight: `${sysSizes.spacingFixed.md}`
	}
}));

export default SysSectionPaddingX;
export { ISysSectionPaddingXProps };
