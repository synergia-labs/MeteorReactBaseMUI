import React from "react";
import {SxProps, Theme} from '@mui/material';

interface ISignInStyles {
    container   : SxProps<Theme>;
    content     : SxProps<Theme>;
}

const signInStyles: ISignInStyles = {
    container: theme => ({
        minHeight: '100vh',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        position: 'relative',
        backgroundImage: 'url(/images/wireframe/background-synergia.svg)',
        backgroundSize: 'cover',
    }), 
    content: {
        position: 'absolute',
        top: '50%',
        left: '10%',
        transform: 'translateY(-50%)',
    }
}

export default signInStyles;