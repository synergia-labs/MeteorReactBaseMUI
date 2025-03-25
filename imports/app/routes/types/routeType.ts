import React, { ReactNode } from "react";

import { RouteProps } from "react-router-dom";
import { enumSysTemplateOptions } from "/imports/ui/templates/enum/sysTemplateOptions";

export interface ITemplateRouteProps {
	templateVariant?: enumSysTemplateOptions;
	templateMenuOptions?: Array<AppMenuType>;
	templateProps?: any;
}

export type AppMenuType = {
	path?: string;
	name?: string;
	icon?: ReactNode;
	children?: Array<AppMenuType>;
};

export type RouteType = Omit<RouteProps, "children" | "element"> &
	ITemplateRouteProps & {
		path: string;
		children?: Array<RouteType>;
		isProtected?: boolean;
		element?: React.LazyExoticComponent<React.ComponentType<any>>;
		roles?: Array<string>;
		name?: string;
		icon?: ReactNode;
		fullPath?: string;
	};
