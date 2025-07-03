import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { sysSizes } from "../../../../theme/sizes";

interface IBackground extends BoxProps {
	source: string;
}

export default {
	container: styled(Box, { shouldForwardProp: (prop) => prop !== "source" })<IBackground>(({ theme, source }) => ({
		minHeight: "100vh",
		width: "100%",
		display: "flex",
		alignItems: "center",
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		backgroundImage: `url(${source})`,
		backgroundPosition: "left",
		backgroundSize: "cover",
		[theme.breakpoints.down("sm")]: {
			justifyContent: "center"
		}
	})),
	content: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		gap: theme.spacing(6),
		margin: `${sysSizes.spacingFixed.lg} ${sysSizes.spacingFixed.xl}`,
		marginLeft: "10%",
		width: "352px",
		height: "auto",
		[theme.breakpoints.down("sm")]: {
			margin: theme.spacing(2)
		}
	})),
	formContainer: styled(Paper)(({ theme }) => ({
		width: "100%",
		padding: theme.spacing(4, 4),
		borderRadius: "12px",
		boxShadow: theme.shadows[3],
		gap: sysSizes.spacingFixed.xl,
		color: theme.palette.primary.main
	}))
};
