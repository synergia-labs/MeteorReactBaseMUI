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

const createUniformSizes = <T>(values: T): Record<MediaQueriesType, T> => ({
	lg: values,
	md: values,
	sm: values,
	xs: values
});

const radius = createUniformSizes<IRadius>({
	xs: baseFixedSizes[0.25],
	sm: baseFixedSizes[0.5],
	md: baseFixedSizes[1],
	lg: baseFixedSizes[1.5],
	xl: baseFixedSizes[2],
	infinite: "800px"
});

const spacingRem = createUniformSizes<ISpacing>({
	xs: baseRemSizes[0.25],
	sm: baseRemSizes[0.5],
	md: baseRemSizes[1],
	lg: baseRemSizes[1.5],
	xl: baseRemSizes[2],
	xxl: baseRemSizes[3]
});

const spacingFixed = createUniformSizes<ISpacing>({
	xs: baseFixedSizes[0.25],
	sm: baseFixedSizes[0.5],
	md: baseFixedSizes[1],
	lg: baseFixedSizes[1.5],
	xl: baseFixedSizes[2],
	xxl: baseFixedSizes[3]
});

const components = createUniformSizes<IComponents>({
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
});

const content = createUniformSizes<IContent>({
	px: baseFixedSizes[1],
	pt: baseFixedSizes[2],
	pb: baseFixedSizes[4]
});

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
	const mediaQuery = useMediaQueryBreakpoint(theme);
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
}

export { useMediaQueryBreakpoint, getSysSizes, ISysSizes };
