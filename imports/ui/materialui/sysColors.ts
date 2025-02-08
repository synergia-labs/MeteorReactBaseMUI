import {PaletteOptions} from "@mui/material";


type ColorKey = 
  | 10 | 15 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 97 
  | 'transparent' | 'transparent2' | 'grey';

//region Common colors
const sysCommonColors: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
} as const;
//endregion

//region Grey colors
const sysGreyColors: Partial<Record<ColorKey, string>> = {
  10: "#17171c",
  15: "#23232a",
  20: "#2e2e38",
  30: "#454554",
  40: "#5c5c70",
  50: "#73738c",
  60: "#8f8fa3",
  70: "#a4a4b5",
  80: "#c7c7d1",
  90: "#e3e3e8",
  95: "#f1f1f3",
  97: "#f7f7f8",
  transparent: "#ffffff1a"
} as const;
//endregion

//region Purple colors
const sysPurpleColors: Partial<Record<ColorKey, string>> = {
  10: "#09006b",
  20: "#1400a8",
  30: "#312ebd",
  40: "#4b4ad5",
  50: "#6768f2",
  60: "#8183ff",
  70: "#a1a2ff",
  80: "#c1c1ff",
  90: "#e1dfff",
  95: "#eff0ff",
  97: "#f5f6fe",
  grey: "#333370",
  transparent: "#6768f21a"
} as const;
//endregion

//region Green colors
const sysGreenColors: Partial<Record<ColorKey, string>> = {
  10: "#00210e",
  20: "#00391c",
  30: "#00522b",
  40: "#006d3b",
  50: "#00894b",
  60: "#00a65d",
  70: "#00c46e",
  80: "#00e280",
  90: "#5cff9f",
  95: "#c2ffd0",
  97: "#ddffe2",
} as const;
//endregion

//region Neon colors
const sysNeonColors: Partial<Record<ColorKey, string>> = {
  10: "#002018",
  20: "#00382b",
  30: "#005140",
  40: "#006b55",
  50: "#00876c",
  60: "#00a483",
  70: "#00c19c",
  80: "#00e0b5",
  90: "#00ffce",
  95: "#99ffeb",
  97: "#ccfff5",
} as const;
//endregion

//region Red colors
const sysRedColors: Partial<Record<ColorKey, string>> = {
  10: "#400009",
  20: "#680015",
  30: "#920021",
  40: "#bf002e",
  50: "#e71f41",
  60: "#ff344f",
  70: "#ff667a",
  80: "#ff99a7",
  90: "#ffccd3",
  95: "#ffe5e9",
  97: "#fff0f2",
} as const;
//endregion

//region Yellow colors
const sysYellowColors: Partial<Record<ColorKey, string>> = {
  30: "#996e00",
  40: "#cc9300",
  60: "#ffc633",
  80: "#ffe299",
  90: "#fff1cc",
} as const;
//endregion

//region Blue colors
const sysBlueColors: Partial<Record<ColorKey, string>> = {
  30: "#025e97",
  40: "#027dca",
  50: "#069efc",
  80: "#9ad8fe",
  95: "#e6f5ff",
} as const;
//endregion


const sysLightPalette: PaletteOptions = {
  divider: sysGreyColors[80],

  common: sysCommonColors,

  primary: {
    light: sysPurpleColors[70],
    main: sysPurpleColors[50]!,
    dark: sysPurpleColors[30],
    contrastText: sysCommonColors.white
  },

  secondary: {
    light: sysGreenColors[95],
    main: sysGreenColors[80]!,
    dark: sysGreenColors[60],
    contrastText: sysGreyColors[20]
  },

  tertiary: {
    light: sysNeonColors[97],
    main: sysNeonColors[90]!,
    dark: sysNeonColors[60],
    contrastText: sysGreyColors[20]
  },

  success: {
    light: sysGreenColors[95],
    main: sysGreenColors[60]!,
    dark: sysGreenColors[40],
    contrastText: sysCommonColors.white
  },

  warning: {
    light: sysYellowColors[90],
    main: sysYellowColors[60]!,
    dark: sysYellowColors[30],
    contrastText: sysGreyColors[10]
  },

  info: {
    light: sysBlueColors[95],
    main: sysBlueColors[40]!,
    dark: sysBlueColors[30],
    contrastText: sysCommonColors.white
  },

  error: {
    light: sysRedColors[95],
    main: sysRedColors[60]!,
    dark: sysRedColors[40],
    contrastText: sysCommonColors.white
  },

  text: {
    primary: sysGreyColors[10],
    secondary: sysGreyColors[30],
    disabled: sysGreyColors[70]
  },

  sysText: {
    body: sysGreyColors[30],
    title: sysGreyColors[10],
    auxiliary: sysGreyColors[50],
    disabled: sysGreyColors[70],
    base: sysCommonColors.white,
    baseContrast: sysCommonColors.black,
    primary: sysPurpleColors[50],
    secondary: sysGreenColors[80],
    tertiary: sysNeonColors[90],
  },
  background: {
    paper: sysCommonColors.white,
    default: sysCommonColors.white
  },
  sysBackground: {
    paper: sysCommonColors.white,
    default: sysCommonColors.white,
    bg1: sysGreyColors[97],
    bg2: sysGreyColors[95],
    bg3: sysGreyColors[90],
  },
  sysAction: {
    primary: sysPurpleColors[50],
    primaryHover: sysPurpleColors[30],
    primaryBgHover: sysPurpleColors.transparent,
    primaryIcon: sysPurpleColors.grey,
    primaryContrastText: sysCommonColors.white,
    primaryContrastBg: sysGreyColors.transparent,
    disabled: sysGreyColors[70],
    bgDisabled: sysGreyColors[95],
    auxiliary: sysGreyColors[30],
  }
} as const;

export default sysLightPalette;
