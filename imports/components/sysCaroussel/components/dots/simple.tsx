import React from "react";
import { Box, styled } from "@mui/material";
import { sysSizes } from "/imports/theme/sizes";

const Container = styled(Box)({
	width: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	overflow: "hidden",
	gap: sysSizes.spacingFixed.sm
});

const Dot = styled(Box, {
	shouldForwardProp: (prop) => !["size", "isSelected", "disabled", "expanded"].includes(prop as string)
})<{ size?: number; isSelected: boolean; disabled: boolean; expanded: boolean }>(
	({ expanded, size, isSelected, disabled, theme }) => ({
		width: expanded ? "40px" : size || "8px",
		height: expanded ? "6px" : size || "8px",
		backgroundColor: disabled
			? theme.palette.sysAction.disabled
			: isSelected
				? theme.palette.sysAction.auxiliary
				: theme.palette.sysBackground.bg2,
		borderRadius: sysSizes.radius.md,
		cursor: isSelected || disabled ? "default" : "pointer",
		opacity: disabled ? 0.8 : 1,
		transition: "all 0.2s ease-in-out",
		["&:hover"]: {
			backgroundColor: disabled
				? theme.palette.sysBackground.bg2
				: isSelected
					? theme.palette.sysAction.auxiliary
					: theme.palette.sysAction.primary
		}
	})
);

interface IProps {
	onClick: (index: number, e?: React.MouseEvent | React.KeyboardEvent) => void;
	selectedIndex: number;
	size: number;
	dotSize?: number;
	disabled?: boolean;
	expanded?: boolean;
}

export default function SysCarousselSimpleDots({
	onClick,
	selectedIndex,
	size,
	dotSize,
	disabled,
	expanded = false
}: IProps) {
	return (
		<Container>
			{Array.from({ length: size }, (_, index) => (
				<Dot
					key={index}
					size={dotSize}
					isSelected={index === selectedIndex}
					disabled={disabled || false}
					expanded={expanded || false}
					onClick={disabled ? undefined : (e) => onClick(index, e)}
					tabIndex={0}
					role="button"
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							onClick(index, e);
						}
					}}
				/>
			))}
		</Container>
	);
}
