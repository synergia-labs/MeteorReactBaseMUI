import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { nanoid } from "nanoid";
import React from "react";
import { sysSizes } from "/imports/theme/sizes";

interface IParams {
	title?: string;
	lines?: Array<string>;
	placement?: "top" | "bottom" | "left" | "right";
	children: React.ReactElement;
	maxWidth?: number;
}
export default function ProdCleanTooltip({ title, lines, placement = "bottom", children, maxWidth = 240 }: IParams) {
	return (
		<Tooltip
			disableInteractive
			componentsProps={{
				tooltip: {
					sx: (theme) => ({
						border: "none",
						padding: sysSizes.spacingRem.sm,
						backgroundColor: theme.palette.sysBackground.default,
						color: theme.palette.sysText.title,
						display: "flex",
						flexDirection: "column",
						maxWidth: `${maxWidth}px`
					})
				}
			}}
			slotProps={{
				popper: {
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, -8]
							}
						}
					]
				}
			}}
			placement={placement}
			title={
				<React.Fragment>
					{title && (
						<Typography variant="caption2" sx={{ marginBottom: sysSizes.spacingFixed.sm }}>
							{title}
						</Typography>
					)}
					{lines?.map((line, index) => (
						<Typography key={index + nanoid()} variant="caption1">
							{line}
						</Typography>
					))}
				</React.Fragment>
			}>
			{children}
		</Tooltip>
	);
}
