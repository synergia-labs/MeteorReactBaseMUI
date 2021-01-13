import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {isMobile} from "/imports/libs/deviceVerify";
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
    props: {
        MuiButton: {
            size: 'small',
        },
        MuiFilledInput: {
            margin: 'dense',
        },
        MuiFormControl: {
            margin: 'dense',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiListItem: {
            dense: true,
        },
        MuiOutlinedInput: {
            margin: 'dense',
        },
        MuiFab: {
            size: 'small',
        },
        MuiTable: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'normal',
        },
        MuiToolbar: {
            variant: 'dense',
        },
    },
    overrides: {
        MuiButton: { // Name of the component ⚛️ / style sheet
            root: {
                margin: isMobile?0:4,
            },
            text: { // Name of the rule
                color: appStyles.textButtonColor, // Some CSS
            },
        },
        MuiIconButton: {
            root: {
                // Ajusta o espaçamento para atingir o mínimo de toque
                marginLeft: 4,
                marginRight: 4,
                padding: 12,
            },
        },
    },
});



