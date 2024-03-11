import React from "react";
import { Box, Paper, styled } from '@mui/material';
import { sysSizing } from "/imports/ui/materialui/styles";

interface ISignInStyles {
    container     : React.ElementType;
    content       : React.ElementType;
    formContainer : React.ElementType;
    formWrapper   : React.ElementType;
}

const SignInStyles : ISignInStyles = {
    container : styled(Box)(({theme}) => ({
        minHeight: '100vh',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        position: 'relative',
        backgroundImage: 'url(/images/wireframe/background-synergia.svg)',
        backgroundSize: 'cover',
    })),
    content : styled(Box)(({theme}) => ({
        position: 'absolute',
        top: '50%',
        left: '10%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(6),
    })),
    formContainer : styled(Paper)(({theme}) => ({
        width: '400px',
        padding: `${sysSizing.spacingFixedLg} ${sysSizing.spacingFixedXl}`,
        borderRadius: sysSizing.radiusLg,
        boxShadow: theme.shadows[3],
        gap: sysSizing.spacingFixedXl,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    })),
    formWrapper : styled(Box)(({theme}) => ({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme.spacing(2),
    })),

}


export default SignInStyles;