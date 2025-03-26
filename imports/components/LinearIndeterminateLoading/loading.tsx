import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearIndeterminateLoading({ isLoading }: { isLoading: boolean }) {
	return (
		<Box
			sx={{
				display: isLoading ? "block" : "none",
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				height: "100%",
				backgroundColor: "rgba(255,255,255,0.5)"
			}}>
			<LinearProgress />
		</Box>
	);
}
