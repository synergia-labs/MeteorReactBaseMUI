import React, { ElementType } from "react";
import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";
import SysSectionPaddingXY from "/imports/components/layoutComponents/sectionPaddingXY";

interface IStyles {
	container: ElementType<IContainer>;
	header: ElementType<BoxProps>;
	content: ElementType<BoxProps>;
	treeViewContainer: ElementType<BoxProps>;
	translateContent: ElementType<BoxProps>;
	translateContentHeader: ElementType<BoxProps>;
}

interface IContainer extends BoxProps {
	hasChanges: boolean;
}

const translatePageStyles: IStyles = {
	container: styled(SysSectionPaddingXY, {
		shouldForwardProp: (prop) => prop !== "hasChanges"
	})<IContainer>(({ theme, hasChanges }) => ({
		display: "flex",
		flexDirection: "column",
		gap: theme.spacing(4),
		width: "100%",
		height: "100%",
		...(hasChanges && { paddingBottom: theme.spacing(12) }),
		transition: "padding-bottom 0.3s ease-in-out"
	})),
	header: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: theme.spacing(10)
	})),
	content: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		alignItems: "stretch",
		borderTop: `1px solid ${theme.palette.divider}`,
		flexGrow: 1,
		maxHeight: "100%"
	})),
	treeViewContainer: styled(Box)(({ theme }) => ({
		padding: theme.spacing(2),
		paddingLeft: 0,
		display: "flex",
		flexDirection: "column",
		borderRight: `1px solid ${theme.palette.divider}`,
		flexShrink: 0,
		backgroundColor: theme.palette.sysBackground.bg2
	})),
	translateContent: styled(Box)(({ theme }) => ({
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		gap: theme.spacing(2),
		flexGrow: 1
	})),
	translateContentHeader: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing(2),
		padding: theme.spacing(1, 0),
		borderRadius: theme.shape.borderRadius * 3,
		backgroundColor: theme.palette.sysBackground.bg2,
		border: `1px solid ${theme.palette.divider}`
	}))
};

export default translatePageStyles;
