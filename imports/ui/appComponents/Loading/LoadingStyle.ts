import { Box, styled } from '@mui/material';
import { keyframes } from '@mui/system';
import { sysSizing } from '../../materialui/styles';

const spin = keyframes`
    from {
        transform: rotate(-360deg);
    }
`;

export const LoadingStyle = {
    loading: styled(Box)(({theme}) => ({
        width: '50px',
        height: '50px',
        border: `5px solid ${theme.palette.primary.contrastText}`,
        borderRadius: '50%',
        borderTopColor: theme.palette.primary.main,
        animation: `${spin} linear infinite 1s`
    })),

    boxContainer: {
        width: '100%',
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sysSizing.spacingRemMd
    },
}

