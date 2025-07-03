import React, { createContext } from "react";
import { CreateUserType } from "../../../common/types/createUser";

interface INotLoggedInUserContext {
	hasAdminUser: boolean;
	createUser: (doc: CreateUserType) => void;
	loginWithGithub: () => void;
	loginWithGoogle: () => void;
	loginWithMicrosoftEntra: () => void;
	loginWithPassword: ({ email, password }: { email: string; password: string }) => void;
	sendResetPasswordEmail: (email: string, callback: (error: Meteor.Error) => void) => void;
	resetUserPassword: (
		token: string,
		newPassword: string,
		callback: (error?: Error | Meteor.Error) => void,
		enrollAccount: boolean
	) => void;
	verifyEmail: (token: string, callback: (error?: Error | Meteor.Error) => void) => void;
}

const notLoggedInUserContext = createContext<INotLoggedInUserContext>({} as INotLoggedInUserContext);
export default notLoggedInUserContext;
export type { INotLoggedInUserContext };
