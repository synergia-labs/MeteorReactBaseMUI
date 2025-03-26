import React, { ElementType } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { sisSizes } from "../../../../../../theme/sizes";

interface ISignInStyles {
	container: ElementType<BoxProps>;
	formContainer: ElementType<BoxProps>;
	externalLoginContainer: ElementType<BoxProps>;
}

const SignInStyles: ISignInStyles = {
	container: styled(Box)(({ theme }) => ({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: sisSizes(theme).spacingFixed.xl
	})),
	formContainer: styled(Box)({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: "16px"
	}),
	externalLoginContainer: styled(Box)({
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: "16px"
	})
};

export default SignInStyles;
