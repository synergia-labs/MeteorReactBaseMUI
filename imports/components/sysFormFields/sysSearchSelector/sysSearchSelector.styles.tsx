import React from "react";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Divider, IconButton, IconOwnProps } from "@mui/material";
import SysIcon from "../../sysIcon/sysIcon";
import { hasValue } from "/imports/libs/hasValue";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import { sysSizes } from "/imports/theme/sizes";

const Styles = {
	container: styled(Box)(({ theme }) => ({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		gap: theme.spacing(2),
		flexShrink: 0,
		position: "relative",
		height: "50px"
	})),
	input: {
		searchIcon: styled((props: IconOwnProps & { disabled?: boolean }) => <SysIcon {...props} name="search" />)(
			({ theme, disabled }) => ({
				width: "24px",
				height: "24px",
				transition: "color 0.3s ease",
				color: hasValue(disabled) && disabled ? theme.palette.grey[600] : undefined
			})
		),
		box: styled(Box)(({ theme }) => ({
			width: "100%",
			borderRadius: sysSizes.radius.sm,
			border: `1px solid ${theme.palette.divider}`
		})),
		cleanIcon: styled((props: IconOwnProps & { disabled?: boolean }) => <SysIcon {...props} name="close" />)(
			({ theme, disabled }) => ({
				width: "24px",
				height: "24px",
				transition: "color 0.3s ease",
				color: hasValue(disabled) && disabled ? theme.palette.grey[600] : undefined
			})
		),
		textField: styled((props: TextFieldProps) => <TextField {...props} />)(({ theme }) => ({
			"& .Mui-error": {
				borderColor: "red"
			},
			"& .MuiFilledInput-input": {
				border: "none",
				padding: `4px 0`,
				color: theme.palette.sysText.body
			}
		}))
	},
	create: {
		button: styled(Button)(() => ({
			padding: `${sysSizes.components.buttonSmallPy}, ${sysSizes.components.buttonSmallPx}`,
			margin: 0,
			alignSelf: "flex-start"
		})),
		icon: styled((props: IconOwnProps) => <SysIcon {...props} name="add" />)(() => ({}))
	},
	list: {
		container: styled(Box)(({ theme }) => ({
			display: "flex",
			flexDirection: "column",
			width: "100%",
			position: "absolute",
			top: "calc(100%)",
			borderRadius: sysSizes.radius.sm,
			backgroundColor: theme.palette.sysBackground.default,
			left: 0,
			zIndex: "99",
			boxShadow: theme.shadows[4],
			minHeight: "150px",
			justifyContent: "center"
		})),
		divider: styled(Divider)(() => ({})),
		header: {
			container: styled(Box)(() => ({
				padding: `${sysSizes.spacingFixed.md} ${sysSizes.spacingFixed.lg}`
			})),
			text: styled(Typography)(({ theme }) => ({
				color: theme.palette.sysText.disabled2
			}))
		},
		body: {
			container: styled(Box)(({}) => ({
				overflowY: "auto",
				maxHeight: "312px",
				padding: `${sysSizes.spacingRem.md} 0`,
				gap: sysSizes.spacingFixed.sm
			})),
			item: {
				container: styled(Box)(({ theme }) => ({
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					gap: sysSizes.spacingRem.sm,
					alignSelf: "stretch",
					padding: `${sysSizes.spacingRem.sm} ${sysSizes.spacingFixed.lg}`,
					backgroundColor: theme.palette.sysBackground.bg1,
					borderRadius: sysSizes.radius.sm
				})),
				img: styled(Avatar)(({ theme }) => ({
					width: "24px",
					height: "24px",
					marginRight: theme.spacing(1),
					backgroundColor: theme.palette.primary.main,
					color: theme.palette.common.white
				})),
				checkbox: styled(Checkbox)(({ theme }) => ({
					color: theme.palette.sysAction.primary,
					width: sysSizes.components.iconSize,
					height: sysSizes.components.iconSize
				})),
				text: styled(Typography)(({ theme }) => ({
					textOverflow: "ellipsis",
					textWrap: "nowrap",
					overflow: "hidden",
					flexGrow: 1,
					color: theme.palette.sysText.body
				})),
				option: styled(IconButton)(() => ({})),
				remove: styled((props: IconOwnProps) => <SysIcon {...props} name="close" />)(() => ({}))
			},
			footer: {
				container: styled(Box)(() => ({
					width: "100%",
					display: "flex",
					justifyContent: "center"
				})),
				button: styled(Button)(() => ({})),
				icon: styled((props: IconOwnProps) => <SysIcon {...props} name="addCircle" />)(() => ({}))
			},
			emptyText: styled(Typography)(({ theme }) => ({
				width: "100%",
				color: theme.palette.sysText.body,
				justifyContent: "center",
				display: "flex"
			}))
		}
	},
	textFieldContainer: styled(Box)({
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "100%",
		position: "relative"
	}),
	functionsWrapper: styled(Box)(({ theme }) => ({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		gap: theme.spacing(3)
	})),
	functionsContainer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		width: "100%",
		gap: theme.spacing(2)
	})),
	footer: styled(Box)(({ theme }) => ({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		gap: sysSizes.spacingFixed.sm,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		padding: theme.spacing(1)
	}))
};

export default Styles;
