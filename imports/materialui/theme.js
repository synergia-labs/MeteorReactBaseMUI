import { createTheme } from '@mui/material/styles';
import {isMobile} from '/imports/libs/deviceVerify';
import * as appStyles from './styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: appStyles.primaryColor,
        },
        secondary: {
            main: appStyles.secondaryColor,
        },
    },
    components: {
        muiChip: {
            defaultProps: {
            },
            styleOverrides: {
                root: {
                    // fontFamily: "'PT'",
                    margin: isMobile ? 0 : 4,
                },
                text: { // Name of the rule
                    // fontFamily: "'PT'",
                    color: appStyles.textButtonColor, // Some CSS
                },
            },
        },
        MuiButton: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    margin: isMobile ? 0 : 4,
                },
                text: { // Name of the rule
                    color: appStyles.textButtonColor, // Some CSS
                },
            },

        },
        MuiButtonBase: { // Name of the component ⚛️ / style sheet
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    margin: isMobile ? 0 : 4,
                },
                text: { // Name of the rule
                    color: appStyles.textButtonColor, // Some CSS
                },
            },

        },
        MuiFilledInput: {
            defaultProps: {
                margin: 'dense',
            },
            styleOverrides: {
            },
        },
        MuiFormHelperText: {
            defaultProps: {
                margin: 'dense',
            },
            styleOverrides: {
            },
        },

        MuiIconButton: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    // Ajusta o espaçamento para atingir o mínimo de toque
                    marginLeft: 4,
                    marginRight: 4,
                    padding: 12,
                },
            },
        },

        MuiInputBase: {
            defaultProps: {
                margin: 'dense',
            },
            styleOverrides: {
                root: {
                    // fontFamily: "'PT'",
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 1.2,
                    letterSpacing: '0.7px',
                    textAlign: 'left',
                    color: '#222020',
                    textTransform: 'none',
                    outline: 'none',
                },
                input: {
                    '&$disabled': {
                        color:"#777",
                        backgroundColor:'#f3f3f3',
                        outline: 'none',
                    },
                    // fontFamily: "'PT'",
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 1.2,
                    letterSpacing: '0.7px',
                    textAlign: 'left',
                    color: '#222020',
                    textTransform: 'none',
                },
            },
        },

        MuiInputLabel: {
            defaultProps: {
                margin: 'dense',
            },
            styleOverrides: {
            },
        },

        MuiListItem: {
            defaultProps: {
                dense: true,
            },
            styleOverrides: {
            },
        },


        MuiOutlinedInput: {
            defaultProps: {
                margin: 'dense',
            },
            styleOverrides: {
                root: {
                    backgroundColor:'#f3f3f3',
                },
            },
        },

        MuiFab: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
            },
        },


        MuiTable: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
            },
        },

        MuiTextField: {
            defaultProps: {
                margin: 'normal',
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
            styleOverrides: {
            },
        },


        MuiTab: {
            defaultProps: {

            },
            styleOverrides: {
                root: {
                    // fontFamily: "'PT'",
                    margin: isMobile ? 0 : 4,
                },
            },
        },


        MuiFormControl: {
            defaultProps: {

            },
            styleOverrides: {
                marginNormal: {
                    marginTop: 0,
                    // fontFamily: "'PT'",
                },
            },
        },


        MuiSelect: {
            defaultProps: {

            },
            styleOverrides: {
                root: {
                    // fontFamily: "'PT'",
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 1.2,
                    letterSpacing: '0.7px',
                    textAlign: 'left',
                    color: '#222020',
                    textTransform: 'none',
                    outline: 'none',
                },
                select: {
                    // fontFamily: "'PT'",
                    fontSize: '14px',
                    fontWeight: 'normal',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: 1.2,
                    letterSpacing: '0.7px',
                    textAlign: 'left',
                    color: '#222020',
                    textTransform: 'none',
                    outline: 'none',
                },
            },
        },


        MuiAutocomplete: {

            defaultProps: {

            },
            styleOverrides: {
                popupIndicator: {
                    padding: '0px 0px 3px 0px',
                    marginRight: 0,
                },
            },


        },
        MuiTypography: {
            defaultProps: {

            },
            styleOverrides: {
                root: {
                    width: '100%',
                },
                h6: {
                    width: '100%',
                },
            },

        },


    },

});
