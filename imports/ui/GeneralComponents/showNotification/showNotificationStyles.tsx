import React from "react";
import {SxProps, Theme } from "@mui/material";
import { sysSizing } from "/imports/materialui/styles";

interface IShowNotificationStyles {
    container: ({type} : IContainer) => SxProps<Theme>;
    header: SxProps<Theme>;
    body: SxProps<Theme>;
}


const showNotificationStyles : IShowNotificationStyles = {
    container: ({type}) => theme => ({
        minWidth: '440px',
        minHeight: '80px',
        borderRadius: sysSizing.radiusSm,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    
        '& .MuiSvgIcon-root': {
            width: '24px',
            height: '24px',
        },
    
        ...(type === 'success' && {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.contrastText,
            border: `1px solid ${theme.palette.success.main}`,
            '& .MuiSvgIcon-root': {
                color: theme.palette.success.main,
            }
        }),
        ...(type === 'error' && {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            border: `1px solid ${theme.palette.error.main}`,
            '& .MuiSvgIcon-root': {
                color: theme.palette.error.main,
            }
        }),
        ...(type === 'warning' && {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
            border: `1px solid ${theme.palette.warning.main}`,
            '& .MuiSvgIcon-root': {
                color: theme.palette.warning.dark,
            }
        }),
        ...(type === 'default' && {
            backgroundColor: theme.palette.sysAction?.primary,
            color: theme.palette.sysText?.base,
            border: `1px solid ${theme.palette.sysAction?.primary}`,
            '& .MuiSvgIcon-root': {
                color: theme.palette.sysAction?.primary,
            }
        }),
    }),
    header: {
        padding: `${sysSizing.spacingFixedXs} ${sysSizing.spacingFixedSm}`,
    },
    body: theme => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${sysSizing.spacingFixedXs} ${sysSizing.spacingFixedSm}`,
        backgroundColor: theme.palette.background.default,
        flexGrow: 1,
        flexShrink: 0,
        gap: theme.spacing(1),
    }),


}

interface IContainer {
    type: 'success' | 'error' | 'warning' | 'default';
}


export default showNotificationStyles;