import React, { createContext } from 'react';
import { IMeteorError } from '/imports/typings/IMeteorError';
import { IUserProfile } from '/imports/modules/userprofile/common/types/IUserProfile';

interface IAuthContext {
    isLoggedIn: boolean;
    user?: IUserProfile;
    userLoading: boolean;
    logout: (callback: () => void) => void;
    signIn: (email: string, password: string, callback: (err?: IMeteorError) => void) => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
export type { IAuthContext };