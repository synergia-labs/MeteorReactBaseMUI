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
    variant: SysTemplateOptions | keyof typeof SysTemplateOptions;
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


