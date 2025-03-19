import React, { ReactNode } from "react";
import { IRoute } from "/imports/modules/modulesTypings";
import NotLoggedInUserContainer from "../frontend/pages/notLoggedInUser/notLoggedInUser.container";
import SignInPage from "../frontend/pages/notLoggedInUser/signIn/signIn";
import LoggedInUserContainer from "../frontend/pages/loggedInUser/loggedInUser.container";
import UsersListProvider from "../frontend/pages/loggedInUser/usersList/usersList.provider";

const UserNotLoggedInContext = (component: ReactNode) => (
	<NotLoggedInUserContainer>
		{component}
	</NotLoggedInUserContainer>
);

const UserLoggedInContext = (component: ReactNode) => (
	<LoggedInUserContainer>
		{component}
	</LoggedInUserContainer>
)

const exampleRouterList: Array<(IRoute | null)> = [
	{
		path: '/users',
		component: () => (UserLoggedInContext(<UsersListProvider />)),
	} as const,
	{
		path: '/sign-in',
		component: () => (UserNotLoggedInContext(<SignInPage />)),
		templateVariant: 'Login'
	} as const,
] as const;

export default exampleRouterList;