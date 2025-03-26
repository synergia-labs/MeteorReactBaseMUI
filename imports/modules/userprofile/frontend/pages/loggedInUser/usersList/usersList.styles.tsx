import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { sysSizes } from "../../../../../../theme/sizes";
import SysSectionPaddingXY from "/imports/components/layoutComponents/sectionPaddingXY";

interface IStyles {
	container: ElementType<BoxProps>;
	filters: ElementType<BoxProps>;
	listContainer: ElementType<BoxProps>;
}

const usersListStyles: IStyles = {
	container: styled(SysSectionPaddingXY)(() => ({
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		width: "100%",
		gap: sysSizes.spacingFixed.md
	})),
	filters: styled(Box)(({ theme }) => ({
		display: "flex",
		gap: sysSizes.spacingFixed.md,
		alignItems: "flex-end",
		width: "100%",
		maxWidth: "600px",
		marginBottom: sysSizes.spacingFixed.md,
		[theme.breakpoints.down("sm")]: { flexDirection: "column" }
	})),
	listContainer: styled(Box)(() => ({
		display: "flex",
		flexDirection: "column",
		gap: sysSizes.spacingFixed.md,
		padding: `${sysSizes.spacingFixed.md} 0`
	}))
};

export default usersListStyles;
