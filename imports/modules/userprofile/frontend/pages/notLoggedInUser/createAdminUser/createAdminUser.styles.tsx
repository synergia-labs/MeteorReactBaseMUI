import React, { ElementType } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { sysSizes } from "../../../../../../theme/sizes";

interface ISignInStyles {
	container: ElementType<BoxProps>;
	formContainer: ElementType<BoxProps>;
}

const CreateAdminUserStyles: ISignInStyles = {
	container: styled(Box)(() => ({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: sysSizes.spacingFixed.xl
	})),
	formContainer: styled(Box)({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: "16px"
	})
};

export default CreateAdminUserStyles;
