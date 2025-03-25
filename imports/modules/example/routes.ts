import React, { lazy } from "react";
import { enumSysTemplateOptions } from "/imports/ui/templates/enum/sysTemplateOptions";
import { RouteType } from "/imports/app/routes/types/routeType";
import { enumExampleSettings } from "./common/enums/settings";

const exampleRouterList: Array<RouteType> = [
	{
		path: enumExampleSettings.MODULE_PATH,
		element: lazy(() => import("./frontend/pages")),
		templateVariant: enumSysTemplateOptions.APPBAR,
		children: [
			{
				path: "hello",
				name: enumExampleSettings.MODULE_NAME,
				element: lazy(() => import("./frontend/pages/example/example.view")),
				isProtected: true
			}
		]
	}
] as const;

export default exampleRouterList;
