import React from "react";
import styled from "@mui/material/styles/styled";
import Typography, { TypographyProps } from "@mui/material/Typography";

interface ISysTextOverflow extends Omit<TypographyProps, "ref"> {
	maxLines?: number;
}

const SysTextOverflow = styled(Typography, {
	shouldForwardProp: (prop) => prop !== "maxLines"
})<ISysTextOverflow>(({ maxLines }) => ({
	...(!!maxLines && {
		display: "-webkit-box",
		WebkitLineClamp: maxLines,
		WebkitBoxOrient: "vertical",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "normal",
		wordBreak: "break-word",
		overflowWrap: "break-word"
	})
}));

export default SysTextOverflow;
export { ISysTextOverflow };
