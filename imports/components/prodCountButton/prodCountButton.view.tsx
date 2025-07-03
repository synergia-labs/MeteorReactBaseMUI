import React from "react";
import { MaterialSymbolsIconsNamesType } from "../sysIcon/materialSymbolsIcons";
import Styles from "./prodCountButton.styles";

interface IProdCountButtonProps {
	count?: number;
	defaultCountValue?: string;
	onClick?: () => void;
	iconName: MaterialSymbolsIconsNamesType;
	variant?: "primary" | "secondary" | "disabled";
	disabled?: boolean;
}
export default function ProdCountButton({
	disabled,
	defaultCountValue = "0",
	count,
	onClick,
	iconName,
	variant = "primary"
}: IProdCountButtonProps) {
	disabled = disabled || variant === "disabled";
	return (
		<Styles.container variant={variant} onClick={onClick} disabled={disabled}>
			<Styles.icon name={iconName} />
			<Styles.label variant="caption2">{count || defaultCountValue}</Styles.label>
		</Styles.container>
	);
}
