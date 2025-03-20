import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { SysSectionPaddingXY } from "/imports/ui/layoutComponents/sysLayoutComponents";
import { sysSizing } from "/imports/ui/materialui/styles";

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
		gap: sysSizing.spacingFixedMd
	})),
	filters: styled(Box)(({ theme }) => ({
		display: "flex",
		gap: sysSizing.spacingFixedMd,
		alignItems: "flex-end",
		width: "100%",
		maxWidth: "600px",
		marginBottom: sysSizing.spacingFixedMd,
		[theme.breakpoints.down("sm")]: { flexDirection: "column" }
	})),
	listContainer: styled(Box)({
		display: "flex",
		flexDirection: "column",
		gap: sysSizing.spacingFixedMd,
		padding: `${sysSizing.spacingFixedMd} 0`
	})
};

export default usersListStyles;
