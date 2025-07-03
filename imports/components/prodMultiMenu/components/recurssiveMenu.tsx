import React, { useState, MouseEvent } from "react";
import { Popper, Paper } from "@mui/material";
import { ISubMenu } from "../multiMenu";
import { MenuItemT } from "./menuItemT";
import { nanoid } from "nanoid";
import { isComponent } from "/imports/libs/components/checkIfItsComponent";
import { sysSizes } from "/imports/theme/sizes";
import { RenderWithPermission } from "/imports/services/security/frontend/components/renderWithPermission";

function RecursiveMenuItem({
	item,
	passProps,
	onRootClose
}: {
	item: ISubMenu;
	passProps?: any;
	onRootClose: () => void;
}) {
	const [subAnchorEl, setSubAnchorEl] = useState<null | HTMLElement>(null);
	const [subOpen, setSubOpen] = useState(false);

	const handleEnter = (event: MouseEvent<HTMLElement>) => {
		if (!item.subMenu?.length || item.disable) return;
		setSubAnchorEl(event.currentTarget);
		setSubOpen(true);
	};

	const handleLeave = () => {
		if (!item.subMenu?.length || item.disable) return;
		setSubOpen(false);
	};

	const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		if (!item.dontCloseOnClick) setTimeout(() => onRootClose(), 300);
		item.onClick?.({ ...passProps, ...item.passProps });
		e?.preventDefault();
	};

	return (
		<div onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
			<RenderWithPermission functionalities={item.functionalities ?? []} fallback={<MenuItemT {...item} disable={true} />}>
				<MenuItemT
					{...item}
					onClick={handleClick}
					passProps={{ ...passProps, ...item.passProps }}
					hasSub={!!item.subMenu?.length}
				/>

				{item.subMenu && (
					<Popper
						open={subOpen}
						anchorEl={subAnchorEl}
						placement="right-start"
						modifiers={[{ name: "offset", options: { offset: [0, 0] } }]}>
						<Paper
							// elevation={2}
							sx={(theme) => ({
								display: "flex",
								flexDirection: "column",
								gap: sysSizes.spacingFixed.sm,
								borderRadius: sysSizes.radius.sm,
								backgroundColor: theme.palette.sysBackground.default,
								boxShadow: theme.shadows[4],
								overflow: "hidden",
								padding: `${sysSizes.spacingFixed.md} 0px`
							})}>
							{item.subMenu.map((sub, i) =>
								isComponent(sub) ? (
									<>sub</>
								) : (
									<RecursiveMenuItem
										key={i + nanoid()}
										item={sub as ISubMenu}
										passProps={{ ...passProps, ...item.passProps }}
										onRootClose={onRootClose}
									/>
								)
							)}
						</Paper>
					</Popper>
				)}
			</RenderWithPermission>
		</div>
	);
}

export default React.memo(RecursiveMenuItem);
