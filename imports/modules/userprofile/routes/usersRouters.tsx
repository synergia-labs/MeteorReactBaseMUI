import React, { lazy } from "react";
import { RouteType } from "../../../app/routes/types/routeType";
import SysIcon from "../../../components/sysIcon/sysIcon";
import enumUserRoles from "../common/enums/enumUserRoles";
import { enumSysTemplateOptions } from "/imports/app/templates/enum/sysTemplateOptions";

const usersRouterList: Array<RouteType> = [
	{
		path: "users",
		element: lazy(() => import("../frontend/pages/loggedInUser/loggedInUser.container")),
		templateVariant: enumSysTemplateOptions.APPBAR,
		children: [
			{
				name: "Usuários",
				icon: <SysIcon name={"group"} />,
				path: "list",
				element: lazy(() => import("../frontend/pages/loggedInUser/usersList/usersList.provider"))
			}
		]
	},
	{
		path: "guest",
		element: lazy(() => import("../frontend/pages/notLoggedInUser/notLoggedInUser.container")),
		templateVariant: enumSysTemplateOptions.LOGIN,
		index: false,
		roles: [enumUserRoles.PUBLIC],
		children: [
			{
				path: "sign-in",
				element: lazy(() => import("../frontend/pages/notLoggedInUser/signIn/signIn.view"))
			},
			{
				path: "create-admin-user",
				element: lazy(() => import("../frontend/pages/notLoggedInUser/createAdminUser/createAdminUser.view"))
			},
			{
				path: "forgot-password",
				element: lazy(() => import("../frontend/pages/notLoggedInUser/forgotPassword/forgotPassword.view"))
			},
			{
				path: "forgot-password/:email",
				element: lazy(() => import("../frontend/pages/notLoggedInUser/forgotPassword/forgotPassword.view"))
			},
			{
				path: "reset-password/:token",
				element: lazy(() => import("../frontend/pages/notLoggedInUser/resetPassword/resetPassword.view"))
			},
			{
				path: "verify-email/:token",
				element: lazy(() => import("../frontend/pages/notLoggedInUser/verifyEmail/verifyEmail.view"))
			}
		]
	}
] as const;

export default usersRouterList;
