import React from "react";
import {Box, styled} from "@mui/material";

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
    boxSizing: 'border-box',
    height: '100%',
}));