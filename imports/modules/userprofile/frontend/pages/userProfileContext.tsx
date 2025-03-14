import React, { createContext } from 'react';
import { ICreateUser } from '../../common/types/ICreateUser';

interface IUserProfileContext {
    createUser: (doc: ICreateUser) => void;
    loginWithGithub: () => void;
    loginWithGoogle: () => void;
    loginWithPassword: ({ email, password } : { email: string, password: string }) => void;
}

const UserProfileContext = createContext<IUserProfileContext>({} as IUserProfileContext);
export default UserProfileContext;
export type { IUserProfileContext };