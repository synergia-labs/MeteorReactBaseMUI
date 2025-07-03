import { BoxProps, IconButton } from "@mui/material";
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import React, { ReactElement, ReactNode } from "react";
import { Settings } from "react-slick";
import SysIcon from "/imports/components/sysIcon/sysIcon";
import "keen-slider/keen-slider.min.css";
import "./styles.css";
import Styles from "./carousel.styles";
import { nanoid } from "nanoid";

const AdaptiveHeight: KeenSliderPlugin = (slider) => {
	function updateHeight() {
		const currentSlide = slider.slides[slider.track.details.rel];
		if (currentSlide) {
			slider.container.style.height = `${currentSlide.offsetHeight}px`;
		}
	}
	slider.on("created", updateHeight);
	slider.on("slideChanged", updateHeight);
};

const InjectClassName: React.FC<{ children: ReactNode }> = ({ children }) => {
	const enhancedChildren = React.Children.map(children, (child) => {
		if (React.isValidElement(child)) {
			// Preserva classNames existentes
			const existingClassName = (child as React.JSX.Element).props?.className ?? "";
			return (
				<div style={{ width: "100%" }} className={`${existingClassName} keen-slider__slide`}>
					{child}
				</div>
			);
		}
		return child; // Se não for elemento React (ex: string, null), retorna como está
	});

	return <>{enhancedChildren}</>;
};

interface IProps {
	viewOptionsInside?: boolean; // If true, render the options (arrows, and dots) inside the component
	showIcons?: boolean;
	showFooter?: boolean;
	leftIcon?: React.JSX.Element;
	rightIcon?: React.JSX.Element;
	markComponent?: React.FC<BoxProps & { selected: "true" | "false" }>;
	onSlideChange?: (value: number) => void;
	children: React.ReactNode;
}

export default function SysSimpleCarousel({
	viewOptionsInside = false,
	showFooter = true,
	leftIcon,
	rightIcon,
	children,
	markComponent: MarkComponent, // eslint-disable-line
	showIcons = true,
	onSlideChange
}: IProps) {
	const totalChildren = React.Children.count(children);
	showIcons = totalChildren > 1 && showIcons;
	showFooter = totalChildren > 1 && showFooter;

	const [currentSlide, setCurrentSlide] = React.useState(0);

	function handleChangeSelectedSlid(val: number) {
		setCurrentSlide(val);
		onSlideChange?.(val);
	}

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
		{
			initial: 0,
			slides: {
				perView: 1,
				spacing: 0
			},
			slideChanged(s) {
				AdaptiveHeight(s);
				handleChangeSelectedSlid(s.track.details.rel);
			},
			created(s) {
				AdaptiveHeight(s);
			}
		},
		[AdaptiveHeight]
	);

	const settings: Settings = {
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: (
			<IconButton
				onClick={() => instanceRef.current?.prev()}
				disabled={currentSlide === 0}
				sx={{ zIndex: 2 }}
				className={viewOptionsInside ? "arrow arrow--left" : ""}>
				{!!leftIcon ? leftIcon : <SysIcon name="arrowLeft" />}
			</IconButton>
		),
		nextArrow: (
			<IconButton
				onClick={() => instanceRef.current?.next()}
				disabled={currentSlide === (instanceRef?.current?.track?.details?.slides?.length ?? 0) - 1}
				className={viewOptionsInside ? "arrow arrow--right" : ""}>
				{!!rightIcon ? rightIcon : <SysIcon name="arrowRight" />}
			</IconButton>
		)
	};

	return (
		<Styles.container>
			<Styles.row className={viewOptionsInside ? "navigation-wrapper" : ""}>
				{showIcons && settings.prevArrow}
				<Styles.body ref={sliderRef} className="keen-slider">
					<InjectClassName>{children}</InjectClassName>
				</Styles.body>
				{showIcons && settings.nextArrow}
			</Styles.row>
			{showFooter && (
				<Styles.markContainer>
					{Array.from({ length: totalChildren }, (_, i) => i).map((idx) => {
						return (
							<Styles.btFooter
								key={nanoid()}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}>
								{MarkComponent ? (
									<MarkComponent selected={currentSlide === idx ? "true" : "false"} />
								) : (
									<Styles.mark selected={currentSlide === idx ? "true" : "false"} />
								)}
							</Styles.btFooter>
						);
					})}
				</Styles.markContainer>
			)}
		</Styles.container>
	);
}
