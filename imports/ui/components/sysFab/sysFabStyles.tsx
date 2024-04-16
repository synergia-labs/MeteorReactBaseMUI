import React from "react";
import { styled, Fab, FabProps, Theme } from "@mui/material";
import { sysSizing } from "/imports/ui/materialui/styles";

interface ISysFabProps extends FabProps{
    fixed?: boolean;
    theme?: Theme;
}

export const SysFabStyled = styled(Fab)<ISysFabProps>(({ theme,  fixed }) => {
    const defaultStyle = {
        borderRadius: sysSizing.radiusInfinite,
        backgroundColor: theme?.palette.sysAction?.primary,
        color: theme?.palette.sysAction?.primaryContrastText,
        "&:hover": {
            backgroundColor: theme?.palette.sysAction?.primaryHover,
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: sysSizing.componentsButtonGap,
    };

    const fixedStyle = {
        position: "absolute",
        right: "72px",
        bottom: "56px"
    }
    
    if (fixed) 
        return {
            ...defaultStyle,
            ...fixedStyle,
        }
    return defaultStyle;
});