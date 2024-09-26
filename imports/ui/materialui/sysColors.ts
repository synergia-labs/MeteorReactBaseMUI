import {PaletteOptions} from "@mui/material";

const sysBaseColors = {
  //common
  black: "#000000",
  white: "#ffffff",
  //grey
  grey10: "#17171c",
  grey15: "#23232a",
  grey20: "#2e2e38",
  grey30: "#454554",
  grey40: "#5c5c70",
  grey50: "#73738c",
  grey60: "#8f8fa3",
  grey70: "#a4a4b5",
  grey80: "#c7c7d1",
  grey90: "#e3e3e8",
  grey95: "#f1f1f3",
  grey97: "#f7f7f8",
  greyTransparent: "#ffffff1a",
  //purple
  purple10: "#09006b",
  purple20: "#1400a8",
  purple30: "#312ebd",
  purple40: "#4b4ad5",
  purple50: "#6768f2",
  purple60: "#8183ff",
  purple70: "#a1a2ff",
  purple80: "#c1c1ff",
  purple90: "#e1dfff",
  purple95: "#eff0ff",
  purple97: "#f5f6fe",
  purpleGrey: "#333370",
  purpleTransparent: "#6768f21a",
  //green
  green10: "#00210e",
  green20: "#00391c",
  green30: "#00522b",
  green40: "#006d3b",
  green50: "#00894b",
  green60: "#00a65d",
  green70: "#00c46e",
  green80: "#00e280",
  green90: "#5cff9f",
  green95: "#c2ffd0",
  green97: "#ddffe2",
  //neon
  neon10: "#002018",
  neon20: "#00382b",
  neon30: "#005140",
  neon40: "#006b55",
  neon50: "#00876c",
  neon60: "#00a483",
  neon70: "#00c19c",
  neon80: "#00e0b5",
  neon90: "#00ffce",
  neon95: "#99ffeb",
  neon97: "#ccfff5",
  //red
  red10: "#400009",
  red20: "#680015",
  red30: "#920021",
  red40: "#bf002e",
  red50: "#e71f41",
  red60: "#ff344f",
  red70: "#ff667a",
  red80: "#ff99a7",
  red90: "#ffccd3",
  red95: "#ffe5e9",
  red97: "#fff0f2",
  //yellow
  yellow30: "#996e00",
  yellow40: "#cc9300",
  yellow60: "#ffc633",
  yellow80: "#ffe299",
  yellow90: "#fff1cc",
  //blue
  blue30: "#025e97",
  blue40: "#027dca",
  blue50: "#069efc",
  blue80: "#9ad8fe",
  blue95: "#e6f5ff",
};

const sysLightPalette: PaletteOptions = {
  common: {
    black: sysBaseColors.black,
    white: sysBaseColors.white,
  },
  primary: {
    light: sysBaseColors.purple70,
    main: sysBaseColors.purple50,
    dark: sysBaseColors.purple30,
    contrastText: sysBaseColors.white
  },
  secondary: {
    light: sysBaseColors.green95,
    main: sysBaseColors.green80,
    dark: sysBaseColors.green60,
    contrastText: sysBaseColors.grey20
  },
  tertiary: {
    light: sysBaseColors.neon97,
    main: sysBaseColors.neon90,
    dark: sysBaseColors.neon60,
    contrastText: sysBaseColors.grey20
  },
  success: {
    light: sysBaseColors.green95,
    main: sysBaseColors.green60,
    dark: sysBaseColors.green40,
    contrastText: sysBaseColors.white
  },
  warning: {
    light: sysBaseColors.yellow90,
    main: sysBaseColors.yellow60,
    dark: sysBaseColors.yellow30,
    contrastText: sysBaseColors.grey10
  },
  info: {
    light: sysBaseColors.blue95,
    main: sysBaseColors.blue40,
    dark: sysBaseColors.blue30,
    contrastText: sysBaseColors.white
  },
  error: {
    light: sysBaseColors.red95,
    main: sysBaseColors.red60,
    dark: sysBaseColors.red40,
    contrastText: sysBaseColors.white
  },
  text: {
    primary: sysBaseColors.grey10,
    secondary: sysBaseColors.grey30,
    disabled: sysBaseColors.grey70
  },
  sysText: {
    body: sysBaseColors.grey30,
    title: sysBaseColors.grey10,
    auxiliary: sysBaseColors.grey50,
    disabled: sysBaseColors.grey70,
    base: sysBaseColors.white,
    baseContrast: sysBaseColors.black,
    primary: sysBaseColors.purple50,
    secondary: sysBaseColors.green80,
    tertiary: sysBaseColors.neon90,
  },
  background: {
    paper: sysBaseColors.white,
    default: sysBaseColors.white
  },
  sysBackground: {
    paper: sysBaseColors.white,
    default: sysBaseColors.white,
    bg1: sysBaseColors.grey97,
    bg2: sysBaseColors.grey95,
    bg3: sysBaseColors.grey90,
  },
  divider: sysBaseColors.grey80,
  sysAction: {
    primary: sysBaseColors.purple50,
    primaryHover: sysBaseColors.purple30,
    primaryBgHover: sysBaseColors.purpleTransparent,
    primaryIcon: sysBaseColors.purpleGrey,
    primaryContrastText: sysBaseColors.white,
    primaryContrastBg: sysBaseColors.greyTransparent,
    disabled: sysBaseColors.grey70,
    bgDisabled: sysBaseColors.grey95,
    auxiliary: sysBaseColors.grey30,
  }
}

export default sysLightPalette;
