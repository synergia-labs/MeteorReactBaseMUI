import { styled } from '@mui/material/styles';

export const StyledText = styled('div')(({ theme }) => ({
    '--defaultColor': theme.palette.background.default,
    '--color1': theme.palette.background.color1,
    '--color2': theme.palette.background.color2,
    '--color3': theme.palette.background.color3,
    '& p': {
        ...theme.typography.body1,
    },
    '& h1': {
        ...theme.typography.h1,
        color: theme.palette.primary.main,
    },
    '& h2': {
        ...theme.typography.h2,
    },
    '& h3': {
        ...theme.typography.h3,
    },
}));

export const StyledTextQuilljs = styled('div')(({ theme }) => ({
    '--defaultColor': theme.palette.background.default,
    '--color1': theme.palette.background.color1,
    '--color2': theme.palette.background.color2,
    '--color3': theme.palette.background.color3,
    '& p': {
        ...theme.typography.body1,
    },
    '& h1': {
        ...theme.typography.h1,
        color: theme.palette.primary.main,
    },
    '& h2': {
        ...theme.typography.h2,
    },
    '& h3': {
        ...theme.typography.h3,
    },
    '& .ql-header .ql-picker-item[data-value="1"]::before': {
        ...theme.typography.h1,
    },
    '& .ql-header .ql-picker-item[data-value="2"]::before': {
        ...theme.typography.h2,
    },
    '& .ql-header .ql-picker-item[data-value="3"]::before': {
        ...theme.typography.h3,
    },
}));
