import React from "react";
import styled from "@mui/material/styles/styled";
import { sysSizes } from "/imports/theme/sizes";
import Box, { BoxProps } from "@mui/material/Box";

interface ISysSectionPaddingXYProps extends BoxProps {}

const SysSectionPaddingXY = styled(Box)<ISysSectionPaddingXYProps>(({ theme }) => ({
	padding: `${sysSizes.content.pt} ${sysSizes.content.px}`,
	[theme.breakpoints.down("md")]: {
		padding: `${sysSizes.content.pt} 5vw ${sysSizes.content.pb}`
	},
	[theme.breakpoints.down("sm")]: {
		padding: `${sysSizes.content.pt} ${sysSizes.spacingFixed.md} ${sysSizes.content.pb}`
	}
}));

export default SysSectionPaddingXY;
