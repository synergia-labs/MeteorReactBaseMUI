import React from "react";
import styled from "@mui/material/styles/styled";
import { getSysSizes } from "/imports/theme/sizes";
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
		paddingLeft: `${getSysSizes(theme).spacingFixed.md}`,
		paddingRight: `${getSysSizes(theme).spacingFixed.md}`
	}
}));

export default SysSectionPaddingX;
export { ISysSectionPaddingXProps };
