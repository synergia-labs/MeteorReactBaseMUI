import { ElementType } from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import { keyframes } from '@mui/system';
import { sysSizing } from '../../materialui/styles';

const spin = keyframes`
    from {
        transform: rotate(-360deg);
    }
`;

interface ILoadingStyle {
	container: ElementType;
	loading: ElementType<BoxProps & ILoading>;
}

interface ILoading {
	size: 'small' | 'medium' | 'large';
}

const LoadingStyle: ILoadingStyle = {
	loading: styled(Box)<ILoading>(({ theme, size }) => ({
		width: size === 'small' ? '25px' : size === 'medium' ? '50px' : '100px',
		height: size === 'small' ? '25px' : size === 'medium' ? '50px' : '100px',
		border: `5px solid ${theme.palette.sysAction?.primaryBgHover}`,
		borderRadius: '50%',
		borderTopColor: theme.palette.primary.main,
		animation: `${spin} linear infinite 1s`
	})),

	container: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: sysSizing.spacingRemMd
	}))
};

export default LoadingStyle;
