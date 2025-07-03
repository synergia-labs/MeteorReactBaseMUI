import React, { ElementType } from "react";
import {
	styled,
	Box,
	BoxProps,
	svgIconClasses,
	ButtonProps,
	Button,
	TextFieldProps,
	TextField,
	inputBaseClasses
} from "@mui/material";
import { sysSizes } from "/imports/theme/sizes";

interface IStyles {
	container: ElementType<BoxProps>;
	button: ElementType<ButtonProps>;
	textField: ElementType<TextFieldProps>;
}

const SysNumberCounterStyles: IStyles = {
	container: styled(Box)({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		gap: "9px",
		[`& .${svgIconClasses.root}`]: {
			width: sysSizes.components.iconSizeSmall,
			height: sysSizes.components.iconSizeSmall
		}
	}),

	button: styled(Button)({
		width: "50px",
		height: "34px"
	}),

	textField: styled(TextField)({
		width: "60px",
		[`& .${inputBaseClasses.input}`]: {
			textAlign: "center"
		}
	})
};

export default SysNumberCounterStyles;
