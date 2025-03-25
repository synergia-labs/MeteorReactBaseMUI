import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { getSysSizes } from "../../../../../../theme/sizes";
import SysSectionPaddingXY from "/imports/components/layoutComponents/sectionPaddingXY";

interface IStyles {
	container: ElementType<BoxProps>;
	filters: ElementType<BoxProps>;
	listContainer: ElementType<BoxProps>;
}

const usersListStyles: IStyles = {
	container: styled(SysSectionPaddingXY)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		width: "100%",
		gap: getSysSizes(theme).spacingFixed.md
	})),
	filters: styled(Box)(({ theme }) => ({
		display: "flex",
		gap: getSysSizes(theme).spacingFixed.md,
		alignItems: "flex-end",
		width: "100%",
		maxWidth: "600px",
		marginBottom: getSysSizes(theme).spacingFixed.md,
		[theme.breakpoints.down("sm")]: { flexDirection: "column" }
	})),
	listContainer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		gap: getSysSizes(theme).spacingFixed.md,
		padding: `${getSysSizes(theme).spacingFixed.md} 0`
	}))
};

export default usersListStyles;
