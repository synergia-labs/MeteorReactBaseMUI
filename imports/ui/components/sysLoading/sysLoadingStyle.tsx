import { ElementType } from 'react';
import  Box, {BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { sysSizing } from '../../materialui/styles';

const spin = keyframes`
    from {
        transform: rotate(-360deg);
    }
`;

interface ILoadingStyle {
	Container: ElementType;
	Loading: ElementType<BoxProps & ILoading>;
}

interface ILoading {
	size: 'small' | 'medium' | 'large';
}

const LoadingStyle: ILoadingStyle = {
	Loading: styled(Box)<ILoading>(({ theme, size }) => ({
		width: size === 'small' ? '25px' : size === 'medium' ? '50px' : '100px',
		height: size === 'small' ? '25px' : size === 'medium' ? '50px' : '100px',
		border: `5px solid ${theme.palette.sysAction?.primaryBgHover}`,
    borderWidth: size === 'small' ? '3px' : size === 'medium' ? '5px' : '10px',
		borderRadius: '50%',
		borderTopColor: theme.palette.primary.main,
		animation: `${spin} linear infinite 1s`
	})),

	Container: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: sysSizing.spacingRemSm
	}))
};

export default LoadingStyle;
