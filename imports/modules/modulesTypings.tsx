import React from 'react';
import { SysTemplateOptions } from '../ui/layouts/templates/getTemplate';

export interface IAppMenu {
    path?: string;
    name?: string;
    isProtected?: boolean;
    icon?: React.ReactNode;
}
export interface IRoute {
    path?: string;
    component:
        | React.ReactNode
        | React.Component
        | React.FunctionComponent<any>
        | React.ComponentType<any>;
    isProtected?: boolean;
    exact?: string | boolean | undefined;
    resources?: string[];
    templateVariant?: SysTemplateOptions | keyof typeof SysTemplateOptions;
    templateMenuOptions?: (IAppMenu | null)[];
    templateProps?: any;
}
export interface IModuleHub {
    pagesRouterList: (IRoute | null)[];
    pagesMenuItemList: (IAppMenu | null)[];
}
