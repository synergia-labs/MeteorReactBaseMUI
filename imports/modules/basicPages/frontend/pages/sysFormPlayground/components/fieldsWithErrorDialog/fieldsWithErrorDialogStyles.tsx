import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { ElementType } from "react";
import { sisSizes } from "../../../../../../../theme/sizes";

interface IFieldsWithErrorDialog {
	Container: ElementType<BoxProps>;
	Header: ElementType<BoxProps>;
	Body: ElementType<BoxProps>;
}

const FieldsWithErrorDialogStyles: IFieldsWithErrorDialog = {
	Container: styled(Box)({
		display: "flex",
		flexDirection: "column",
		gap: "16px",
		minWidth: "500px",
		minHeight: "300px",
		padding: "16px"
	}),
	Header: styled(Box)({
		display: "flex",
		flexDirection: "row",
		gap: "16px",
		justifyContent: "space-between"
	}),
	Body: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		borderRadius: sisSizes(theme).radius.md,
		backgroundColor: theme.palette.sysAction?.primaryBgHover,
		padding: sisSizes(theme).spacingFixed.md
	}))
};

export default FieldsWithErrorDialogStyles;
