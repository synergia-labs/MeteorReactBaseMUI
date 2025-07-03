import React from "react";
import { IconButton, IconButtonProps } from "@mui/material";
import SysIcon from "/imports/components/sysIcon/sysIcon";

interface IProps extends IconButtonProps {
	direction: "left" | "right";
	absolute?: boolean;
}

export default function CarrouselMiniArrow({ direction, absolute = false, ...props }: IProps) {
	const isRight = direction === "right";
	const sx = absolute
		? {
				position: "absolute",
				[isRight ? "right" : "left"]: 0,
				top: "50%",
				transform: "translateY(-50%)",
				padding: 0,
				margin: 0,
				width: "24px",
				height: "24px",
				zIndex: 2
			}
		: undefined;

	return (
		<IconButton {...props} sx={props.sx || sx} disabled={props.disabled}>
			<SysIcon name={isRight ? "arrowRight" : "arrowLeft"} sx={{ width: "24px", height: "24px" }} />
		</IconButton>
	);
}
