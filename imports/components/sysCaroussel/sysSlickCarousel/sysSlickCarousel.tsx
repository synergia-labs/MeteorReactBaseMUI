import React, { RefObject } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface IProps extends Settings {
	ref?: RefObject<Slider | null>;
}

const SysSlider: React.FC<IProps> = (props) => {
	return (
		<div className="slider-container">
			<Slider {...props} ref={props.ref} />
		</div>
	);
};

export default SysSlider;
