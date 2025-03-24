import React from "react";
import ExampleContainer from "../frontend/exampleContainer";
import ExampleDetailProvider from "../frontend/pages/exampleDetail/exampleDetailProvider";
import ExampleListProvider from "../frontend/pages/exampleList/exampleListProvider";
import { RouteType } from "/imports/app/routes/routeType";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import { enumSysTemplateOptions } from "/imports/ui/templates/getTemplate";

const exampleRouterList: Array<RouteType> = [
	{
		path: "example",
		element: ExampleContainer,
		templateVariant: enumSysTemplateOptions.APPBAR,
		children: [
			{
				path: ":screenState/:exampleId",
				element: ExampleDetailProvider,
				isProtected: true
			},
			{
				path: ":screenState",
				element: ExampleDetailProvider,
				isProtected: true
			},
			{
				name: "Exemplo",
				icon: <SysIcon name={"dashboard"} />,
				path: "list",
				element: ExampleListProvider,
				isProtected: true
			}
		]
	}
] as const;

export default exampleRouterList;
