import React, { lazy } from "react";
import { RouteType } from "/imports/app/routes/types/routeType";
import { enumSysTemplateOptions } from "/imports/app/templates/enum/sysTemplateOptions";
import { enumInternationalizationSettings } from "./common/enum/settings";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";
import i18n from ".";
import SysIcon from "/imports/components/sysIcon/sysIcon";

const moduleNameRouterList: Array<RouteType> = [
	{
		path: enumInternationalizationSettings.MODULE_PATH,
		element: lazy(() => import("./frontend/pages")),
		templateVariant: enumSysTemplateOptions.APPBAR,
		roles: [enumUserRoles.ADMIN],
		isProtected: true,
		children: [
			{
				name: i18n.t(enumInternationalizationSettings.I18N_MODULE_NAME_PATH),
				icon: <SysIcon name="public" />,
				path: "editor",
				element: lazy(() => import("./frontend/pages/translate/translate.provider")),
				isProtected: true
			}
		]
	}
] as const;

export default moduleNameRouterList;
