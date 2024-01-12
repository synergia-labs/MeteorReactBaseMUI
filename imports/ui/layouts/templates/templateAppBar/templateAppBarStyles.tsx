import React from "react";
import {Box, styled} from "@mui/material";
import { sysSizing } from "/imports/materialui/styles";

export const TemplateAppBarContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
}));

export const TemplateAppBarContent = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    overflowY: 'auto',
    flexGrow: 1,
    boxSizing: 'border-box',
}));