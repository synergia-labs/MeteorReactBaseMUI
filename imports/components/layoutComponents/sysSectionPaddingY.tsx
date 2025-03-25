import React from "react";
import styled from "@mui/material/styles/styled";
import { getSysSizes } from "/imports/theme/sizes";
import Box, { BoxProps } from "@mui/material/Box";

interface ISysSectionPaddingYProps extends BoxProps {}

const SysSectionPaddingY = styled(Box)<ISysSectionPaddingYProps>(({ theme }) => ({
	paddingTop: `${getSysSizes(theme).content.pt}`,
	paddingBottom: `${getSysSizes(theme).content.pb}`
}));

export default SysSectionPaddingY;
export { ISysSectionPaddingYProps };
