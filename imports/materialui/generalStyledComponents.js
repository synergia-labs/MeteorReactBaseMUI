import { styled } from '@mui/material/styles';
import * as appStyles from './styles';

const mobileFonts = {
    '.legenda1 *': {
        fontSize: '10px !important',
        lineHeight: '16px !important',
    },
    '.legenda2 *': {
        fontSize: '9px !important',
        lineHeight: '10px !important',
    },
    '.citacao1 *': {
        fontSize: '18px !important',
        lineHeight: '24px !important',
    },
    '.citacao2 *': {
        fontSize: '18px !important',
        lineHeight: '24px !important',
    },
    '.destaque1 *': {
        fontSize: '18px !important',
        lineHeight: '24px !important',
    },
    '.destaque2 *': {
        fontSize: '13px !important',
        lineHeight: '18px !important',
    },
    '.hyperlink *': {
        fontSize: '16px',
        lineHeight: '30px',
    },
    '.MuiTypography-subtitle3': {
        fontSize: '16px',
        lineHeight: '24px',
    },
    '.MuiTypography-descricao': {
        fontSize: '11px',
        lineHeight: '18px',
    },
    '.MuiLink-root': {
        fontSize: '12px',
        lineHeight: '16px',
    },
    '.MuiButton-sizeSmall': {
        padding: '4px 1rem',
        fontSize: '12px',
        lineHeight: '16px',
    },
    '.MuiButton-sizeMedium': {
        padding: '6px 1.5rem',
        fontSize: '12px',
        lineHeight: '16px',
    },
    '.MuiButton-sizeLarge': {
        padding: '7px 1.25rem',
        fontSize: '18px',
        lineHeight: '24px',
    },
};

export const StyledTextContent = styled('div')(({ theme, isMobileView }) => {
    return {
        '--defaultColor': theme.palette.background.default,
        '--color1': appStyles.primariaEscura,
        '--color2': appStyles.secundariaEscura,
        '--color3': appStyles.terciariaClara,
        '--color4': appStyles.cinzaClaro,
        '--color5': appStyles.corTexto,
        '--color6': appStyles.preto,
        '--color7': appStyles.branco,
        '--color8': 'rgba(0, 0, 0, .0)',
        '& p': {
            ...appStyles.corpo2(1),
            ...(isMobileView ? { fontSize: '12px', lineHeight: '26px' } : {}),
        },
        '& h1': {
            ...appStyles.h6(1),
            ...(isMobileView ? { fontSize: '21px', lineHeight: '31px' } : {}),
        },
        '& h2': {
            ...appStyles.h8(1),
            ...(isMobileView ? { fontSize: '18px', lineHeight: '24px' } : {}),
        },
        '& h3': {
            ...appStyles.h9(1),
            ...(isMobileView ? { fontSize: '18px', lineHeight: '24px' } : {}),
        },
        '& h4': {
            ...appStyles.h10(1),
            ...(isMobileView ? { fontSize: '13px', lineHeight: '18px' } : {}),
        },
        '& h5': {
            ...appStyles.subtitle1(1),
            ...(isMobileView ? { fontSize: '18px', lineHeight: '24px' } : {}),
        },
        ...(isMobileView ? mobileFonts : {}),
    };
});

export const StyledText = styled('div')(({ theme }) => {
    return {
        '--defaultColor': theme.palette.background.default,
        '--color1': appStyles.primariaEscura,
        '--color2': appStyles.secundariaEscura,
        '--color3': appStyles.terciariaClara,
        '--color4': appStyles.cinzaClaro,
        '--color5': appStyles.corTexto,
        '--color6': appStyles.preto,
        '--color7': appStyles.branco,
        '--color8': 'rgba(0, 0, 0, .0)',
        '& p': {
            ...appStyles.corpo2(1),
        },
        '& h1': {
            ...appStyles.h6(1),
        },
        '& h2': {
            ...appStyles.h8(1),
        },
        '& h3': {
            ...appStyles.h9(1),
        },
        '& h4': {
            ...appStyles.h10(1),
        },
        '& h5': {
            ...appStyles.subtitle1(1),
        },
    };
});

export const StyledTextQuilljs = styled('div')(({ theme }) => ({
    '--defaultColor': theme.palette.background.default,
    '--color1': appStyles.primariaEscura,
    '--color2': appStyles.secundariaEscura,
    '--color3': appStyles.terciariaClara,
    '--color4': appStyles.cinzaClaro,
    '--color5': appStyles.corTexto,
    '--color6': appStyles.preto,
    '--color7': appStyles.branco,
    '--color8': 'rgba(0, 0, 0, .0)',

    // texto e título
    '& p': {
        ...appStyles.corpo2(1),
    },
    '& h1': {
        ...appStyles.h6(1),
    },
    '& h2': {
        ...appStyles.h8(1),
    },
    '& h3': {
        ...appStyles.h9(1),
    },
    '& h4': {
        ...appStyles.h10(1),
    },
    '& h5': {
        ...appStyles.subtitle1(1),
    },
    '& .ql-header .ql-picker-item[data-value=""]::before': {
        ...appStyles.corpo2(1),
    },
    '& .ql-header .ql-picker-item[data-value=""]': {
        borderBottom: '1px solid gray',
        width: '100%',
        marginBottom: '12px',
        paddingBottom: '12px',
    },
    '& .ql-header .ql-picker-item[data-value="1"]::before': {
        ...appStyles.h6(1),
    },
    '& .ql-header .ql-picker-item[data-value="2"]::before': {
        ...appStyles.h8(1),
    },
    '& .ql-header .ql-picker-item[data-value="3"]::before': {
        ...appStyles.h9(1),
    },
    '& .ql-header .ql-picker-item[data-value="4"]::before': {
        ...appStyles.h10(1),
    },
    '& .ql-header .ql-picker-item[data-value="4"]': {
        borderBottom: '1px solid gray',
        width: '100%',
        marginBottom: '12px',
        paddingBottom: '12px',
    },
    '& .ql-header .ql-picker-item[data-value="5"]::before': {
        ...appStyles.subtitle1(1),
    },
    '& .ql-header .ql-picker-item[data-value=""]:hover': {
        backgroundColor: 'rgba(220, 221, 242, 0.2)',
    },
    '& .ql-header .ql-picker-item[data-value="1"]:hover': {
        backgroundColor: 'rgba(220, 221, 242, 0.2)',
    },
    '& .ql-header .ql-picker-item[data-value="2"]:hover': {
        backgroundColor: 'rgba(220, 221, 242, 0.2)',
    },
    '& .ql-header .ql-picker-item[data-value="3"]:hover': {
        backgroundColor: 'rgba(220, 221, 242, 0.2)',
    },
    '& .ql-header .ql-picker-item[data-value="4"]:hover': {
        backgroundColor: 'rgba(220, 221, 242, 0.2)',
    },
    '& .ql-header .ql-picker-item[data-value="5"]:hover': {
        backgroundColor: 'rgba(220, 221, 242, 0.2)',
    },
    '& .ql-header .ql-picker-item[data-value=""].ql-selected': {
        backgroundColor: 'rgba(220, 221, 242, 0.5)',
    },
    '& .ql-header .ql-picker-item[data-value="1"].ql-selected': {
        backgroundColor: 'rgba(220, 221, 242, 0.5)',
    },
    '& .ql-header .ql-picker-item[data-value="2"].ql-selected': {
        backgroundColor: 'rgba(220, 221, 242, 0.5)',
    },
    '& .ql-header .ql-picker-item[data-value="3"].ql-selected': {
        backgroundColor: 'rgba(220, 221, 242, 0.5)',
    },
    '& .ql-header .ql-picker-item[data-value="4"].ql-selected': {
        backgroundColor: 'rgba(220, 221, 242, 0.5)',
    },
    '& .ql-header .ql-picker-item[data-value="5"].ql-selected': {
        backgroundColor: 'rgba(220, 221, 242, 0.5)',
    },
}));
