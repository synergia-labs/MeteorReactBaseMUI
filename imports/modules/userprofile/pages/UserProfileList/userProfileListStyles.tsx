import React from "react";
import {Box, styled} from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

export const UserProfileListViewStyledContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
    gap: sysSizing.spacingFixedMd,
}));