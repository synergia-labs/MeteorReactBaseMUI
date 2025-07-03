import React, { ReactNode } from "react";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";

interface IParams extends Omit<TooltipProps, "title"> {
	text: ReactNode;
	backgroundColor?: string;
}

export default function TextTooltip({ text, backgroundColor, children, ...otherprops }: IParams) {
	return (
		<Tooltip
			{...otherprops}
			title={typeof text == "string" ? <span dangerouslySetInnerHTML={{ __html: text }} /> : text}
			componentsProps={{
				tooltip: {
					sx: {
						backgroundColor: (theme) => backgroundColor || theme.palette.darkBlue?.[900],
						borderRadius: "8px",
						fontWeight: 500,
						fontSize: "14px",
						padding: "8px 16px",
						boxShadow: "none",
						border: "none"
					}
				}
			}}>
			{children}
		</Tooltip>
	);
}
