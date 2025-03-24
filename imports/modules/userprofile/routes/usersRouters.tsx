import React from "react";
import NotLoggedInUserContainer from "../frontend/pages/notLoggedInUser/notLoggedInUser.container";
import SignInPage from "../frontend/pages/notLoggedInUser/signIn/signIn.view";
import LoggedInUserContainer from "../frontend/pages/loggedInUser/loggedInUser.container";
import UsersListProvider from "../frontend/pages/loggedInUser/usersList/usersList.provider";
import CreateAdminUserPage from "../frontend/pages/notLoggedInUser/createAdminUser/createAdminUser.view";
import ForgotPasswordPage from "../frontend/pages/notLoggedInUser/forgotPassword/forgotPassword.view";
import ResetPasswordPage from "../frontend/pages/notLoggedInUser/resetPassword/resetPassword.view";
import VerifyEmailPage from "../frontend/pages/notLoggedInUser/verifyEmail/verifyEmail.view";
import { RouteType } from "/imports/app/routes/routeType";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import { enumSysTemplateOptions } from "/imports/ui/templates/getTemplate";
import EnrollAccountPage from "../frontend/pages/notLoggedInUser/enrollAccount/enrollAccount.view";

const usersRouterList: Array<RouteType> = [
	{
		path: "users",
		element: LoggedInUserContainer,
		children: [
			{
				name: "Usuários",
				icon: <SysIcon name={"group"} />,
				path: "list",
				element: UsersListProvider
			}
		]
	},
	{
		path: "guest",
		element: NotLoggedInUserContainer,
		templateVariant: enumSysTemplateOptions.LOGIN,
		index: false,
		children: [
			{
				path: "sign-in",
				element: SignInPage
			},
			{
				path: "create-admin-user",
				element: CreateAdminUserPage
			},
			{
				path: "forgot-password",
				element: ForgotPasswordPage
			},
			{
				path: "forgot-password/:email",
				element: ForgotPasswordPage
			},
			{
				path: "reset-password/:token",
				element: ResetPasswordPage
			},
			{
				path: "verify-email/:token",
				element: VerifyEmailPage
			},
			{
				path: "enroll-account/:token",
				element: EnrollAccountPage
			}
		]
	}
] as const;

export default usersRouterList;
