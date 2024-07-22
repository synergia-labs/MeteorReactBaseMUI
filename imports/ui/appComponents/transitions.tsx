import React, { forwardRef, ReactElement, Ref } from 'react';
import Slide, { SlideProps } from '@mui/material/Slide';
import Zoom, { ZoomProps } from '@mui/material/Zoom';
import Grow, { GrowProps} from '@mui/material/Grow';
import Fade, { FadeProps } from '@mui/material/Fade';
import { TransitionProps } from '@mui/material/transitions';

export const ShowNotificationTransitions = ({
	type,
	direction = 'up'
}: {
	type: 'slide' | 'grow' | 'fade' | 'zoom';
	direction?: SlideProps['direction'];
}) => {
	function SlideTransition(props: SlideProps) {
		return <Slide {...props} direction={direction} />;
	}

	function GrowTransition(props: GrowProps) {
		return <Grow {...props} />;
	}

	function FadeTransition(props: FadeProps) {
		return <Fade {...props} />;
	}

	function ZoomTransition(props: ZoomProps) {
		return <Zoom {...props} />;
	}

	switch (type) {
		case 'slide':
			return SlideTransition;
		case 'grow':
			return GrowTransition;
		case 'fade':
			return FadeTransition;
		case 'zoom':
			return ZoomTransition;
		default:
			return FadeTransition;
	}
};

const SlideTransition = forwardRef(function Transition(
	props: TransitionProps & { children: ReactElement<any, any> },
	ref: Ref<unknown>
) {
	return <Slide ref={ref} {...props} direction="up" />;
});
const GrowTransition = forwardRef(function Transition(
	props: TransitionProps & { children: ReactElement<any, any> },
	ref: Ref<unknown>
) {
	return <Grow ref={ref} {...props} />;
});
const ZoomTransition = forwardRef(function Transition(
	props: TransitionProps & { children: ReactElement<any, any> },
	ref: Ref<unknown>
) {
	return <Zoom ref={ref} {...props} />;
});
const FadeTransition = forwardRef(function Transition(
	props: TransitionProps & { children: ReactElement<any, any> },
	ref: Ref<unknown>
) {
	return <Fade ref={ref} {...props} />;
});

export const DialogTransitions = (type?: 'slide' | 'grow' | 'fade' | 'zoom') => {
	switch (type) {
		case 'slide':
			return SlideTransition;
		case 'grow':
			return GrowTransition;
		case 'fade':
			return FadeTransition;
		case 'zoom':
			return ZoomTransition;
		default:
			return FadeTransition;
	}
};
