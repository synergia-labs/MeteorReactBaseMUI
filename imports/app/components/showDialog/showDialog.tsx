import React, { FC, ReactNode, useEffect } from "react";
import { ISysGeneralComponentsCommon } from "/imports/typings/BoilerplateDefaultTypings";
import Box from "@mui/material/Box";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import { Theme, SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { DialogContentStyled } from "./showDialogStyles";
import { DialogTransitions } from "../transitions";
import { MemoryRouter } from "react-router-dom";
import { AppRouterSwitch } from "../../routes/components/appRouterSwitch";
import Styles from "./showDialogStyles";
import { sysSizing } from "../../../ui/materialui/styles";
import { Button, ButtonProps } from "@mui/material";

export interface IShowDialogProps extends ISysGeneralComponentsCommon, Omit<DialogProps, "open" | "title"> {
	open?: boolean;
	close?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
	onOpen?: () => void;
	onClose?: () => void;
	title?: ReactNode;
	prefixIcon?: ReactNode;
	sufixIcon?: ReactNode;
	message?: string;
	header?: ReactNode;
	body?: ReactNode;
	actions?: ReactNode;
	sx?: SxProps<Theme>;
	backgroundSx?: SxProps<Theme>;
	fullScreen?: boolean;
	fullScreenMediaQuery?: "xs" | "sm" | "md" | "lg" | "xl";
	transition?: "slide" | "grow" | "zoom" | "fade";
	urlPath?: string;
	children?: ReactNode;
	confirmButtonLabel?: string;
	cancelButtonLabel?: string;
	confirmButtonProps?: ButtonProps;
	cancelButtonProps?: ButtonProps;
	closeOnConfirm?: boolean;
}

export const ShowDialog: FC<IShowDialogProps> = ({
	open,
	close,
	title,
	message,
	header,
	prefixIcon,
	sufixIcon,
	body,
	actions,
	duration,
	sx,
	backgroundSx,
	fullScreen,
	fullScreenMediaQuery,
	transition,
	children,
	urlPath,
	confirmButtonLabel,
	cancelButtonLabel,
	confirmButtonProps,
	cancelButtonProps,
	closeOnConfirm = true,
	...dialogProps
}: IShowDialogProps) => {
	useEffect(() => {
		if (!duration) return;
		let timer: number | undefined;
		if (open && duration) timer = window.setTimeout(() => close?.({}, "backdropClick"), duration);
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [open]);

	const theme = useTheme();
	const isFullScreen = useMediaQuery(theme.breakpoints.down(fullScreenMediaQuery ?? "xs"));

	const closeDialog = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		close?.({}, "backdropClick");
		cancelButtonProps?.onClick?.(e);
		dialogProps.onClose?.();
	};

	const onConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		confirmButtonProps?.onClick?.(e);
		if (!closeOnConfirm) return;
		close?.({}, "backdropClick");
		dialogProps.onClose?.();
	};

	return (
		<Dialog
			{...dialogProps}
			open={open ?? false}
			onClose={closeDialog}
			TransitionComponent={DialogTransitions(transition ?? "zoom")}
			PaperProps={dialogProps.PaperProps ?? { sx: { borderRadius: sysSizing.radiusLg, ...sx } }}
			sx={backgroundSx}
			fullScreen={fullScreen || (!!fullScreenMediaQuery && isFullScreen)}>
			{urlPath ? (
				<DialogContentStyled>
					<MemoryRouter initialEntries={[urlPath]} initialIndex={0}>
						<AppRouterSwitch />
					</MemoryRouter>
				</DialogContentStyled>
			) : (
				children || (
					<Styles.container>
						<Styles.messageContent>
							{header || (
								<Styles.header>
									{prefixIcon && prefixIcon}
									{typeof title === "string" ? (
										<Typography variant="subtitle1" color={(theme) => theme.palette.sysText?.body}>
											{title}
										</Typography>
									) : (
										title
									)}
									<Box flexGrow={1} />
									{sufixIcon && sufixIcon}
								</Styles.header>
							)}
							{body || (message && <Typography color={(theme) => theme.palette.sysText?.auxiliary}>{message}</Typography>)}
						</Styles.messageContent>
						{actions ||
							((confirmButtonLabel || cancelButtonLabel) && (
								<Styles.footer>
									{cancelButtonLabel && (
										<Button variant="outlined" size="small" {...cancelButtonProps} onClick={closeDialog}>
											{cancelButtonLabel}
										</Button>
									)}
									{confirmButtonLabel && (
										<Button variant="contained" size="small" {...confirmButtonProps} onClick={onConfirm}>
											{confirmButtonLabel}
										</Button>
									)}
								</Styles.footer>
							))}
					</Styles.container>
				)
			)}
		</Dialog>
	);
};
