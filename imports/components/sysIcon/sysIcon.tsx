import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import materialSymbolsIcons, { MaterialSymbolsIconsNamesType } from "./materialSymbolsIcons";
import SysCustomIcon, { ICustomIconPropsType } from "./custom";

export interface ISysIconProps extends SvgIconProps {
	name: MaterialSymbolsIconsNamesType | ICustomIconPropsType | string;
}

const SysIcon: React.FC<ISysIconProps> = ({ name = "add", ...props }) => {
	return (
		<SvgIcon {...props}>
			{typeof name === "string" && name in SysCustomIcon ? (
				SysCustomIcon[name as keyof typeof SysCustomIcon]
			) : (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
					{typeof name === "string" && name in materialSymbolsIcons ? (
						<path d={materialSymbolsIcons[name as keyof typeof materialSymbolsIcons]} />
					) : null}
				</svg>
			)}
		</SvgIcon>
	);
};

export default SysIcon;
