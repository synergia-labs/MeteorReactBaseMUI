import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { sisSizes } from "../../../../../../theme/sizes";
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
		gap: sisSizes(theme).spacingFixed.md
	})),
	filters: styled(Box)(({ theme }) => ({
		display: "flex",
		gap: sisSizes(theme).spacingFixed.md,
		alignItems: "flex-end",
		width: "100%",
		maxWidth: "600px",
		marginBottom: sisSizes(theme).spacingFixed.md,
		[theme.breakpoints.down("sm")]: { flexDirection: "column" }
	})),
	listContainer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		gap: sisSizes(theme).spacingFixed.md,
		padding: `${sisSizes(theme).spacingFixed.md} 0`
	}))
};

export default usersListStyles;
