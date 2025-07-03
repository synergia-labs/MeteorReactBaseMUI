import React, { useState, useRef, MouseEvent, JSX, ReactNode } from "react";
import { Popper, ClickAwayListener, Paper, IconButton, PopperPlacementType } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RecursiveMenuItem from "./components/recurssiveMenu";
import { isComponent } from "/imports/libs/components/checkIfItsComponent";
import { nanoid } from "nanoid";
import { sysSizes } from "/imports/theme/sizes";

export interface ISubMenu {
	label: string;
	subLabel?: string;
	startComponent?: (passProps: any) => JSX.Element | React.ElementType;
	endComponent?: (passProps: any) => JSX.Element | React.ElementType;
	onClick?: (passProps: any) => void;
	dontCloseOnClick?: boolean;
	handleClose?: () => void;
	passProps?: any;
	disable?: boolean;
	subMenu?: Array<ISubMenu | ReactNode>;
	functionalities?: Array<string>;
	showDisabled?: boolean;
	isSelected?: boolean;
}

export interface IMultiMenu {
	menuIcon?: JSX.Element | React.ReactNode;
	initialState?: boolean;
	onCloseCallback?: () => void;
	passProps?: any;
	placement?: PopperPlacementType;
	options?: Array<ISubMenu | ReactNode>;
}

function ProdMultiMenu({ options, onCloseCallback, passProps, menuIcon, placement }: IMultiMenu) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);

	const buttonRef = useRef<HTMLButtonElement | null>(null);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
		setOpen((prev) => !prev);
	};

	const handleClose = () => {
		setOpen(false);
		onCloseCallback?.();
	};

	return (
		<>
			<IconButton
				ref={buttonRef}
				sx={{ position: "static", minWidth: "auto", minHeight: "auto", m: 0, p: 0.5 }}
				disableTouchRipple
				disableFocusRipple
				onClick={handleClick}>
				{!!menuIcon ? menuIcon : <MoreVertIcon />}
			</IconButton>

			<Popper open={open} anchorEl={anchorEl} placement={placement ?? "bottom-start"}>
				<ClickAwayListener onClickAway={handleClose}>
					<Paper
						sx={(theme) => ({
							display: "flex",
							flexDirection: "column",
							gap: sysSizes.spacingFixed.sm,
							borderRadius: sysSizes.radius.sm,
							backgroundColor: theme.palette.sysBackground.default,
							boxShadow: theme.shadows[4],
							padding: `${sysSizes.spacingFixed.md} 0px`,
							overflow: "hidden"
						})}>
						{options?.map((option, idx) => {
							return isComponent(option) ? (
								option
							) : (
								<RecursiveMenuItem
									key={`multiMenuItemMap${idx}` + nanoid()}
									item={option as ISubMenu}
									passProps={{ ...passProps, ...(option as ISubMenu).passProps }}
									onRootClose={handleClose}
								/>
							);
						})}
					</Paper>
				</ClickAwayListener>
			</Popper>
		</>
	);
}

export default React.memo(ProdMultiMenu, (prevProps, nextProps) => {
	return prevProps.initialState === nextProps.initialState && prevProps.options == nextProps.options;
});
