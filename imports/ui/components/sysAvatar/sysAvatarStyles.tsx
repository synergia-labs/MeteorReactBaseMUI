import React from 'react';
import {Avatar, Box, Theme, styled} from '@mui/material';
import { sysSizing } from '/imports/ui/materialui/styles';

export const SysAvatarContainer = styled(Box)(({theme, onClickS, borderColor} : {theme?: Theme, onClickS: boolean, borderColor?: string}) => ({
    width: sysSizing.componentsButtonMediumMinHeight,
    height: sysSizing.componentsButtonMediumMinHeight,
    borderRadius: '50%',
    border: `2px solid ${borderColor ?? theme?.palette.common.white}`,
    boxSizing: 'border-box',
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: sysSizing.componentsInputMinHeight,
    cursor: onClickS ? 'pointer' : 'default',
}));

export const StyledSysAvatar = styled(Avatar)(({theme}) => ({
    width: sysSizing.contentPt,
    height: sysSizing.contentPt,
    backgroundColor: theme?.palette.primary.dark,
    "&:hover": {
        backgroundColor: theme?.palette.sysAction?.primaryContrastText,
        color: theme.palette.sysAction?.primaryHover
    },
    "&:focus": {
        backgroundColor: theme?.palette.sysAction?.primaryContrastText,
        color: theme?.palette.sysAction?.primaryHover,
        outline: 'none'
    },  
}));

