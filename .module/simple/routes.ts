import React, { lazy } from "react";
import { RouteType } from "/imports/app/routes/types/routeType";
import { enumModuleNameSettings } from "./common/enums/settings";
import { enumSysTemplateOptions } from "/imports/app/routes/templates/enum/sysTemplateOptions";

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
