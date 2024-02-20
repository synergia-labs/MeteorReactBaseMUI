import React from "react";
import { DialogContent, DialogTitle, styled } from "@mui/material";

export const DialogTitleStyled = styled(DialogTitle)(({}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1rem',
    '& .MuiSvgIcon-root': {
        fontSize: '2.2rem',
    }
}));

export const DialogContentStyled = styled(DialogContent)(({}) => ({
    padding: 0,
    color: 'sysBackground.sysText.auxiliary'
}));