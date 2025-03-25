import React from "react";

import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { SvgIconProps } from "@mui/material";
import { FilesViewType } from "../../acceptableTypes";
import { sysSizing } from "/imports/ui/materialui/styles";
import SysIcon from "../../../../sysIcon/sysIcon";

interface ISysUploadFileStyle {
	withIcons: {
		iconCircleBox: React.ComponentType<ICardStyle>;
		cardInfo: React.ComponentType<ICardStyle>;
		iconsGroup: React.ComponentType<ICardStyle>;
	};
	individualCard: {
		container: React.ComponentType<IImageCard>;
		body: React.ComponentType<BoxProps>;
		alt: React.ComponentType<TypographyProps>;
	};
	card: React.ComponentType<ICardStyle>;
	title: React.ComponentType<TypographyProps>;
	subtitle: React.ComponentType<TypographyProps>;
	deleteIcon: React.ComponentType<IDeleteIcon>;
}
interface ICardStyle extends BoxProps {
	typeview: FilesViewType;
}
interface IDeleteIcon extends SvgIconProps {
	canedit: string;
	typeview: FilesViewType;
	withposition?: string;
}
interface IImageCard extends BoxProps {
	url?: string;
	canedit: string;
}

const SysUploadFileStyle: ISysUploadFileStyle = {
	card: styled(Box)<ICardStyle>(({ theme, typeview }) => ({
		display: typeview == "column" ? "flex" : "block",
		width: typeview == "column" ? "100%" : typeview == "row" ? "150px" : "auto",
		mimWidth: "150px",
		justifyContent: "space-between",
		alignContent: "center",
		justifyItems: "center",
		alignItems: "center",
		gap: sysSizing.spacingRemMd,
		padding: sysSizing.spacingRemMd,
		backgroundColor: theme.palette.background.default,
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: sysSizing.radiusSm,
		position: "relative"
	})),

	deleteIcon: styled((props: IDeleteIcon) => <SysIcon {...props} name="delete" />)(
		({ theme, canedit = "false", typeview = "row", withposition = "true" }) => ({
			...(withposition === "true" && {
				position: "absolute",
				right: 0,
				top: typeview === "column" ? "40%" : "0",
				transform: typeview === "column" ? "translateY(-50%)" : "translateY(10%)"
			}),
			cursor: canedit === "true" ? "pointer" : "default",
			display: canedit === "true" ? "block" : "none",
			color: theme.palette.primary.main,
			margin: theme.spacing(1)
		})
	),

	title: styled(Typography)(({ theme }) => ({
		flexGrow: 1,
		textWrap: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		fontWeight: "bold",
		color: theme.palette.sysAction?.primary
	})),

	subtitle: styled(Typography)(({ theme }) => ({
		flexGrow: 1,
		textWrap: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		color: theme.palette.sysText?.auxiliary
	})),

	withIcons: {
		iconCircleBox: styled(Box)(({ theme }) => ({
			width: "48px",
			height: "48px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			borderRadius: "50%",
			background: theme.palette.sysBackground?.bg1
		})),

		cardInfo: styled(Box)<ICardStyle>(({ typeview }) => ({
			display: "block",
			width: "100%",
			gap: sysSizing.spacingRemXs,
			marginTop: typeview == "column" ? "0" : "10px",
			marginRight: typeview == "column" ? "25px" : "0"
		})),

		iconsGroup: styled(Box)(() => ({
			display: "flex",
			justifyContent: "space-between"
		}))
	},
	individualCard: {
		container: styled(Box)<IImageCard>(({ theme, url, canedit }) => ({
			position: "relative",
			width: "300px",
			height: canedit == "true" ? "210px" : "169px",
			borderRadius: sysSizing.radiusSm,
			border: `1px solid ${theme.palette.divider}`,
			backgroundColor: theme.palette.sysAction?.primaryHover,
			backgroundImage: `url(${url})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			alignContent: canedit == "true" ? "end" : "center",
			overflow: "hidden"
		})),
		body: styled(Box)(({ theme }) => ({
			display: "flex",
			height: "42px",
			padding: sysSizing.componentsButtonSmallPy,
			width: "100%",
			backgroundColor: theme.palette.sysBackground?.default,
			justifyContent: "center",
			alignItems: "center"
		})),
		alt: styled(Typography)(({ theme }) => ({
			flexGrow: 1,
			textWrap: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
			fontWeight: "bold",
			color: theme.palette.common.white,
			textAlign: "center",
			margin: "auto"
		}))
	}
};

export default SysUploadFileStyle;
