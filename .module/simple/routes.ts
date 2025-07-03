import React, { lazy } from "react";
import { RouteType } from "/imports/app/routes/types/routeType";
import { enumModuleNameSettings } from "./common/enums/settings";
import { enumSysTemplateOptions } from "/imports/app/templates/enum/sysTemplateOptions";
import i18n from "/imports/services/internationalization";
import enumUserRoles from "../users/common/enums/enumUserRoles";

const moduleNameRouterList: Array<RouteType> = [
	{
		path: enumModuleNameSettings.MODULE_PATH,
		element: lazy(() => import("./frontend/pages")),
		templateVariant: enumSysTemplateOptions.APPBAR,
		children: [
			{
				path: "hello",
				name: i18n.t(enumModuleNameSettings.MODULE_NAME),
				element: lazy(() => import("./frontend/pages/example/example.view")),
				isProtected: true,
				roles: [enumUserRoles.ADMIN]
			}
		]
	}
] as const;

export default moduleNameRouterList;
