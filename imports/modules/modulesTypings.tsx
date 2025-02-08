import React from 'react';
import { SysTemplateOptions } from '../ui/templates/getTemplate';

interface IAppMenu {
	path?: string;
	name?: string;
	isProtected?: boolean;
	icon?: React.ReactNode;
	resources?: Array<string>;
}

interface IRoute {
	path?: string;
	component: React.ReactNode | React.Component | React.FunctionComponent<any> | React.ComponentType<any>;
	isProtected?: boolean;
	exact?: string | boolean | undefined;
	resources?: Array<string>;
	templateVariant?: SysTemplateOptions | keyof typeof SysTemplateOptions;
	templateMenuOptions?: Array<IAppMenu | null>;
	templateProps?: any;
}

interface IModuleHub {
	pagesRouterList: Array<IRoute | null>;
	pagesMenuItemList: Array<IAppMenu | null>;
}

export { IAppMenu, IRoute, IModuleHub };
