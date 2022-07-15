import { createTheme, ThemeOptions } from "@mui/material/styles";
import { isMobile } from "/imports/libs/deviceVerify";
import * as appStyles from "./styles";

interface IBackgroundThemeOptions extends ThemeOptions.palette.background {
  color1: string;
  color2: string;
  color3: string;
}

export interface IThemeOptionsBoilerplate extends ThemeOptions {
  palette: ThemeOptions["palette"] & {
    background: IBackgroundThemeOptions;
    textDisabled: string;
    textAuxiliar: string;
    textWhite: string;
  };
}

const getLightTheme = (fontScale: number): IThemeOptionsBoilerplate => ({
  palette: {
    primary: {
      main: appStyles.primaryColor,
      contrastText: "#FFF",
    },
    secondary: {
      main: appStyles.secondaryColor,
      contrastText: "#FFF",
    },
    text: {
      primary: appStyles.textPrimary,
      secondary: appStyles.textSecondary,
      disabled: appStyles.textDisabled,
    },
    background: {
      paper: appStyles.surfaceColor,
      default: appStyles.surfaceColor,
      color1: appStyles.color1,
      color2: appStyles.color2,
      color3: appStyles.color3,
    },
    textDisabled: appStyles.textDisabled,
    textAuxiliar: appStyles.textAuxiliar,
    textWhite: appStyles.textWhite,
    divider: appStyles.supportColor,
  },
  typography: {
    fontFamily: appStyles.fontFamilyTitle,
    fontSize: 18 * fontScale,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 700,
    h1: { ...appStyles.h1(fontScale), color: appStyles.primaryColor },
    h2: { ...appStyles.h2(fontScale), color: appStyles.secondaryColor },
    h3: { ...appStyles.h3(fontScale), color: "#D3D3D3" },
    h4: appStyles.h4(fontScale),
    h5: appStyles.h5(fontScale),
    h6: appStyles.h6(fontScale),
    button: appStyles.button(fontScale),
    subtitle1: appStyles.subtitle1(fontScale),
    body1: appStyles.body1(fontScale),
    subtitle2: appStyles.subtitle2(fontScale),
    body2: appStyles.body2(fontScale),
    caption: appStyles.caption(fontScale),
  },
  // shape: {
  //     borderRadius: '16px',
  // },
  components: {
    muiChip: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontFamily: appStyles.fontFamily,
          margin: isMobile ? 0 : 4,
        },
        text: {
          // Name of the rule
          fontFamily: appStyles.fontFamily,
          // color: appStyles.textButtonColor, // Some CSS
        },
      },
    },
    MuiBox: {
      defaultProps: {},
      styleOverrides: {
        root: {
          maxHeight: "100vh",
        },
      },
    },
    MuiModal: {
      defaultProps: {},
      styleOverrides: {
        root: {
          "&.MuiBox-root": {
            maxHeight: "100vh",
          },
        },
      },
    },
    MuiDataGrid: {
      defaultProps: {},
      styleOverrides: {
        root: {
          border: 0,
          color: appStyles.textDarkHighlight,
          "& .MuiCircularProgress-root": {
            color: appStyles.secondary,
          },
          "& .MuiDataGrid-columnHeaders": {
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
            borderRadius: "0px",
            borderTop: `2px solid ${appStyles.secondary}`,
            borderBottom: `2px solid ${appStyles.secondary}`,
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${appStyles.supportColor}`,
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none",
            },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
        },
        row: {
          cursor: "pointer",
        },
      },
    },
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          margin: isMobile ? 0 : 4,
          fontFamily: appStyles.fontFamily,
          fontSize: 16 * fontScale,
        },
        text: {
          // Name of the rule
          fontFamily: appStyles.fontFamily,
          fontSize: 16 * fontScale,
        },
      },
    },

    MuiButtonBase: {
      // Name of the component ⚛️ / style sheet
      defaultProps: {},
      styleOverrides: {
        root: {
          fontFamily: appStyles.fontFamily,
          fontSize: 16 * fontScale,
        },
        text: {
          // Name of the rule
          fontFamily: appStyles.fontFamily,
          fontSize: 16 * fontScale,
        },
      },
    },

    MuiFormHelperText: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {},
    },

    MuiIconButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          // Ajusta o espaçamento para atingir o mínimo de toque
          marginLeft: 4,
          marginRight: 4,
          padding: 12,
          fontSize: 16 * fontScale,
        },
      },
    },

    MuiIcon: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontSize: 16 * fontScale,
        },
      },
    },

    MuiSvgIcon: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontSize: 24 * fontScale,
          color: appStyles.textPrimary,
        },
      },
    },

    MuiSnackbarContent: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {
        root: { padding: 0 },
        message: { padding: 0 },
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {
        root: {
          fontFamily: appStyles.fontFamily,
          fontSize: 14 * fontScale,
          // fontWeight: "normal",
          // fontStretch: "normal",
          // fontStyle: "normal",
          // lineHeight: 1.2,
          // letterSpacing: "0.7px",
          // textAlign: "left",
          // // color: "#222020",
          // textTransform: "none",
          // outline: "none",
          // borderRadius: 15,
          // marginTop: 4,
          "&$disabled": {
            color: "#777",
            // backgroundColor: "#f2f2f2",
            outline: "none",
          },
        },
        input: {
          "&$disabled": {
            color: "#777",
            // backgroundColor: "#f2f2f2",
            outline: "none",
          },
          fontFamily: appStyles.fontFamily + " !important",
          fontSize: 14 * fontScale + " !important",
          // backgroundColor:'#FFF',
          // fontWeight: "normal !important",
          // fontStretch: "normal !important",
          // fontStyle: "normal !important",
          // lineHeight: 1.2,
          // letterSpacing: "0.7px !important",
          // textAlign: "left !important",
          // color: "#222020",
        },
      },
    },

    MuiOutlinedInput: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {
        input: {
          // backgroundColor: "#FFFFFF",
          "&.Mui-disabled": {
            color: "#777",
            // backgroundColor: "#f2f2f2",
            outline: "none",
          },
        },
      },
    },

    MuiInputLabel: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {},
    },

    MuiFilledInput: {
      defaultProps: {
        margin: "dense",
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 15,
          // backgroundColor: appStyles.surfaceColor,
          // border: `1px solid ${appStyles.supportColor}`,
          transition: "background-color 300ms",
          "&:hover": {
            // backgroundColor: appStyles.backgroundColor,
            transition: "background-color 300ms",
          },
          "&.Mui-focused": {
            // border: `1px solid ${appStyles.secondaryColor}`,
          },
          "&.Mui-disabled": {
            // backgroundColor: appStyles.disabledBackground,
            // border: `1px solid ${appStyles.disabledBackground}`,
            // color: appStyles.textDisabled,
          },
          "&.Mui-error": {
            // border: `1px solid ${appStyles.errorColor}`,
          },
        },
        input: {
          padding: "8px 24px",
          borderRadius: "inherit",
          "&:focus": {
            borderRadius: "inherit",
          },
        },
      },
    },

    MuiListItem: {
      defaultProps: {
        dense: true,
      },
      styleOverrides: {},
    },

    MuiFab: {
      defaultProps: {},
      styleOverrides: {},
    },

    MuiTable: {
      defaultProps: {},
      styleOverrides: {},
    },

    MuiTextField: {
      defaultProps: {
        margin: "normal",
        variant: "filled",
      },
      styleOverrides: {
        root: {
          width: "100%",
          marginTop: 0,
        },
      },
    },

    MuiToolbar: {
      defaultProps: {
        variant: "dense",
      },
      styleOverrides: {},
    },

    MuiTabs: {
      defaultProps: {},
      styleOverrides: {},
    },

    MuiTab: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontFamily: appStyles.fontFamily,
          margin: isMobile ? 0 : 4,
        },
      },
    },

    MuiFormControl: {
      defaultProps: {},
      styleOverrides: {
        root: {
          borderRadius: 30,
          // backgroundColor: "#FFFFFF",
        },
        marginNormal: {
          marginTop: 4,
        },
      },
    },

    MuiSelect: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontFamily: appStyles.fontFamily,
          fontSize: 14 * fontScale,
          // fontWeight: "normal",
          // fontStretch: "normal",
          // fontStyle: "normal",
          // lineHeight: 1.2,
          // letterSpacing: "0.7px",
          // textAlign: "left",
          // // color: "#222020",
          // textTransform: "none",
          // outline: "none",
        },
        select: {
          fontFamily: appStyles.fontFamily,
          fontSize: 14 * fontScale,
          // fontWeight: "normal",
          // fontStretch: "normal",
          // fontStyle: "normal",
          // lineHeight: 1.2,
          // letterSpacing: "0.7px",
          // textAlign: "left",
          // // color: "#222020",
          // textTransform: "none",
          // outline: "none",
          // height: 51,
          // paddingTop: 0,
          // paddingBottom: 0,
          // display: "flex",
          // flxDirection: "row",
          // alignItems: "center",
          // // backgroundColor: "#ffffff",
        },
      },
    },

    MuiDialog: {
      defaultProps: {},
      styleOverrides: {
        paper: {
          minWidth: isMobile ? "90%" : "400px",
          minHeight: isMobile ? "30%" : "190",
          maxHeight: isMobile ? "90%" : "90%",
          // maxWidth:'90%',
          maxWidth: isMobile ? "90%" : "1200px",
        },
      },
    },

    MuiDrawer: {
      defaultProps: {},
      styleOverrides: {
        root: {
          width: 360, // drawerWidth,
          flexShrink: 0,
        },
        paper: {
          top: isMobile ? 0 : 10,
          right: isMobile ? 0 : 10,
          width: isMobile ? "100%" : 360, //,drawerWidth,
          height: isMobile ? "100%" : "calc(100% - 85px)",
          boxShadow:
            "-10px 20px 20px -18px #000000, 12px 0px 20px -18px #000000",
          overflow: "hidden",
          borderRadius: isMobile ? 0 : 15,
        },
      },
    },

    MuiAutocomplete: {
      defaultProps: {
        margin: "normal",
        variant: "filled",
      },
      styleOverrides: {
        root: {
          "& .MuiFilledInput-root": {
            paddingTop: 0,
          },
        },
        popupIndicator: {
          // color: appStyles.primaryColor,
        },
        endAdornment: {
          top: "unset",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "p",
          subtitle2: "p",
          body1: "p",
          body2: "p",
          caption: "p",
        },
      },
      styleOverrides: {},
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: appStyles.sombraCard,
        },
      },
    },

    MuiTooltip: {
      defaultProps: {
        enterDelay: 300,
      },
      styleOverrides: {
        tooltip: {
          // backgroundColor: "rgba(30, 30, 30, 0.9)",
          // color: appStyles.textWhite,
          fontWeight: "normal",
        },
      },
    },
  },
});

const getDarkTheme = (fontScale: number): IThemeOptionsBoilerplate => ({
  ...getLightTheme(fontScale),
  palette: {
    mode: "dark",
    primary: {
      main: appStyles.primaryColorDark,
    },
    secondary: {
      main: appStyles.secondaryColorDark,
    },
    background: {
      color1: appStyles.color1dark,
      color2: appStyles.color2dark,
      color3: appStyles.color3dark,
    },
  },
  typography: {
    fontFamily: appStyles.fontFamilyTitle,
    fontSize: 18 * fontScale,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 700,
    h1: { ...appStyles.h1(fontScale), color: appStyles.primaryColorDark },
    h2: { ...appStyles.h2(fontScale), color: appStyles.secondaryColorDark },
    h3: { ...appStyles.h3(fontScale), color: "#D3D3D3" },
    h4: appStyles.h4(fontScale),
    h5: appStyles.h5(fontScale),
    h6: appStyles.h6(fontScale),
    button: appStyles.button(fontScale),
    subtitle1: appStyles.subtitle1(fontScale),
    body1: appStyles.body1(fontScale),
    subtitle2: appStyles.subtitle2(fontScale),
    body2: appStyles.body2(fontScale),
    caption: appStyles.caption(fontScale),
  },
});

export const getTheme = (options: { fontScale: number; darkMode: boolean }) => {
  const fontScale = options.fontScale || 1;
  if (options.darkMode) {
    return createTheme(getDarkTheme(fontScale));
  } else {
    return createTheme(getLightTheme(fontScale));
  }
};
