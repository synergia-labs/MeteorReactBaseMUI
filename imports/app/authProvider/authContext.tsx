import React, { createContext } from "react";
import { Meteor } from "meteor/meteor";
interface IAuthContext {
	user: Meteor.User | null;
	userLoggedIn: boolean;
	userLoading: boolean;
	logout: (callback: () => void) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
export type { IAuthContext };
