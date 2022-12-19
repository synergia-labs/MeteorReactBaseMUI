import { createTheme, ThemeOptions } from '@mui/material/styles';
import * as appStyles from './styles';

interface IBackgroundThemeOptions extends ThemeOptions.palette.background {
    color1: string;
    color2: string;
    color3: string;
}

export interface IThemeOptionsBoilerplate extends ThemeOptions {
    palette: ThemeOptions['palette'] & {
        background: IBackgroundThemeOptions;
        textDisabled: string;
        textAuxiliar: string;
        textWhite: string;
    };
}

const getLightTheme = (props: {
    fontScale: number;
    isMobile: boolean;
}): IThemeOptionsBoilerplate => {
    const { fontScale, isMobile } = props;

    return {
        palette: {
            primary: {
                main: appStyles.primariaClara,
                contrastText: '#FFF',
            },
            secondary: {
                main: appStyles.secundariaClara,
                contrastText: '#FFF',
            },
            text: {
                primary: appStyles.preto,
                secondary: appStyles.cinzaEscuro,
                disabled: appStyles.cinzaClaro,
            },
            background: {
                paper: appStyles.branco,
                default: appStyles.branco,
                color1: appStyles.color1,
                color2: appStyles.color2,
                color3: appStyles.color3,
            },
            textDisabled: appStyles.cinzaClaro,
            textAuxiliar: appStyles.cinzaClaro,
            textWhite: appStyles.branco,
            divider: appStyles.cinzaBackground,
        },
        typography: {
            fontFamily: appStyles.fontFamily,
            fontSize: 18 * fontScale,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 600,
            fontWeightBold: 700,
            h1: { ...appStyles.h1(fontScale), color: appStyles.preto },
            h2: { ...appStyles.h2(fontScale), color: appStyles.preto },
            h3: { ...appStyles.h3(fontScale), color: '#D3D3D3' },
            h4: appStyles.h4(fontScale),
            h5: appStyles.h5(fontScale),
            h6: appStyles.h6(fontScale),
            h7: appStyles.h7(fontScale),
            h8: appStyles.h8(fontScale),
            h9: appStyles.h9(fontScale),
            h10: appStyles.h10(fontScale),
            subtitulo1: appStyles.subtitulo1(fontScale),
            subtitulo2: appStyles.subtitulo2(fontScale),
            subtitulo3: appStyles.subtitulo3(fontScale),
            corpo1: appStyles.corpo1(fontScale),
            corpo2: appStyles.corpo2(fontScale),
            descricao: appStyles.descricao(fontScale),
            menu1: appStyles.menu1(fontScale),
            menu2: appStyles.menu2(fontScale),
            botao1: appStyles.botao1(fontScale),
            botao2: appStyles.botao2(fontScale),
            caption1: appStyles.caption1(fontScale),
            caption2: appStyles.caption2(fontScale),
            caption3: appStyles.caption3(fontScale),

            // Remover após estilização (estilos antigos que ainda estão no sistema)
            // button: appStyles.botao1(fontScale),
            subtitle1: appStyles.subtitulo1(fontScale),
            body1: appStyles.corpo1(fontScale),
            subtitle2: appStyles.subtitulo2(fontScale),
            body2: appStyles.corpo2(fontScale),
            caption: appStyles.caption1(fontScale),
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                b1367: 1367,
                xl: 1536,
            },
        },
        components: {
            MuiChip: {
                defaultProps: {},
                variants: [
                    {
                        props: { variant: 'tema' },
                        style: {
                            height: '40px',
                            borderRadius: '25px',
                            border: `2px solid rgba(217, 217, 217, 0.4)`,
                            color: appStyles.branco,
                            background: appStyles.chipBackgroundTema,
                            padding: '10px 8px 10px 8px',
                            ...appStyles.menu1(fontScale),
                            '&:hover': {
                                border: `2px solid ${appStyles.branco}`,
                                background: appStyles.branco,
                                color: appStyles.preto,
                            },
                        },
                    },
                    {
                        props: { variant: 'categoria' },
                        style: {
                            height: '20px',
                            borderRadius: `25px`,
                            backgroundColor: appStyles.chipBackgroundCategoria,
                            padding: '2px 4px 2px 4px',
                            color: appStyles.branco,
                            ...appStyles.caption3(fontScale),
                        },
                    },
                    {
                        props: { variant: 'formulario' },
                        style: {
                            height: '40px',
                            borderRadius: '25px',
                            border: `2px solid rgba(217, 217, 217, 0.4)`,
                            color: appStyles.preto,
                            background: appStyles.branco,
                            padding: '10px 8px 10px 8px',
                            ...appStyles.menu1(fontScale),
                            '.MuiChip-deleteIcon': {
                                color: appStyles.primariaEscura,
                                '&:hover': {
                                    color: appStyles.primariaEscura,
                                },
                            },
                        },
                    },
                ],
                styleOverrides: {
                    root: {
                        ...appStyles.subtitulo1(fontScale),
                        fontFamily: appStyles.fontFamily,
                        margin: isMobile ? 0 : 1,
                    },
                },
            },

            MuiTablePagination: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiSelect-select':
                            {
                                ...appStyles.caption1(1),
                                color: appStyles.cinzaEscuro,
                            },
                        '.MuiSelect-select': {
                            color: 'black',
                            background: 'white',
                            border: '2px solid #E6E6E6',
                            borderRadius: '5px',
                        },
                    },
                },
            },

            MuiDataGrid: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        border: '0px',
                        borderRadius: '15px 15px 0 0',
                        // color: appStyles.color1dark,
                        color: '#000',
                        '& .MuiCircularProgress-root': {
                            color: appStyles.primaryColor,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            '& .MuiDataGrid-columnSeparator': {
                                visibility: 'hidden',
                            },
                            borderRadius: '0px',
                            borderBottom: `1px solid ${appStyles.cinzaBackground}`,
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: `2px solid ${appStyles.cinzaBackground}`,
                        },
                        '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
                            {
                                outline: 'none',
                            },
                        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-actionsCell': {
                            gap: '0px',
                            '& button': {
                                color: 'black',
                            },
                        },
                    },
                    row: {
                        cursor: 'pointer',
                    },
                },
            },
            MuiBox: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        maxHeight: '100vh',
                    },
                },
            },
            MuiSlider: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        color: appStyles.primariaEscura,
                        thumb: {
                            color: 'black',
                        },
                    },
                },
            },
            MuiModal: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        '&.MuiBox-root': {
                            maxHeight: '100vh',
                        },
                    },
                },
            },

            MuiButton: {
                defaultProps: {
                    size: 'medium',
                    variant: 'botaoPrimario',
                },
                variants: [
                    {
                        props: { variant: 'botaoPrimario' },
                        style: {
                            background: appStyles.primariaEscura,
                            color: appStyles.branco,
                            borderRadius: `50px`,
                            border: `2px solid transparent`,
                            zIndex: 1,
                            position: 'relative',
                            transition: 'border 100ms',

                            '&::before': {
                                position: 'absolute',
                                content: '""',
                                width: 'calc(100% + 4px)',
                                height: 'calc(100% + 4px)',
                                top: -2,
                                left: -2,
                                background: appStyles.gradientePrincipal,
                                opacity: 1,
                                zIndex: -1,
                                borderRadius: '50px',
                                transition: 'all 100ms',
                            },
                            '&:hover': {
                                border: `2px solid rgba(0, 0, 0, 0.2)`,
                                background: appStyles.primariaEscura,
                                transition: 'border 100ms',
                            },
                            '&:hover::before': {
                                opacity: 0,
                                transition: 'all 100ms',
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                            '&.Mui-disabled': {
                                color: appStyles.preto,
                                background: appStyles.cinzaClaro,
                                borderRadius: '50px',
                                opacity: 0.5,
                            },
                        },
                    },
                    {
                        props: { variant: 'botaoSecundario' },
                        style: {
                            border: `2px solid ${appStyles.primariaEscura}`,
                            color: appStyles.primariaEscura,
                            backgroundColor: 'transparent',
                            borderRadius: '50px',

                            '&:hover': {
                                backgroundColor: appStyles.backgroundClaro,
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                            '&.Mui-disabled': {
                                color: appStyles.cinzaClaro,
                                borderColor: appStyles.cinzaClaro,
                                opacity: 0.5,
                            },
                        },
                    },
                    {
                        props: { variant: 'botaoTexto1' },
                        style: {
                            color: appStyles.primariaEscura,
                            padding: 0,
                            background: 'transparent',
                            margin: '0 1rem',
                            '&:hover': {
                                textDecoration: 'underline',
                                background: 'transparent',
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                        },
                    },
                    {
                        props: { variant: 'botaoTexto2' },
                        style: {
                            color: appStyles.preto,
                            padding: 0,
                            background: 'transparent',
                            margin: '0 1rem',
                            textDecoration: 'underline',
                            '&:hover': {
                                background: 'transparent',
                                textDecoration: 'underline',
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                        },
                    },
                    {
                        props: { variant: 'outlined' },
                        style: {
                            color: appStyles.primariaEscura,
                            padding: '0',
                            border: `2px solid ${appStyles.primariaEscura}`,
                            background: 'transparent',
                            margin: '0 1rem',
                            '&:hover': {
                                background: appStyles.backgroundClaro,
                                border: `2px solid ${appStyles.primariaEscura}`,
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                            ...appStyles.botao1(fontScale),
                        },
                    },
                    {
                        props: { variant: 'estilo1' },
                        style: {
                            background: appStyles.gradientePrincipal,
                            color: appStyles.branco,
                            borderRadius: `50px`,
                            border: `2px solid transparent`,
                            zIndex: 1,
                            position: 'relative',
                            margin: '1rem 0',
                            '&::before': {
                                position: 'absolute',
                                content: '""',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                background: appStyles.primariaEscura,
                                opacity: 0,
                                zIndex: -1,
                                borderRadius: '50px',
                            },
                            '&:hover': {
                                border: `2px solid rgba(0, 0, 0, 0.2)`,
                            },
                            '&:hover::before': {
                                opacity: 1,
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                            '&.Mui-disabled': {
                                color: appStyles.preto,
                                background: appStyles.cinzaClaro,
                                borderRadius: '50px',
                                opacity: 0.5,
                            },
                        },
                    },
                    {
                        props: { variant: 'estilo2' },
                        style: {
                            border: `2px solid ${appStyles.primariaEscura}`,
                            color: appStyles.primariaEscura,
                            backgroundColor: 'transparent',
                            borderRadius: '50px',
                            margin: '1rem 0',
                            '&:hover': {
                                backgroundColor: appStyles.backgroundClaro,
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                            '&.Mui-disabled': {
                                color: appStyles.cinzaClaro,
                                borderColor: appStyles.cinzaClaro,
                                opacity: 0.5,
                            },
                        },
                    },
                    {
                        props: { variant: 'estilo3' },
                        style: {
                            color: appStyles.primariaEscura,
                            padding: 0,
                            background: 'transparent',
                            margin: '1rem 1rem',
                            '&:hover': {
                                textDecoration: 'underline',
                                background: 'transparent',
                            },
                            '&:focus': {
                                outline: 'none',
                            },
                        },
                    },
                ],
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        textTransform: 'none',
                        ...appStyles.botao1(fontScale),
                        '&.MuiButton-sizeSmall': {
                            padding: '6px 1.5rem',
                            '@media screen and (max-width: 1367px)': {
                                padding: '4px 1.15rem',
                            },
                            '@media screen and (max-width: 600px)': {
                                padding: '4px 1rem',
                            },
                        },
                        '&.MuiButton-sizeMedium': {
                            padding: '8px 2rem',
                            '@media (max-width: 1367px)': {
                                padding: '6px 1.5rem',
                            },
                            '@media (max-width: 600px)': {
                                padding: '6px 1.5rem',
                            },
                        },
                        '&.MuiButton-sizeLarge': {
                            ...appStyles.botao2(fontScale),
                            padding: '10px 2.5rem',
                            height: '48px',
                            '@media screen and (max-width: 1367px)': {
                                padding: '7px 1.25rem',
                                height: '40px',
                                ...appStyles.botao2(fontScale),
                            },
                            '@media screen and (max-width: 600px)': {
                                padding: '6px 1.5rem',
                                height: '36px',
                                ...appStyles.botao2(fontScale),
                            },
                        },
                    },
                },
            },

            MuiButtonBase: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        padding: 0,
                    },
                },
            },

            MuiFormHelperText: {
                defaultProps: {
                    margin: 'dense',
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

            MuiPickersCalendarHeader: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        color: 'black',
                    },
                    labelContainer: {
                        maxHeight: '100px',
                        width: 'fit-content',
                        flexWrap: 'no-wrap',
                        ...appStyles.caption1(fontScale),
                    },
                },
            },

            MuiListItemText: {
                defaultProps: {},
                styleOverrides: {
                    primary: {
                        ...appStyles.descricao(fontScale),
                    },
                    secondary: {
                        ...appStyles.caption3(fontScale),
                    },
                },
            },

            MuiDatePickerToolbar: {
                defaultProps: {},
                styleOverrides: {
                    title: {
                        ...appStyles.h9(fontScale),
                    },
                },
            },

            MuiCalendarOrClockPicker: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        paddingBottom: '-5rem',
                    },
                },
            },

            MuiLocalizationProvider: {
                defaultProps: {
                    root: {},
                    localeText: {
                        cancelButtonLabel: 'Cancelar',
                    },
                },
                styleOverrides: {
                    root: {
                        background: 'black',
                    },
                },
            },

            MuiCheckbox: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        '&.Mui-checked': {
                            color: appStyles.primariaEscura,
                        },
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
                        //color: appStyles.preto,
                    },
                },
            },

            MuiSnackbarContent: {
                defaultProps: {
                    margin: 'dense',
                },
                styleOverrides: {
                    root: { padding: 0 },
                    message: { padding: 0 },
                },
            },

            MuiInputBase: {
                defaultProps: {
                    margin: 'dense',
                },
                styleOverrides: {
                    root: {
                        fontFamily: appStyles.fontFamily,
                        fontSize: 14 * fontScale,
                        padding: '10px 16px',
                        '&.Mui-selected:focus': {
                            background: appStyles.backgroundEscuro,
                        },
                        '&.Mui-disabled': {
                            color: appStyles.corTexto,
                            background: appStyles.cinzaClaro,
                            border: `1px solid ${appStyles.cinzaEscuro}`,
                            outline: 'none',
                        },
                    },
                    input: {
                        '&::placeholder': {
                            color: '#5A5A5A',
                        },
                        '&:-webkit-autofill': {
                            WebkitBoxShadow: '0 0 0 100px #fff inset',
                        },
                        '&.Mui-disabled': {
                            color: appStyles.corTexto,
                            outline: 'none',
                        },
                        padding: '4px 5px',
                        fontFamily: appStyles.fontFamily + ' !important',
                        fontSize: 14 * fontScale + ' !important',
                        '&:focus': {
                            backgroundColor: 'transparent',
                        },
                    },
                },
            },

            MuiFilledInput: {
                defaultProps: {
                    margin: 'dense',
                    disableUnderline: true,
                },
                styleOverrides: {
                    root: {
                        padding: 0,
                        borderRadius: '10px',
                        transition: 'background-color 300ms',
                        ...appStyles.corpo1(fontScale),
                        color: appStyles.corTexto,
                        backgroundColor: appStyles.backgroundClaro,
                        border: `1px solid transparent`,
                        '&:hover': {
                            borderColor: appStyles.cinzaBackground,
                            background: appStyles.backgroundClaro,
                            transition: 'background-color 300ms',
                        },
                        '&.Mui-focused': {
                            background: appStyles.backgroundClaro,
                            color: appStyles.corTexto,
                            border: `1px solid ${appStyles.preto}`,
                        },
                        '&.Mui-disabled': {
                            backgroundColor: appStyles.cinzaClaro,
                            border: `1px solid ${appStyles.cinzaEscuro}`,
                            color: appStyles.corTexto,
                        },
                    },
                    input: {
                        padding: '0.5rem 1.25rem',
                        borderRadius: 'inherit',
                        '&.Mui-disabled': {
                            color: appStyles.corTexto,
                            WebkitTextFillColor: appStyles.corTexto,
                            outline: 'none',
                        },
                        '&:focus': {
                            color: appStyles.preto,
                        },
                        '&.Mui-error': {
                            color: appStyles.preto,
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

            MuiOutlinedInput: {
                defaultProps: {
                    margin: 'dense',
                },
                styleOverrides: {
                    root: {
                        ...appStyles.corpo1(fontScale),
                        padding: '10px 16px',
                        borderRadius: '10px',
                        background: `${appStyles.gradienteLinear} padding-box, ${appStyles.gradienteVidroClaro} border-box`,
                        '&:hover': {
                            background: appStyles.backgroundClaro,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: appStyles.cinzaBackground,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: `1px solid ${appStyles.cinzaBackground}`,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: appStyles.cinzaBackground,
                        },

                        '&.Mui-disabled': {
                            background: appStyles.cinzaClaro,
                            border: `1px solid ${appStyles.cinzaEscuro}`,
                            outline: 'none',
                            WebkitTextFillColor: appStyles.corTexto,
                        },
                        '&.Mui-focused': {
                            borderColor: appStyles.preto,
                            backgroundColor: appStyles.branco,
                        },
                        '&.Mui-error ': {
                            borderColor: appStyles.erro,
                        },
                    },
                    input: {
                        padding: 0,
                        '&.Mui-disabled': {
                            color: appStyles.corTexto,
                            WebkitTextFillColor: appStyles.corTexto,
                            outline: 'none',
                        },
                        '&:focus': {
                            color: appStyles.preto,
                        },
                        '&.Mui-error': {
                            color: appStyles.preto,
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
                    margin: 'normal',
                    variant: 'filled',
                },
                styleOverrides: {
                    root: {
                        width: '100%',
                        marginTop: 0,
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
                    root: {
                        color: appStyles.cinzaClaro,
                    },
                },
            },

            MuiMenuItem: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        '&:hover': {
                            color: appStyles.preto,
                            background: appStyles.backgroundClaro,
                        },
                        '&.Mui-selected': {
                            background: appStyles.backgroundEscuro,
                        },
                        '&.Mui-selected:hover': {
                            background: appStyles.backgroundEscuro,
                        },
                        '&.Mui-selected:focus': {
                            background: appStyles.backgroundEscuro,
                        },
                    },
                },
            },

            MuiTab: {
                defaultProps: {},
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontFamily: appStyles.fontFamily,
                        color: appStyles.cinzaEscuro,
                        margin: isMobile ? 0 : '0 1rem -1rem 1rem',
                        padding: '1rem 0 1rem 0',
                        width: '12.5rem',
                        '&:hover': {
                            color: appStyles.preto,
                            background: 'white',
                        },
                        '&.Mui-selected': {
                            outline: 'none',
                            color: appStyles.primariaEscura,
                        },
                        '&.Mui-focusVisible': {
                            backgroundColor: 'blue',
                        },
                        ...appStyles.menu1(fontScale),
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
                defaultProps: { variant: 'filled' },
                variants: [
                    {
                        props: { variant: 'outlined' },
                        style: {
                            ...appStyles.corpo1(fontScale),
                            color: appStyles.preto,
                            '&.Mui-focused': { color: appStyles.preto },
                            '&:hover': {
                                background: appStyles.backgroundClaro,
                            },
                            select: {
                                ...appStyles.corpo1(fontScale),
                                fontSize: 14 * fontScale,
                                color: appStyles.preto,
                                '&:hover': {
                                    background: appStyles.cinzaBackground,
                                },
                            },
                            icon: {
                                color: 'black',
                                marginRight: '1rem',
                            },
                            input: {
                                ...appStyles.corpo1(fontScale),
                            },
                        },
                    },
                    {
                        props: { variant: 'filled' },
                        style: {
                            ...appStyles.corpo1(fontScale),
                            color: appStyles.corTexto,
                            background: appStyles.backgroundClaro,
                            '&.Mui-focused': { borderColor: appStyles.preto },
                            '&:hover': {
                                borderColor: appStyles.cinzaBackground,
                            },
                            select: {
                                ...appStyles.corpo1(fontScale),
                                fontSize: 14 * fontScale,
                                color: appStyles.primariaEscura,
                                '&:hover': {
                                    background: appStyles.cinzaBackground,
                                },
                                '&:focus': {
                                    color: appStyles.primariaEscura,
                                    border: appStyles.preto,
                                },
                            },
                            icon: {
                                color: 'black',
                                marginRight: '1rem',
                            },
                            input: {
                                ...appStyles.corpo1(fontScale),
                            },
                        },
                    },
                ],
            },

            MuiDialog: {
                defaultProps: {},
                styleOverrides: {
                    paper: {
                        minWidth: isMobile ? '90%' : '400px',
                        minHeight: isMobile ? '30%' : '190',
                        maxHeight: isMobile ? '90%' : '90%',
                        // maxWidth:'90%',
                        maxWidth: isMobile ? '90%' : '1200px',
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
                        right: isMobile ? 0 : 10,
                        width: isMobile ? '100%' : 360, //,drawerWidth,
                        height: isMobile ? '100%' : 'calc(100% - 85px)',
                        // boxShadow: '-10px 20px 20px -18px #000000, 12px 0px 20px -18px #000000',
                        overflowY: 'auto',
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
                        // color: appStyles.primaryColor,
                    },
                    endAdornment: {
                        top: 'unset',
                    },
                },
            },
            MuiTypography: {
                defaultProps: {
                    variantMapping: {
                        h1: 'h1',
                        h2: 'h2',
                        h3: 'h3',
                        h4: 'h4',
                        h5: 'h5',
                        h6: 'h6',
                        subtitle1: 'p',
                        subtitle2: 'p',
                        body1: 'p',
                        body2: 'p',
                        caption: 'p',
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
                        fontWeight: 'normal',
                    },
                },
            },
        },
    };
};

const getDarkTheme = (props: {
    fontScale: number;
    isMobile: boolean;
}): IThemeOptionsBoilerplate => {
    const { fontScale, isMobile } = props;
    return {
        ...getLightTheme(props),
        palette: {
            mode: 'dark',
            primary: {
                main: appStyles.primariaClara,
            },
            secondary: {
                main: appStyles.secundariaEscura,
            },
            background: {
                color1: appStyles.color1dark,
                color2: appStyles.color2dark,
                color3: appStyles.color3dark,
            },
        },
        typography: {
            ...getLightTheme(props).typography,
            fontFamily: appStyles.fontFamily,
            fontSize: 18 * fontScale,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 600,
            fontWeightBold: 700,
            h1: { ...appStyles.h1(fontScale), color: appStyles.primariaClara },
            h2: { ...appStyles.h2(fontScale), color: appStyles.secundariaEscura },
            h3: { ...appStyles.h3(fontScale), color: '#D3D3D3' },
            h4: appStyles.h4(fontScale),
            h5: appStyles.h5(fontScale),
            h6: appStyles.h6(fontScale),
            h7: appStyles.h7(fontScale),
            h8: appStyles.h8(fontScale),
            h9: appStyles.h9(fontScale),
            h10: appStyles.h10(fontScale),
        },
    };
};

export const getTheme = (options: { fontScale: number; darkMode: boolean; isMobile: boolean }) => {
    const fontScale = options.fontScale || 1;
    const isMobile = options.isMobile || false;
    if (options.darkMode) {
        return createTheme(getDarkTheme({ fontScale, isMobile }));
    } else {
        return createTheme(getLightTheme({ fontScale, isMobile }));
    }
};
