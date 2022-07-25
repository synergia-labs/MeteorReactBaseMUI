import React from 'react';

export interface IAppMenu {
    path?: string;
    name?: string;
    isProtected?: boolean;
    icon?: React.ReactFragment;
}
export interface IRoute {
    path?: string;
    component:
        | React.ReactFragment
        | React.Component
        | React.FunctionComponent<any>
        | React.ComponentType<any>;
    isProtected?: boolean;
    exact?: string | boolean | undefined;
    resources?: string[];
}
export interface IModules {
    modulesRouterList: (IRoute | null)[];
    modulesAppMenuItemList: (IAppMenu | null)[];
}
