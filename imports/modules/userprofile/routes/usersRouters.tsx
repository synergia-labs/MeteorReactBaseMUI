import React, { lazy } from "react";
import LoggedInUserContainer from "../frontend/pages/loggedInUser/loggedInUser.container";
import { RouteType } from "/imports/app/routes/routeType";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import { enumSysTemplateOptions } from "/imports/ui/templates/enum/sysTemplateOptions";

const usersRouterList: Array<RouteType> = [
	{
		path: "users",
		element: LoggedInUserContainer,
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
