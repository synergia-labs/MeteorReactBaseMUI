import React, { lazy } from "react";
import { RouteType } from "/imports/app/routes/types/routeType";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";

const basicPagesRouterList: Array<RouteType> = [
	{
		path: "",
		element: lazy(() => import("./frontend/pages/home/home")),
		name: "Home",
		icon: <SysIcon name="home" />
	},
	{
		path: "sysFormPlayground",
		element: lazy(() => import("./frontend/pages/sysFormPlayground/sysFormPlayground")),
		name: "SysForm Playground",
		icon: <SysIcon name="science" />
	}
];

export default basicPagesRouterList;
