import React, { createContext } from 'react';
import { CreateUserType } from '../../common/types/createUser';

interface IUserProfileContext {
    createUser: (doc: CreateUserType) => void;
    loginWithGithub: () => void;
    loginWithGoogle: () => void;
    loginWithPassword: ({ email, password } : { email: string, password: string }) => void;
}

const UserProfileContext = createContext<IUserProfileContext>({} as IUserProfileContext);
export default UserProfileContext;
export type { IUserProfileContext };