import React, { createContext } from 'react';
import { Meteor } from 'meteor/meteor';
interface IAuthContext {
    user: Meteor.User | null;
    logout: (callback: () => void) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
export type { IAuthContext };