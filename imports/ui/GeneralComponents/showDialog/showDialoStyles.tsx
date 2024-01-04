import React from "react";
import { DialogTitle, styled } from "@mui/material";

export const DialogTitleStyled = styled(DialogTitle)(({}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1rem',
    '& .MuiSvgIcon-root': {
        fontSize: '2.2rem',
    }
}));