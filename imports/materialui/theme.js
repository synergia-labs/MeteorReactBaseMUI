import {createMuiTheme} from '@material-ui/core/styles';
import {isMobile} from '/imports/libs/deviceVerify';
import * as appStyles from './styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: appStyles.primaryColor,
        },
        secondary: {
            main: appStyles.secondaryColor,
        },
    },
    typography: {
        body1: {
            // fontFamily: "'PT'",
        },
        body2: {
            // fontFamily: "'PT'",
        },
        h1: {
            // fontFamily: "'PT'",
        },
        h2: {
            // fontFamily: "'PT'",
        },
        h3: {
            // fontFamily: "'PT'",
        },
        h4: {
            // fontFamily: "'PT'",
        },
        h5: {
            // fontFamily: "'PT'",
        },
    },
    props: {
        MuiButton: {
            // fontFamily: "'PT'",
            size: 'small',
        },
        MuiFilledInput: {
            // fontFamily: "'PT'",
            margin: 'dense',
        },
        MuiFormControl: {
            // fontFamily: "'PT'",
        },
        MuiFormHelperText: {
            // fontFamily: "'PT'",
            margin: 'dense',
        },
        MuiIconButton: {
            // fontFamily: "'PT'",
            size: 'small',
        },
        MuiInputBase: {
            // fontFamily: "'PT'",
            margin: 'dense',
        },
        MuiInputLabel: {
            // fontFamily: "'PT'",
            margin: 'dense',
        },
        MuiListItem: {
            // fontFamily: "'PT'",
            dense: true,
        },
        MuiOutlinedInput: {
            // fontFamily: "'PT'",
            margin: 'dense',
        },
        MuiFab: {
            // fontFamily: "'PT'",
            size: 'small',
        },
        MuiTable: {
            // fontFamily: "'PT'",
            size: 'small',
        },
        MuiTextField: {
            // fontFamily: "'PT'",
            margin: 'normal',
        },
        MuiToolbar: {
            // fontFamily: "'PT'",
            variant: 'dense',
        },
    },
    overrides: {
        MuiButton: { // Name of the component ⚛️ / style sheet
            root: {
                // fontFamily: "'PT'",
                margin: isMobile ? 0 : 4,
            },
            text: { // Name of the rule
                // fontFamily: "'PT'",
                color: appStyles.textButtonColor, // Some CSS
            },
        },
        MuiButtonBase: { // Name of the component ⚛️ / style sheet
            root: {
                // fontFamily: "'PT'",
                margin: isMobile ? 0 : 4,
            },
            text: { // Name of the rule
                // fontFamily: "'PT'",
                color: appStyles.textButtonColor, // Some CSS
            },
        },
        MuiChip: { // Name of the component ⚛️ / style sheet
            root: {
                // fontFamily: "'PT'",
                margin: isMobile ? 0 : 4,
            },
            text: { // Name of the rule
                // fontFamily: "'PT'",
                color: appStyles.textButtonColor, // Some CSS
            },
        },
        MuiTab: { // Name of the component ⚛️ / style sheet
            root: {
                // fontFamily: "'PT'",
                margin: isMobile ? 0 : 4,
            },
        },
        MuiIconButton: {
            root: {
                // Ajusta o espaçamento para atingir o mínimo de toque
                marginLeft: 4,
                marginRight: 4,
                padding: 12,
                // fontFamily: "'PT'",
            },
        },
        MuiFormControl: {
            marginNormal: {
                marginTop: 0,
                // fontFamily: "'PT'",
            },
        },
        MuiTextField: {
            root: {
                width: '100%',
                // fontFamily: "'PT'",
            },

        },
        MuiTableCell: {
            root: {
                // fontFamily: "'PT'",
            },
        },
        MuiOutlinedInput: {
            root: {
                // fontFamily: "'PT'",
            },
        },
        MuiInputBase: {
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
            },
            input: {
                '&$disabled': {
                    color:"#777",
                    backgroundColor:'#f3f3f3',
                    border:'1px solid #DDD'
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
        MuiAutocomplete: {
            popupIndicator: {
                padding: '0px 0px 3px 0px',
                marginRight: 0,
            },
        },
        MuiTypography: {
            root: {
                width: '100%',
            },
            h6: {
                width: '100%',
            },
        },
    },
});
