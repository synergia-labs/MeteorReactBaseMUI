import React from 'react';
import { Box, Paper, styled } from '@mui/material';
import { sysSizing } from '/imports/ui/materialui/styles';

interface ISignInStyles {
	container: React.ElementType;
	content: React.ElementType;
	formContainer: React.ElementType;
	formWrapper: React.ElementType;
}

const SignInStyles: ISignInStyles = {
	container: styled(Box)(({ theme }) => ({
		minHeight: '100vh',
		width: '100%',
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		position: 'relative',

		[theme.breakpoints.up('md')]: {
			backgroundImage: 'url(/images/wireframe/background-synergia.svg)',
			backgroundSize: 'cover',
			backgroundPosition: 'right'
		}
	})),
	content: styled(Box)(({ theme }) => ({
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		gap: theme.spacing(6),
		padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedXl}`,

		[theme.breakpoints.up('md')]: {
			width: 'auto',
			height: 'auto',
			position: 'absolute',
			top: '50%',
			left: '10%',
			transform: 'translateY(-50%)'
		}
	})),
	formContainer: styled(Paper)(({ theme }) => ({
		width: '100%',
		padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedXl}`,
		borderRadius: sysSizing.radiusLg,
		boxShadow: theme.shadows[3],
		gap: sysSizing.spacingFixedXl,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		maxWidth: '400px'
	})),
	formWrapper: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: theme.spacing(2)
	}))
};

export default SignInStyles;
