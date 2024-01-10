import React from "react";
import { TemplateAppBar } from "./templateAppBar/templateAppBar";
import TemplateNone from "./templateNone/templateNone";

export enum SysTemplateOptions {
    AppBar = 'AppBar',
    None = 'None',
}

const templates = {
    [SysTemplateOptions.AppBar]: TemplateAppBar,
    [SysTemplateOptions.None]: TemplateNone,
};

export interface ISysTemplate {
    /**Propriedade que define qual template será renderizado. 
     * 
     * **obs:** Essa propriedade é usada como atributo `template` na definição da rota.
    */
    variant: SysTemplateOptions | keyof typeof SysTemplateOptions;
    /**Propriedades que podem ser passadas por parâmetro para o template. 
     * 
     * **obs:** Essa propriedade é usada como atributo `templateProps` na definição da rota.
    */
    props?: any;
    children?: React.ReactNode;
}

export const SysTemplate = ({
    variant = SysTemplateOptions.AppBar,
    props,
    children,
} : ISysTemplate) => {
    const Template = templates[variant];
    return (
        <Template {...props}>
            {children}
        </Template>
    );
}


