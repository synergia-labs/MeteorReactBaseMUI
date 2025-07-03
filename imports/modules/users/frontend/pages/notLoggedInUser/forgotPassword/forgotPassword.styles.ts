import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { sysSizes } from "../../../../../../theme/sizes";
import SysFormButton from "/imports/components/sysFormFields/sysFormButton/sysFormButton";
import { Button } from "@mui/material";

const forgotPasswordStyle = {
	container: styled(Box)(() => ({
		gap: sysSizes.spacingFixed.xl,
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	})),
	body: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: theme.spacing(2)
	})),
	footer: styled(Box)(() => ({
		width: "100%",
		display: "flex",
		alignItems: "center",
		gap: sysSizes.spacingFixed.md,
		justifyContent: "space-between"
	})),
	submitButton: styled(SysFormButton)({
		flex: "1",
		padding: sysSizes.spacingFixed.sm
	}),
	cancelButton: styled(Button)({
		flex: "1",
		padding: sysSizes.spacingFixed.sm
	})
};

export default forgotPasswordStyle;
