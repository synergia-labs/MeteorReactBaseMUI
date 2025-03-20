import React, { ElementType } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import styled  from '@mui/material/styles/styled';


interface IStyles{
    container: ElementType<BoxProps>;
    header: ElementType<BoxProps>;
    divider: ElementType<BoxProps>;
    body: ElementType<BoxProps>;
}

const baseErrorPageStyles: IStyles = {
    container: styled(Box)(({ theme }) => ({
        width: '100%',
        height: '100%',
        minWidth: '100vw',
        minHeight: '100vh',
        backgroundColor: theme.palette.sysBackground?.bg2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    })),
    header: styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        height: '60%',
        boxShadow: theme.shadows[4],
        gap: theme.spacing(2),
    })),
    divider: styled(Box)(({ theme }) => ({
        width: '300px',
        height: '2px',
        backgroundColor: theme.palette.primary.contrastText,
        borderRadius: theme.shape.borderRadius * 4,
    })),
    body: styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(6),
        padding: theme.spacing(2),
        flex: 1,
        maxWidth: '800px',
        margin: '0 auto',
    })),
}

export default baseErrorPageStyles;