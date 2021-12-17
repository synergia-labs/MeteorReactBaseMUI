import {createTheme} from '@mui/material/styles';
import {isMobile} from '/imports/libs/deviceVerify';
import * as appStyles from './styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: appStyles.primaryColor,
            contrastText: '#FFF',
        },
        secondary: {
            main: appStyles.secondaryColor,
            contrastText: '#FFF',
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
    shape: {
        borderRadius: '16px',
    },
    components: {
        muiChip: {
            defaultProps: {},
            styleOverrides: {
                root: {
                    margin: isMobile ? 0 : 4,
                },
                text: { // Name of the rule
                    color: appStyles.textButtonColor, // Some CSS
                },
            },
        },
        MuiBox: {
            defaultProps: {
            },
            styleOverrides: {
                root: {
                    maxHeight:'100vh',
                },

            }
        },
        MuiModal: {
            defaultProps: {
            },
            styleOverrides: {
                root: {
                    '&.MuiBox-root': {
                        maxHeight:'100vh',
                    },
                },

            }
        },
        MuiButton: {
            defaultProps: {
                size: 'small',
                variant: 'secondary',
            },
            styleOverrides: {
                root: {
                    borderRadius: 30,
                    padding: '6px 24px',
                    margin: isMobile ? '0 8px' : '0 16px',
                    textTransform: 'none',
                    '&.MuiButton-sizeSmall': {
                        padding: '4px 22px',
                    },
                    '&.MuiButton-sizeLarge': {
                        padding: '10px 46px',
                    },
                },
                primary: {
                    padding: '6px 24px',
                    backgroundImage: appStyles.primaryGradient,
                    color: appStyles.textWhite,
                    '&:hover': {
                        backgroundImage: appStyles.primaryGradientOnHover,
                    },
                    '&:focus': {
                        outline: 'none',
                    },
                    '&.MuiButton-sizeSmall': {
                        padding: '6px 24px',
                    },
                    '&.MuiButton-sizeLarge': {
                        padding: '12px 48px',
                    },
                    '&.Mui-disabled': {
                        color: appStyles.textDisabled,
                        backgroundColor: appStyles.disabledBackground,
                        backgroundImage: 'none',
                        opacity: 1,
                    },
                },
                secondary: {
                    padding: '4px 22px',
                    border: `2px solid ${appStyles.secondaryColor}`,
                    '&:hover': {
                        backgroundColor: appStyles.secondaryColorOnHover,
                        border: `2px solid ${appStyles.secondaryColor}`,
                    },
                    '&:focus': {
                        outline: 'none',
                        backgroundColor: appStyles.secondaryColorOnHover,
                    },
                    '&.MuiButton-sizeSmall': {
                        padding: '4px 22px',
                    },
                    '&.MuiButton-sizeLarge': {
                        padding: '10px 46px',
                    },
                    '&.Mui-disabled': {
                        color: appStyles.textDisabled,
                        borderColor: appStyles.supportColor,
                        opacity: 1,
                    },
                },
            },
        },

        MuiButtonBase: { // Name of the component ⚛️ / style sheet
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {},
        },

        MuiFormHelperText: {
            defaultProps: {
                margin: 'dense',
            },
            styleOverrides: {},
        },

        MuiIconButton: {
            defaultProps: {
                size: 'small',
                color: 'primary',
            },
            styleOverrides: {},
        },

        MuiIcon: {
            defaultProps: {},
            styleOverrides: {
                root: {
                    fontSize: '1.5rem',
                },
            },
        },

        MuiSvgIcon: {
            defaultProps: {},
            styleOverrides: {
                root: {
                    fontSize: '1.5rem',
                },
            },
        },

        MuiSnackbarContent: {
            defaultProps: {
                margin: 'dense',
            },
            styleOverrides: {
                root: {padding:0},
                message: {padding:0},
            }
        },
        MuiInputBase: {
            defaultProps: {
                margin: 'dense',
            },
            styleOverrides: {
                root: {
                    borderRadius: 30,
                    '&.Mui-disabled': {
                        color: appStyles.textDisabled,
                    },
                },
            },
        },

        MuiInputLabel: {
            defaultProps: {
                margin: 'dense',
            },
            styleOverrides: {},
        },

        MuiFilledInput: {
            defaultProps: {
                margin: 'dense',
                disableUnderline: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 30,
                    backgroundColor: appStyles.surfaceColor,
                    border: `1px solid ${appStyles.supportColor}`,
                    transition: 'background-color 300ms',
                    '&:hover': {
                        backgroundColor: appStyles.backgroundColor,
                        transition: 'background-color 300ms',
                    },
                    '&.Mui-focused': {
                        border: `1px solid ${appStyles.secondaryColor}`,
                    },
                    '&.Mui-disabled': {
                        backgroundColor: appStyles.disabledBackground,
                        border: `1px solid ${appStyles.disabledBackground}`,
                        color: appStyles.textDisabled,
                    },
                    '&.Mui-error': {
                        border: `1px solid ${appStyles.errorColor}`,
                    },
                },
                input: {
                    padding: '8px 24px',
                    borderRadius: 'inherit',
                    '&:focus': {
                        borderRadius: 'inherit',
                    }
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
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {},
        },

        MuiTable: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {},
        },

        MuiTextField: {
            defaultProps: {
                margin: 'normal',
                variant: 'filled',
            },
            styleOverrides: {
                root: {
                    width: '100%',
                },
            },
        },

        MuiToolbar: {
            defaultProps: {
                variant: 'dense',
            },
            styleOverrides: {},
        },

        MuiTabs: {
            defaultProps: {},
            styleOverrides: {
                indicator: {
                    backgroundImage: appStyles.primaryGradient,
                    height: '4px',
                },
            },
        },

        MuiTab: {
            defaultProps: {},
            styleOverrides: {
                root: {
                    margin: isMobile ? 0 : 4,
                    textTransform: 'none',
                    '&.Mui-focused': {
                        outline: 'none',
                    },
                    ...appStyles.h6,
                },
            },
        },

        MuiFormControl: {
            defaultProps: {},
            styleOverrides: {
                root: {
                  borderRadius:30,
                },
                marginNormal: {
                    marginTop: 4,
                },
            },
        },

        MuiSelect: {
            defaultProps: {
                margin: 'normal',
                variant: 'filled',
            },
            styleOverrides: {
                root: {
                    borderRadius: 30,
                    width: '100%',
                },
                icon: {
                    color: appStyles.primaryColor,
                },
            },
        },

        MuiDialog: {

            defaultProps: {},
            styleOverrides: {
                paper: {
                    minWidth:'50%',
                    minHeight:'40%',
                    maxHeight:'90%',
                    maxWidth:'90%'
                },

            },
        },

        MuiAutocomplete: {
            defaultProps: {
                margin: 'normal',
                variant: 'filled',
            },
            styleOverrides: {
                root: {
                    '& .MuiFilledInput-root': {
                        paddingTop: 0,
                    },
                },
                popupIndicator: {
                    color: appStyles.primaryColor,
                },
                endAdornment: {
                    top: 'unset',
                },
            },

        },

        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h1', h2: 'h2', h3: 'h3',
                    h4: 'h4', h5: 'h5', h6: 'h6',
                    subtitle1: 'p', subtitle2: 'p',
                    body1: 'p', body2: 'p', caption: 'p',
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: appStyles.sombraCard,
                },
            }
        },

        MuiTooltip: {
            defaultProps: {
                enterDelay: 300,
            },
            styleOverrides: {
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 30, 0.9)',
                    color: appStyles.textWhite,
                    fontWeight: 'normal',
                },
            },
        },

    },

});
