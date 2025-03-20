import React from "react";
import { SysTemplateOptions } from "../ui/templates/getTemplate";
import { RouteProps } from "react-router-dom";

interface IAppMenu {
	path?: string;
	name?: string;
	isProtected?: boolean;
	icon?: React.ReactNode;
	resources?: Array<string>;
}

interface ITemplateRouteProps {
	templateVariant?: SysTemplateOptions | keyof typeof SysTemplateOptions;
	templateMenuOptions?: Array<IAppMenu | null>;
	templateProps?: any;
}

type IRoute = Omit<RouteProps, "children" | "element"> &
	ITemplateRouteProps & {
		children?: Array<IRoute>;
		isProtected?: boolean;
		element?: React.ReactNode | React.Component | React.FunctionComponent<any> | React.ComponentType<any>;
		roles?: Array<string>;
	};

interface IModuleRoutes {
	pagesRouterList: Array<IRoute | null>;
	pagesMenuItemList: Array<IAppMenu | null>;
}

export type { IAppMenu, IRoute, IModuleRoutes, ITemplateRouteProps };
