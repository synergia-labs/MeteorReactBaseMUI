import React from "react";
import { enumSysTemplateOptions } from "../ui/templates/getTemplate";
import { RouteProps } from "react-router-dom";

interface IAppMenu {
	path?: string;
	name?: string;
	isProtected?: boolean;
	icon?: React.ReactNode;
	resources?: Array<string>;
}

interface ITemplateRouteProps {
	templateVariant?: enumSysTemplateOptions | keyof typeof enumSysTemplateOptions;
	templateMenuOptions?: Array<IAppMenu | null>;
	templateProps?: any;
}

type RouteType = Omit<RouteProps, "children" | "element"> &
	ITemplateRouteProps & {
		children?: Array<RouteType>;
		isProtected?: boolean;
		element?: React.ReactNode | React.Component | React.FunctionComponent<any> | React.ComponentType<any>;
		roles?: Array<string>;
	};

interface IModuleRoutes {
	pagesRouterList: Array<RouteType | null>;
	pagesMenuItemList: Array<IAppMenu | null>;
}

export type { IAppMenu, RouteType, IModuleRoutes, ITemplateRouteProps };
