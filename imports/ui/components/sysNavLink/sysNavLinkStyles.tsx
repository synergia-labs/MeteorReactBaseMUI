import React from "react";
import {Button, ButtonProps, Theme, styled} from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

interface SysNavLinkStyledContainerProps extends ButtonProps {
    active?: boolean;
}


export const SysNavLinkStyledContainer = styled(Button)<SysNavLinkStyledContainerProps>(({ theme, active }) => ({
    backgroundColor: active ? theme.palette.primary.dark : 'transparent',
    borderRadius: sysSizing.radiusInfinite,
    border: 'none', 
    color: theme.palette.primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
        border: 'none', 
    },
    '&:focus': {
        backgroundColor: active ? theme.palette.primary.dark : theme.palette.primary.light,
    },
    
}));