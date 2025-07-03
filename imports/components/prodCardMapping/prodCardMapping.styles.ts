import { Box, IconButton } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { sysSizes } from "/imports/theme/sizes";
import QuillText from "../prodQuillText/quillText";
import { enumDisplayOn } from "./prodCardMapping.context";

interface IDisplayConfig {
	displayOn: enumDisplayOn;
}

export default {
	container: styled(Box, { shouldForwardProp: (prop) => prop !== "displayOn" })<IDisplayConfig>(
		({ theme, displayOn }) =>
			displayOn === enumDisplayOn.SIMUL_MAPPING
				? {}
				: {
						borderRadius: sysSizes.spacingFixed.sm,
						border: `1px solid ${theme.palette.divider}`,
						background: theme.palette.divider,
						gap: "8px",
						padding: "16px",
						display: "flex",
						flexDirection: "column",
						backgroundColor: theme.palette.sysBackground.default
					}
	),
	divider: styled(Box)(({ theme }) => ({
		backgroundColor: theme.palette.divider,
		height: "1px"
	})),
	title: styled(QuillText)({
		fontSize: "16px"
	}),
	titleContainer: styled(Box)({
		display: "flex",
		justifyContent: "space-between",
		gap: sysSizes.spacingFixed.md
	}),
	titleSubContainer: styled(Box)({
		flex: "1",
		display: "flex",
		gap: sysSizes.spacingFixed.sm,
		alignItems: "center"
	}),
	titleSubContainerJustifyRight: styled(Box)({
		flex: "1",
		display: "flex",
		gap: sysSizes.spacingFixed.sm,
		alignItems: "center",
		justifyContent: "right"
	}),
	titleMultiMappingContainer: styled(Box)({
		flex: "1",
		display: "flex",
		flexDirection: "column",
		gap: sysSizes.spacingFixed.md
	}),
	titleMultiMappingDimensionNameContainer: styled(Box)({
		display: "flex",
		gap: sysSizes.spacingFixed.sm,
		alignItems: "center"
	}),
	mappingArea: styled(Box)({
		marginTop: sysSizes.spacingFixed.md,
		display: "flex",
		flexDirection: "column",
		gap: sysSizes.spacingFixed.sm
	}),
	retractedInfoContainer: styled(Box)({
		display: "flex",
		gap: sysSizes.spacingFixed.sm,
		alignItems: "center"
	}),
	header: styled(Box)(({ theme }) => ({
		display: "flex",
		justifyContent: "space-between",
		gap: sysSizes.spacingFixed.sm,
		background: theme.palette.sysBackground.default,
		padding: sysSizes.spacingFixed.sm
	})),
	headerSubContainer: styled(Box)({
		display: "flex",
		gap: sysSizes.spacingFixed.sm,
		alignItems: "center"
	}),
	dimensionsContainer: styled(Box)(({ theme }) => ({
		background: theme.palette.sysBackground.default,
		padding: sysSizes.spacingFixed.sm,
		display: "flex",
		gap: sysSizes.spacingFixed.md,
		[theme.breakpoints.down("md")]: {
			flexDirection: "column"
		}
	})),
	contentContainer: styled(Box)({
		display: "flex",
		flexDirection: "column",
		gap: sysSizes.spacingFixed.md
	}),
	dimensionsFragment: styled(Box)({
		flex: "1"
	}),
	quillText: styled(QuillText)({
		minWidth: "1em"
	}),
	description: styled(QuillText)({
		width: "100%",
		minHeight: "1em"
	}),
	grabButton: styled(IconButton)(({ theme }) => ({
		borderRadius: "8px",
		cursor: "grab",
		["&:active"]: {
			cursor: "grabbing",
			transform: "translateY(2px)",
			boxShadow: theme.shadows[4]
		},
		transition: "transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out",
		boxShadow: theme.shadows[2],
		["&:hover"]: {
			boxShadow: theme.shadows[3]
		}
	}))
};
