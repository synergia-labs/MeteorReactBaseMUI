import React from "react";
import { Box, BoxProps } from "@mui/material";

interface IProps extends BoxProps {}

const SysKeenCarouselSlide: React.FC<IProps> = ({ children, ...props }) => {
	return (
		<Box className="keen-slider__slide" {...props}>
			{children}
		</Box>
	);
};

export default SysKeenCarouselSlide;
