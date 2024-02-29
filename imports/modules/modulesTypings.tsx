import React from 'react';
import { SysTemplateOptions } from '../ui/layouts/templates/getTemplate';

interface IAppMenu {
    path?: string;
    name?: string;
    isProtected?: boolean;
    icon?: React.ReactNode;
}
interface IRoute {
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
interface IModuleHub {
    pagesRouterList: (IRoute | null)[];
    pagesMenuItemList: (IAppMenu | null)[];
}

export {
    IAppMenu,
    IRoute,
    IModuleHub
}