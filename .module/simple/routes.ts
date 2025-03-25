import React, { lazy } from "react";
import { enumSysTemplateOptions } from "/imports/ui/templates/enum/sysTemplateOptions";
import { RouteType } from "/imports/app/routes/types/routeType";
import { enumModuleNameSettings } from "./common/enums/settings";

const moduleNameRouterList: Array<RouteType> = [
	{
		path: enumModuleNameSettings.MODULE_PATH,
		element: lazy(() => import("./frontend/pages")),
		templateVariant: enumSysTemplateOptions.APPBAR,
		children: [
			{
				path: "hello",
				name: enumModuleNameSettings.MODULE_NAME,
				element: lazy(() => import("./frontend/pages/example/example.view")),
				isProtected: true
			}
		]
	}
] as const;

export default moduleNameRouterList;
