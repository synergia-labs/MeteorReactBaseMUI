import { KeenSliderPlugin } from "keen-slider";

const AdaptiveHeightKeenCarousel: KeenSliderPlugin = (slider) => {
	function updateHeight() {
		slider.container.style.height = slider.slides[slider.track.details.rel].offsetHeight + "px";
	}
	slider.on("created", updateHeight);
	slider.on("slideChanged", updateHeight);
};

export default AdaptiveHeightKeenCarousel;
