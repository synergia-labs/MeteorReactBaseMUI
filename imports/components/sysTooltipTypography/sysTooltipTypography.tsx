import React from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";

const SysTooltipTypography = React.forwardRef<HTMLElement, TypographyProps>(({ children, title, ...props }, ref) => (
	<Typography ref={ref} title={title ?? (typeof children === "string" ? children : undefined)} {...props}>
		{children}
	</Typography>
));

export default SysTooltipTypography;
