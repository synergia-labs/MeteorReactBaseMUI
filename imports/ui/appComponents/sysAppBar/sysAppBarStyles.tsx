import React from "react";
import {Box, styled} from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

export const SysAppBarContainer = styled(Box)(({theme}) => ({
    width: '100%',
    height: '56px',    
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${sysSizing.spacingFixedSm} ${sysSizing.contentPx}`,
    gap: sysSizing.spacingFixedMd,
    flexShrink: 0,
}));