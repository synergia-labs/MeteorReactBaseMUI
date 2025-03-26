import React from "react";
import styled from "@mui/material/styles/styled";
import { sysSizes } from "/imports/theme/sizes";
import Box, { BoxProps } from "@mui/material/Box";

interface ISysSectionPaddingYProps extends BoxProps {}

const SysSectionPaddingY = styled(Box)<ISysSectionPaddingYProps>(() => ({
	paddingTop: `${sysSizes.content.pt}`,
	paddingBottom: `${sysSizes.content.pb}`
}));

export default SysSectionPaddingY;
export { ISysSectionPaddingYProps };
