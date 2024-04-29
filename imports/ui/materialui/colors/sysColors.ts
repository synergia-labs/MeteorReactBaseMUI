import { PaletteOptions } from "@mui/material";

const __blueScale = {
   blue30: "#025e97",
   blue40: "#027dca",
   blue50: "#069efc",
   blue80: "#9ad8fe",
   blue95: "#e6f5ff",
};
const __greenScale = {
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
};
const __grayScale = {
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
}
const __neonScale = {
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
}
const __purpleScale = {
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
}
const __redScale = {
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
}
const __yellowScale = {
   yellow30: "#996e00",
   yellow40: "#cc9300",
   yellow60: "#ffc633",
   yellow80: "#ffe299",
   yellow90: "#fff1cc",
}

const __sysBaseColors = {
   black: "#000000",
   white: "#ffffff",
};


const sysLightPalette: PaletteOptions = {
   common: {
      black: __sysBaseColors.black,
      white: __sysBaseColors.white,
   },
   primary: {
      light: __purpleScale.purple70,
      main: __purpleScale.purple50,
      dark: __purpleScale.purple30,
      contrastText: __sysBaseColors.white
   },
   secondary: {
      light: __greenScale.green95,
      main: __greenScale.green80,
      dark: __greenScale.green60,
      contrastText: __grayScale.grey20
   },
   tertiary: {
      light: __neonScale.neon97,
      main: __neonScale.neon90,
      dark: __neonScale.neon60,
      contrastText: __grayScale.grey20
   },
   success: {
      light: __greenScale.green95,
      main: __greenScale.green60,
      dark: __greenScale.green40,
      contrastText: __sysBaseColors.white
   },
   warning: {
      light: __yellowScale.yellow90,
      main: __yellowScale.yellow60,
      dark: __yellowScale.yellow30,
      contrastText: __grayScale.grey10
   },
   info: {
      light: __blueScale.blue95,
      main: __blueScale.blue40,
      dark: __blueScale.blue30,
      contrastText: __sysBaseColors.white
   },
   error: {
      light: __redScale.red95,
      main: __redScale.red60,
      dark: __redScale.red40,
      contrastText: __sysBaseColors.white
   },
   text: {
      primary: __grayScale.grey10,
      secondary: __grayScale.grey30,
      disabled: __grayScale.grey70
   },
   sysText: {
      body: __grayScale.grey30,
      title: __grayScale.grey10,
      auxiliary: __grayScale.grey50,
      disabled: __grayScale.grey70,
      base: __sysBaseColors.white,
      baseContrast: __sysBaseColors.black,
      primary: __purpleScale.purple50,
      secondary: __greenScale.green80,
      tertiary: __neonScale.neon90,
   },
   background: {
      paper: __sysBaseColors.white,
      default: __sysBaseColors.white
   },
   sysBackground: {
      paper: __sysBaseColors.white,
      default: __sysBaseColors.white,
      bg1: __grayScale.grey97,
      bg2: __grayScale.grey95,
      bg3: __grayScale.grey90,
   },
   divider: __grayScale.grey80,
   sysAction: {
      primary: __purpleScale.purple50,
      primaryHover: __purpleScale.purple30,
      primaryBgHover: __purpleScale.purpleTransparent,
      primaryIcon: __purpleScale.purpleGrey,
      primaryContrastText: __sysBaseColors.white,
      primaryContrastBg: __grayScale.greyTransparent,
      disabled: __grayScale.grey70,
      bgDisabled: __grayScale.grey95,
      auxiliary: __grayScale.grey30,
   }
}

export default sysLightPalette;
