import React, { useCallback } from "react";
import { IconButtonProps } from "@mui/material";
import SysIcon, { ISysIconProps } from "../sysIcon/sysIcon";
import Styles from "./prodExpandButton.styles";

interface IProdExpandButton extends IconButtonProps {
	iconName?: string;
	customIcon?: React.FC<ISysIconProps>;
	expanded: boolean;
	setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProdExpandButton: React.FC<IProdExpandButton> = ({
	iconName,
	customIcon,
	expanded,
	setExpanded,
	...otherProps
}) => {
	const onExpandButtonClick = useCallback(() => setExpanded((expanded) => !expanded), [setExpanded]);
	const name = iconName ?? "expandMore";
	const sx = {
		transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
		transition: "transform 0.3s ease"
	};
	const CustomIcon = customIcon;

	return (
		<Styles.iconButton onClick={onExpandButtonClick} {...otherProps}>
			{CustomIcon ? <CustomIcon name={name} sx={sx} /> : <SysIcon name={name} sx={sx} />}
		</Styles.iconButton>
	);
};

export default ProdExpandButton;
