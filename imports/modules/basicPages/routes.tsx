import React, { lazy } from "react";
import { RouteType } from "/imports/app/routes/types/routeType";
import SysIcon from "../../components/sysIcon/sysIcon";
import enumUserRoles from "../userprofile/common/enums/enumUserRoles";
import { enumSysTemplateOptions } from "/imports/app/templates/enum/sysTemplateOptions";

const basicPagesRouterList: Array<RouteType> = [
	{
		path: "",
		element: lazy(() => import("./frontend/pages/home/home")),
		name: "Home",
		roles: [enumUserRoles.USER, enumUserRoles.ADMIN],
		icon: <SysIcon name="home" />,
		templateVariant: enumSysTemplateOptions.APPBAR
	},
	{
		path: "sysFormPlayground",
		element: lazy(() => import("./frontend/pages/sysFormPlayground/sysFormPlayground")),
		name: "SysForm Playground",
		roles: [enumUserRoles.USER, enumUserRoles.ADMIN],
		icon: <SysIcon name="science" />,
		templateVariant: enumSysTemplateOptions.APPBAR
	}
];

export default basicPagesRouterList;
