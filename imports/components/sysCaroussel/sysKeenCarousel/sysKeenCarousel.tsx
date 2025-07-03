import React, { ReactNode } from "react";
import Styles from "./sysKeenCarousel.styles";
import "keen-slider/keen-slider.min.css";
import { BoxProps } from "@mui/material";

interface IProps extends BoxProps {
	children: ReactNode;
	sliderRef: (node: HTMLDivElement | null) => void;
}

const SysKeenCarousel: React.FC<IProps> = ({ children, sliderRef, ...otherProps }) => {
	return (
		<Styles.container {...otherProps} className="navigation-wrapper">
			<Styles.slider className="keen-slider" ref={sliderRef}>
				{children}
			</Styles.slider>
		</Styles.container>
	);
};

export default SysKeenCarousel;
