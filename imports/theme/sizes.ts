import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material";

type MediaQueriesType = "xs" | "sm" | "md" | "lg";
interface IRadius {
	xs: string;
	sm: string;
	md: string;
	lg: string;
	xl: string;
	infinite: string;
}
interface ISpacing {
	xs: string;
	sm: string;
	md: string;
	lg: string;
	xl: string;
	xxl: string;
}

interface IComponents {
	buttonMediumPy: string;
	buttonSmallPy: string;
	buttonMediumPx: string;
	buttonSmallPx: string;
	buttonGap: string;
	buttonMediumMinHeight: string;
	buttonSmallMinHeight: string;
	iconSize: string;
	iconSizeSmall: string;
	inputMinHeight: string;
	inputGap: string;
	inputPx: string;
	inputPy: string;
}

interface IContent {
	px: string;
	pt: string;
	pb: string;
}

interface ISysSizes {
	radius: IRadius;
	spacingRem: ISpacing;
	spacingFixed: ISpacing;
	components: IComponents;
	content: IContent;
	base: {
		rem: Record<number, string>;
		fixed: Record<number, string>;
	};
	maxDisplayWidth: string;
}

const baseRemSizes: Record<number, string> = {
	0.25: "0.25rem",
	0.5: "0.5rem",
	0.75: "0.75rem",
	1: "1rem",
	1.25: "1.25rem",
	1.5: "1.5rem",
	2: "2rem",
	3: "3rem",
	4: "4rem"
} as const;

const baseFixedSizes: Record<number, string> = {
	0.25: "4px",
	0.5: "8px",
	0.75: "12px",
	1: "16px",
	1.25: "20px",
	1.5: "24px",
	2: "32px",
	3: "48px",
	4: "64px",
	6: "96px",
	8: "128px",
	12: "192px"
} as const;

const radius: Record<MediaQueriesType, IRadius> = {
	lg: {
		xs: baseFixedSizes[0.25],
		sm: baseFixedSizes[0.5],
		md: baseFixedSizes[1],
		lg: baseFixedSizes[1.5],
		xl: baseFixedSizes[2],
		infinite: "800px"
	} as const,
	md: {
		xs: baseFixedSizes[0.25],
		sm: baseFixedSizes[0.5],
		md: baseFixedSizes[1],
		lg: baseFixedSizes[1.5],
		xl: baseFixedSizes[2],
		infinite: "800px"
	} as const,
	sm: {
		xs: baseFixedSizes[0.25],
		sm: baseFixedSizes[0.5],
		md: baseFixedSizes[1],
		lg: baseFixedSizes[1.5],
		xl: baseFixedSizes[2],
		infinite: "800px"
	} as const,
	xs: {
		xs: baseFixedSizes[0.25],
		sm: baseFixedSizes[0.5],
		md: baseFixedSizes[1],
		lg: baseFixedSizes[1.5],
		xl: baseFixedSizes[2],
		infinite: "800px"
	} as const
} as const;

const spacingRem: Record<MediaQueriesType, ISpacing> = {
	lg: {
		xs: baseRemSizes[0.25],
		sm: baseRemSizes[0.5],
		md: baseRemSizes[1],
		lg: baseRemSizes[1.5],
		xl: baseRemSizes[2],
		xxl: baseRemSizes[2]
	} as const,
	md: {
		xs: baseRemSizes[0.25],
		sm: baseRemSizes[0.5],
		md: baseRemSizes[1],
		lg: baseRemSizes[1.5],
		xl: baseRemSizes[2],
		xxl: baseRemSizes[2]
	} as const,
	sm: {
		xs: baseRemSizes[0.25],
		sm: baseRemSizes[0.5],
		md: baseRemSizes[1],
		lg: baseRemSizes[1.5],
		xl: baseRemSizes[2],
		xxl: baseRemSizes[3]
	} as const,
	xs: {
		xs: baseRemSizes[0.25],
		sm: baseRemSizes[0.5],
		md: baseRemSizes[1],
		lg: baseRemSizes[1.5],
		xl: baseRemSizes[2],
		xxl: baseRemSizes[3]
	} as const
} as const;

const spacingFixed: Record<MediaQueriesType, ISpacing> = {
	lg: {
		xs: baseFixedSizes[0.25],
		sm: baseFixedSizes[0.5],
		md: baseFixedSizes[1],
		lg: baseFixedSizes[1.5],
		xl: baseFixedSizes[2],
		xxl: baseFixedSizes[3]
	} as const,
	md: {
		xs: baseFixedSizes[0.25],
		sm: baseFixedSizes[0.5],
		md: baseFixedSizes[1],
		lg: baseFixedSizes[1.5],
		xl: baseFixedSizes[2],
		xxl: baseFixedSizes[3]
	} as const,
	sm: {
		xs: baseFixedSizes[0.25],
		sm: baseFixedSizes[0.5],
		md: baseFixedSizes[1],
		lg: baseFixedSizes[1.5],
		xl: baseFixedSizes[2],
		xxl: baseFixedSizes[3]
	} as const,
	xs: {
		xs: baseFixedSizes[0.25],
		sm: baseFixedSizes[0.5],
		md: baseFixedSizes[1],
		lg: baseFixedSizes[1.5],
		xl: baseFixedSizes[2],
		xxl: baseFixedSizes[3]
	} as const
} as const;

const components: Record<MediaQueriesType, IComponents> = {
	lg: {
		buttonMediumPy: baseRemSizes[0.5],
		buttonSmallPy: baseRemSizes[0.25],
		buttonMediumPx: baseRemSizes[1.5],
		buttonSmallPx: baseRemSizes[1],
		buttonGap: baseRemSizes[0.5],
		buttonMediumMinHeight: "2.5rem",
		buttonSmallMinHeight: "2.125rem",
		iconSize: baseRemSizes[1.5],
		iconSizeSmall: "1.125rem",
		inputMinHeight: "0",
		inputGap: baseRemSizes[0.5],
		inputPx: baseRemSizes[1],
		inputPy: baseRemSizes[0.5]
	} as const,
	md: {
		buttonMediumPy: baseRemSizes[0.5],
		buttonSmallPy: baseRemSizes[0.25],
		buttonMediumPx: baseRemSizes[1.5],
		buttonSmallPx: baseRemSizes[1],
		buttonGap: baseRemSizes[0.5],
		buttonMediumMinHeight: "2.5rem",
		buttonSmallMinHeight: "2.125rem",
		iconSize: baseRemSizes[1.5],
		iconSizeSmall: "1.125rem",
		inputMinHeight: "0",
		inputGap: baseRemSizes[0.5],
		inputPx: baseRemSizes[1],
		inputPy: baseRemSizes[0.5]
	} as const,
	sm: {
		buttonMediumPy: baseRemSizes[0.5],
		buttonSmallPy: baseRemSizes[0.25],
		buttonMediumPx: baseRemSizes[1.5],
		buttonSmallPx: baseRemSizes[1],
		buttonGap: baseRemSizes[0.5],
		buttonMediumMinHeight: "2.5rem",
		buttonSmallMinHeight: "2.125rem",
		iconSize: baseRemSizes[1.5],
		iconSizeSmall: "1.125rem",
		inputMinHeight: "0",
		inputGap: baseRemSizes[0.5],
		inputPx: baseRemSizes[1],
		inputPy: baseRemSizes[0.5]
	} as const,
	xs: {
		buttonMediumPy: baseRemSizes[0.5],
		buttonSmallPy: baseRemSizes[0.25],
		buttonMediumPx: baseRemSizes[1.5],
		buttonSmallPx: baseRemSizes[1],
		buttonGap: baseRemSizes[0.5],
		buttonMediumMinHeight: "2.5rem",
		buttonSmallMinHeight: "2.125rem",
		iconSize: baseRemSizes[1.5],
		iconSizeSmall: "1.125rem",
		inputMinHeight: "0",
		inputGap: baseRemSizes[0.5],
		inputPx: baseRemSizes[1],
		inputPy: baseRemSizes[0.5]
	} as const
} as const;

const content: Record<MediaQueriesType, IContent> = {
	lg: {
		px: "40px",
		pt: baseFixedSizes[2],
		pb: baseFixedSizes[4]
	} as const,
	md: {
		px: "40px",
		pt: baseFixedSizes[2],
		pb: baseFixedSizes[4]
	} as const,
	sm: {
		px: baseFixedSizes[1],
		pt: baseFixedSizes[2],
		pb: baseFixedSizes[4]
	} as const,
	xs: {
		px: baseFixedSizes[1],
		pt: baseFixedSizes[2],
		pb: baseFixedSizes[4]
	} as const
} as const;

function useMediaQueryBreakpoint(theme?: Theme): MediaQueriesType {
	if (!theme) throw new Error("Theme is not defined");
	const matchesLg = useMediaQuery(theme.breakpoints.up("lg"));
	const matchesMd = useMediaQuery(theme.breakpoints.up("md"));
	const matchesSm = useMediaQuery(theme.breakpoints.up("sm"));

	if (matchesLg) return "lg";
	if (matchesMd) return "md";
	if (matchesSm) return "sm";
	return "xs";
}

function getSysSizes(theme?: Theme): ISysSizes {
	try {
		const mediaQuery: MediaQueriesType = useMediaQueryBreakpoint(theme);
		return {
			radius: radius[mediaQuery],
			spacingRem: spacingRem[mediaQuery],
			spacingFixed: spacingFixed[mediaQuery],
			components: components[mediaQuery],
			content: content[mediaQuery],
			base: {
				rem: baseRemSizes,
				fixed: baseFixedSizes
			},
			maxDisplayWidth: "1920px"
		};
	} catch (e) {
		return {
			radius: radius.lg,
			spacingRem: spacingRem.lg,
			spacingFixed: spacingFixed.lg,
			components: components.lg,
			content: content.lg,
			base: {
				rem: baseRemSizes,
				fixed: baseFixedSizes
			},
			maxDisplayWidth: "1920px"
		};
	}
}

export { getSysSizes };
