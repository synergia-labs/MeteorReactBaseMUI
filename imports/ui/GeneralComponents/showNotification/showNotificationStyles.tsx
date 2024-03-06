import React from "react";
import {Box, Paper, styled } from "@mui/material";
import { sysSizing } from "/imports/materialui/styles";

interface IContainer {
    type: 'success' | 'error' | 'warning' | 'default';

}
const Container = styled(Paper)<IContainer>(({ theme, type }) => ({
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

}));

const Header = styled(Box)({
    padding: `${sysSizing.spacingFixedXs} ${sysSizing.spacingFixedSm}`,
});

const Body = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${sysSizing.spacingFixedXs} ${sysSizing.spacingFixedSm}`,
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    flexShrink: 0,
    gap: theme.spacing(1),
}));

interface IShowNotificationStyles {
    container: React.ElementType;
    header: React.ElementType;
    body: React.ElementType;
}

const ShowNotificationStyles : IShowNotificationStyles = {
    container: Container,
    header: Header,
    body: Body,
}

export default ShowNotificationStyles;
