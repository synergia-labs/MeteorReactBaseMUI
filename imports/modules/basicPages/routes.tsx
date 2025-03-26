import React, { lazy } from "react";
import { RouteType } from "/imports/app/routes/types/routeType";
import SysIcon from "../../components/sysIcon/sysIcon";
import enumUserRoles from "../userprofile/common/enums/enumUserRoles";

const basicPagesRouterList: Array<RouteType> = [
	{
		path: "",
		element: lazy(() => import("./frontend/pages/home/home")),
		name: "Home",
		roles: [enumUserRoles.USER, enumUserRoles.ADMIN],
		icon: <SysIcon name="home" />
	},
	{
		path: "sysFormPlayground",
		element: lazy(() => import("./frontend/pages/sysFormPlayground/sysFormPlayground")),
		name: "SysForm Playground",
		roles: [enumUserRoles.USER, enumUserRoles.ADMIN],
		icon: <SysIcon name="science" />
	}
];

export default basicPagesRouterList;
