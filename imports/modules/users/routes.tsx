import React, { lazy } from "react";
import { RouteType } from "/imports/app/routes/types/routeType";
import { enumUsersSettings } from "./common/enums/settings";
import { enumSysTemplateOptions } from "/imports/app/templates/enum/sysTemplateOptions";
import i18n from "/imports/services/internationalization";
import SysIcon from "/imports/components/sysIcon/sysIcon";
import enumUserRoles from "./common/enums/enumUserRoles";

const usersRouterList: Array<RouteType> = [
	{
		path: enumUsersSettings.MODULE_PATH,
		element: lazy(() => import("./frontend/pages/loggedInUser/loggedInUser.container")),
		templateVariant: enumSysTemplateOptions.APPBAR,
		children: [
			{
				path: "",
				icon: <SysIcon name={"group"} />,
				name: i18n.t(enumUsersSettings.I18N_MODULE_NAME_PATH),
				element: lazy(() => import("./frontend/pages/loggedInUser/usersList/usersList.provider")),
				isProtected: true,
				roles: [enumUserRoles.ADMIN]
			}
		]
	},
	{
		path: "guest",
		element: lazy(() => import("./frontend/pages/notLoggedInUser/notLoggedInUser.container")),
		templateVariant: enumSysTemplateOptions.LOGIN,
		index: false,
		roles: [enumUserRoles.PUBLIC],
		children: [
			{
				path: "sign-in",
				element: lazy(() => import("./frontend/pages/notLoggedInUser/signIn/signIn.view"))
			},
			{
				path: "create-admin-user",
				element: lazy(() => import("./frontend/pages/notLoggedInUser/createAdminUser/createAdminUser.view"))
			},
			{
				path: "forgot-password",
				element: lazy(() => import("./frontend/pages/notLoggedInUser/forgotPassword/forgotPassword.view"))
			},
			{
				path: "forgot-password/:email",
				element: lazy(() => import("./frontend/pages/notLoggedInUser/forgotPassword/forgotPassword.view"))
			},
			{
				path: "reset-password/:token",
				element: lazy(() => import("./frontend/pages/notLoggedInUser/resetPassword/resetPassword.view"))
			},
			{
				path: "verify-email/:token",
				element: lazy(() => import("./frontend/pages/notLoggedInUser/verifyEmail/verifyEmail.view"))
			},
			{
				path: "enroll-account/:token",
				element: lazy(() => import("./frontend/pages/notLoggedInUser/enrollAccount/enrollAccount.view"))
			}
		]
	}
] as const;

export default usersRouterList;
