import { createTheme } from "@mui/material/styles";
import { isMobile } from "/imports/libs/deviceVerify";
import * as appStyles from "./styles";

export const theme = createTheme({
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
    },
    textDisabled: appStyles.textDisabled,
    textAuxiliar: appStyles.textAuxiliar,
    textWhite: appStyles.textWhite,
    divider: appStyles.supportColor,
  },
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontSize: 16,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 700,
    h1: appStyles.h1,
    h2: appStyles.h2,
    h3: appStyles.h3,
    h4: appStyles.h4,
    h5: appStyles.h5,
    h6: appStyles.h6,
    button: appStyles.button,
    subtitle1: appStyles.subtitle1,
    body1: appStyles.body1,
    subtitle2: appStyles.subtitle2,
    body2: appStyles.body2,
    caption: appStyles.caption,
  },
  // shape: {
  //     borderRadius: '16px',
  // },
  components: {
    muiChip: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontFamily: "PT Sans",
          margin: isMobile ? 0 : 4,
        },
        text: {
          // Name of the rule
          fontFamily: "PT Sans",
          color: appStyles.textButtonColor, // Some CSS
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
    MuiButton: {
      defaultProps: {},
      styleOverrides: {
        root: {
          margin: isMobile ? 0 : 4,
          fontFamily: "PT Sans",
        },
        text: {
          // Name of the rule
          color: appStyles.textButtonColor, // Some CSS
          fontFamily: "PT Sans",
        },
      },
    },

    MuiButtonBase: {
      // Name of the component ⚛️ / style sheet
      defaultProps: {},
      styleOverrides: {
        root: {
          fontFamily: "PT Sans",
        },
        text: {
          // Name of the rule
          color: appStyles.textButtonColor, // Some CSS
          fontFamily: "PT Sans",
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
        },
      },
    },

    MuiIcon: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
        },
      },
    },

    MuiSvgIcon: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
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
          fontFamily: "PT Sans",
          fontSize: "14px",
          fontWeight: "normal",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: 1.2,
          letterSpacing: "0.7px",
          textAlign: "left",
          color: "#222020",
          textTransform: "none",
          outline: "none",
          borderRadius: 15,
          marginTop: 4,
          "&$disabled": {
            color: "#777",
            backgroundColor: "#f2f2f2",
            outline: "none",
          },
        },
        input: {
          "&$disabled": {
            color: "#777",
            backgroundColor: "#f2f2f2",
            outline: "none",
          },
          fontFamily: "PT Sans !important",
          fontSize: "14px !important",
          fontWeight: "normal !important",
          fontStretch: "normal !important",
          fontStyle: "normal !important",
          lineHeight: 1.2,
          letterSpacing: "0.7px !important",
          textAlign: "left !important",
          color: "#222020",
        },
      },
    },

    MuiOutlinedInput: {
      defaultProps: {
        margin: "dense",
      },
      styleOverrides: {
        input: {
          backgroundColor: "#FFFFFF",
          "&.Mui-disabled": {
            color: "#777",
            backgroundColor: "#f2f2f2",
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
          backgroundColor: appStyles.surfaceColor,
          border: `1px solid ${appStyles.supportColor}`,
          transition: "background-color 300ms",
          "&:hover": {
            backgroundColor: appStyles.backgroundColor,
            transition: "background-color 300ms",
          },
          "&.Mui-focused": {
            border: `1px solid ${appStyles.secondaryColor}`,
          },
          "&.Mui-disabled": {
            backgroundColor: appStyles.disabledBackground,
            border: `1px solid ${appStyles.disabledBackground}`,
            color: appStyles.textDisabled,
          },
          "&.Mui-error": {
            border: `1px solid ${appStyles.errorColor}`,
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
      styleOverrides: {
        indicator: {
          background: appStyles.secondaryColor,
          height: "4px",
        },
      },
    },

    MuiTab: {
      defaultProps: {},
      styleOverrides: {
        root: {
          fontFamily: "PT Sans",
          margin: isMobile ? 0 : 4,
        },
      },
    },

    MuiFormControl: {
      defaultProps: {},
      styleOverrides: {
        root: {
          borderRadius: 30,
          backgroundColor: "#FFFFFF",
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
          fontFamily: "PT Sans",
          fontSize: "14px",
          fontWeight: "normal",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: 1.2,
          letterSpacing: "0.7px",
          textAlign: "left",
          color: "#222020",
          textTransform: "none",
          outline: "none",
        },
        select: {
          fontFamily: "PT Sans",
          fontSize: "14px",
          fontWeight: "normal",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: 1.2,
          letterSpacing: "0.7px",
          textAlign: "left",
          color: "#222020",
          textTransform: "none",
          outline: "none",
          height: 51,
          paddingTop: 0,
          paddingBottom: 0,
          display: "flex",
          flxDirection: "row",
          alignItems: "center",
          backgroundColor: "#ffffff",
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
        paper: {
          width: isMobile ? "100%" : "unset",
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
          color: appStyles.primaryColor,
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
      styleOverrides: {
        root: {
          fontFamily: "PT Sans",
          fontSize: "14px",
          fontWeight: "normal",
          fontStretch: "normal",
          fontStyle: "normal",
          width: "100%",
        },
        h6: {
          width: "100%",
        },
      },
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
          backgroundColor: "rgba(30, 30, 30, 0.9)",
          color: appStyles.textWhite,
          fontWeight: "normal",
        },
      },
    },
  },
});
