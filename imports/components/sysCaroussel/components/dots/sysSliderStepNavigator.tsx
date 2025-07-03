import React, { RefObject, useRef, useState } from "react";
import { Box, BoxProps, styled } from "@mui/material";
import Slider from "react-slick";
import { sysSizes } from "/imports/theme/sizes";

const Container = styled(Box)(() => ({
	display: "flex",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
	gap: sysSizes.spacingFixed.sm,
	width: "100%"
}));

const Selector = styled(Box, {
	shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "disabled"
})<{ isSelected: boolean; disabled?: boolean }>(({ theme, isSelected, disabled }) => ({
	height: "6px",
	flex: 1,
	backgroundColor: isSelected ? theme.palette.sysAction.auxiliary : theme.palette.sysBackground.bg2,
	borderRadius: sysSizes.radius.md,
	cursor: isSelected ? "default" : "pointer",
	opacity: disabled ? 0.8 : 1,
	transition: "all 0.2s ease-in-out",
	["&:hover"]: {
		backgroundColor: disabled
			? theme.palette.sysBackground.bg2
			: isSelected
				? theme.palette.sysAction.auxiliary
				: theme.palette.sysAction.primary
	}
}));

interface IProps extends BoxProps {
	sliderRef: RefObject<Slider | null>;
	quantity: number;
	currentStep: number;
	onStepChange?: (step: number) => void;
}

export default function SysSliderStepNavigator({ sliderRef, quantity, currentStep, onStepChange, ...props }: IProps) {
	const [locked, setLocked] = useState(false);
	const lastChangeRef = useRef<number>(0);

	const handleStepChange = (step: number) => {
		if (step === currentStep || locked) return;
		const now = Date.now();
		if (now - lastChangeRef.current < 500) return;
		setLocked(true);
		lastChangeRef.current = now;
		onStepChange?.(step);
		sliderRef.current?.slickGoTo(step);
		setTimeout(() => setLocked(false), 500);
	};

	return (
		<Container {...props}>
			{Array.from({ length: quantity }, (_, index) => (
				<Selector
					key={index}
					isSelected={index === currentStep}
					disabled={locked}
					onClick={() => handleStepChange(index)}
				/>
			))}
		</Container>
	);
}
