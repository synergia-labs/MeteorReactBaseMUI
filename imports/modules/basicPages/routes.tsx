import React, { lazy } from "react";
import { RouteType } from "/imports/app/routes/types/routeType";
import SysIcon from "../../components/sysIcon/sysIcon";
import { enumSysTemplateOptions } from "/imports/app/templates/enum/sysTemplateOptions";
import enumUserRoles from "../users/common/enums/enumUserRoles";

const basicPagesRouterList: Array<RouteType> = [
	{
		path: "",
		element: lazy(() => import("./frontend/pages/home/home")),
		name: "Home",
		roles: [enumUserRoles.USER, enumUserRoles.ADMIN],
		icon: <SysIcon name="home" />,
		templateVariant: enumSysTemplateOptions.APPBAR
	}
];

export default basicPagesRouterList;
