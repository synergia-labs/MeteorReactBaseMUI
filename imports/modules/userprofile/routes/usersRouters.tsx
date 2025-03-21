import { RouteType } from "/imports/modules/modulesTypings";
import NotLoggedInUserContainer from "../frontend/pages/notLoggedInUser/notLoggedInUser.container";
import SignInPage from "../frontend/pages/notLoggedInUser/signIn/signIn.view";
import LoggedInUserContainer from "../frontend/pages/loggedInUser/loggedInUser.container";
import UsersListProvider from "../frontend/pages/loggedInUser/usersList/usersList.provider";
import CreateAdminUserPage from "../frontend/pages/notLoggedInUser/createAdminUser/createAdminUser.view";
import ForgotPasswordPage from "../frontend/pages/notLoggedInUser/forgotPassword/forgotPassword.view";
import ResetPasswordPage from "../frontend/pages/notLoggedInUser/resetPassword/resetPassword.view";
import VerifyEmailPage from "../frontend/pages/notLoggedInUser/verifyEmail/verifyEmail.view";
import EnrollAccountPage from "../frontend/pages/notLoggedInUser/enrollAccount/enrollAccount.view";

const exampleRouterList: Array<RouteType | null> = [
	{
		path: "users",
		element: LoggedInUserContainer,
		children: [
			{
				path: "list",
				element: UsersListProvider
			}
		]
	},
	{
		path: "guest",
		element: NotLoggedInUserContainer,
		templateVariant: "Login",
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

export default exampleRouterList;
