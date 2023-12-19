import React from "react";
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

interface IButtonProps  {
    /**Teste lalalal */
    text? : string;
    /**
     * Teste
     * @default primary 
    */
    styleVariant? : 'primary' | 'secondary';
}

/**Teste */
export const BaseButton = (props : IButtonProps) => {
    return (
        <MuiButton {...props}>
            {props.text ?? 'Button'}
        </MuiButton>
    )
}
