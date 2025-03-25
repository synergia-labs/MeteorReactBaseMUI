import React from "react";
import styled from "@mui/material/styles/styled";
import { getSysSizes } from "/imports/theme/sizes";
import Box, { BoxProps } from "@mui/material/Box";

interface ISysSectionPaddingXYProps extends BoxProps {}

const SysSectionPaddingXY = styled(Box)<ISysSectionPaddingXYProps>(({ theme }) => ({
	padding: `${getSysSizes(theme).content.pt} ${getSysSizes(theme).content.px}`,
	[theme.breakpoints.down("md")]: {
		padding: `${getSysSizes(theme).content.pt} 5vw ${getSysSizes(theme).content.pb}`
	},
	[theme.breakpoints.down("sm")]: {
		padding: `${getSysSizes(theme).content.pt} ${getSysSizes(theme).spacingFixed.md} ${getSysSizes(theme).content.pb}`
	}
}));

export default SysSectionPaddingXY;
