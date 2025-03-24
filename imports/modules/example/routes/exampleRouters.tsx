import React, { lazy } from "react";
import { RouteType } from "/imports/app/routes/routeType";
import { enumSysTemplateOptions } from "/imports/ui/templates/enum/sysTemplateOptions";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";

const exampleRouterList: Array<RouteType> = [
	{
		path: "example",
		element: lazy(() => import("../frontend/exampleContainer")),
		templateVariant: enumSysTemplateOptions.APPBAR,
		children: [
			{
				path: ":screenState/:exampleId",
				element: lazy(() => import("../frontend/pages/exampleDetail/exampleDetailProvider")),
				isProtected: true
			},
			{
				path: ":screenState",
				element: lazy(() => import("../frontend/pages/exampleDetail/exampleDetailProvider")),
				isProtected: true
			},
			{
				path: "list",
				name: "Exemplo",
				icon: <SysIcon name={"dashboard"} />,
				element: lazy(() => import("../frontend/pages/exampleList/exampleListProvider")),
				isProtected: true
			}
		]
	}
] as const;

export default exampleRouterList;
