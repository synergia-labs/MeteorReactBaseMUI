import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { sysSizes } from "../../../../../../theme/sizes";
import { Button, Typography } from "@mui/material";

export default {
	loginMicrosoftAzureContainer: styled(Box)({
		minHeight: "80px",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center"
	}),
	welcome: styled(Typography)(({ theme }) => ({
		fontSize: "20px",
		fontWeight: "500",
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(0.5),
		color: theme.palette.primary.main
	})),
	subWelcome: styled(Typography)(({ theme }) => ({
		fontSize: "12px",
		fontWeight: "400",
		color: theme.palette.primary.main,
		marginBottom: theme.spacing(4)
	})),
	formWrapper: styled(Box)(({ theme }) => ({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		gap: theme.spacing(2)
	})),
	forgotPassword: styled(Button)(({ theme }) => ({
		color: theme.palette.primary.light,
		marginLeft: theme.spacing(-1),
		fontSize: "14px",
		paddingInline: sysSizes.spacingFixed.sm,
		fontWeight: "400"
	})),
	externalLoginContainer: styled(Box)({
		marginTop: sysSizes.spacingFixed.lg,
		display: "flex",
		gap: sysSizes.spacingFixed.md,
		flexWrap: "wrap",
		justifyContent: "center"
	})
};
