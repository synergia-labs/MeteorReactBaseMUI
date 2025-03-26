import React from "react";
import styled from "@mui/material/styles/styled";
import { sisSizes } from "/imports/theme/sizes";
import Box, { BoxProps } from "@mui/material/Box";

interface ISysSectionPaddingXYProps extends BoxProps {}

const SysSectionPaddingXY = styled(Box)<ISysSectionPaddingXYProps>(({ theme }) => ({
	padding: `${sisSizes(theme).content.pt} ${sisSizes(theme).content.px}`,
	[theme.breakpoints.down("md")]: {
		padding: `${sisSizes(theme).content.pt} 5vw ${sisSizes(theme).content.pb}`
	},
	[theme.breakpoints.down("sm")]: {
		padding: `${sisSizes(theme).content.pt} ${sisSizes(theme).spacingFixed.md} ${sisSizes(theme).content.pb}`
	}
}));

export default SysSectionPaddingXY;
