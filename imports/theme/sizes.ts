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

const radius: IRadius = {
	xs: baseFixedSizes[0.25],
	sm: baseFixedSizes[0.5],
	md: baseFixedSizes[1],
	lg: baseFixedSizes[1.5],
	xl: baseFixedSizes[2],
	infinite: "800px"
};

const spacingRem: ISpacing = {
	xs: baseRemSizes[0.25],
	sm: baseRemSizes[0.5],
	md: baseRemSizes[1],
	lg: baseRemSizes[1.5],
	xl: baseRemSizes[2],
	xxl: baseRemSizes[3]
};

const spacingFixed: ISpacing = {
	xs: baseFixedSizes[0.25],
	sm: baseFixedSizes[0.5],
	md: baseFixedSizes[1],
	lg: baseFixedSizes[1.5],
	xl: baseFixedSizes[2],
	xxl: baseFixedSizes[3]
};

const components: IComponents = {
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
};

const content: IContent = {
	px: "136px",
	pt: baseFixedSizes[2],
	pb: baseFixedSizes[4]
};

const sysSizes = {
	radius: radius,
	spacingRem: spacingRem,
	spacingFixed: spacingFixed,
	components: components,
	content: content,
	base: {
		rem: baseRemSizes,
		fixed: baseFixedSizes
	},
	maxDisplayWidth: "1920px"
};

export { ISysSizes, sysSizes };
