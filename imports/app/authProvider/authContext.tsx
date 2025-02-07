import React, { createContext } from 'react';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';

interface IAuthContext {
    isLoggedIn: boolean;
    user?: IUserProfile;
    userLoading: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
export type { IAuthContext };