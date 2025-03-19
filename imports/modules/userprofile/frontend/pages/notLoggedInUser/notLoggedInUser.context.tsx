import React, { createContext } from 'react';
import { CreateUserType } from '../../../common/types/createUser';

interface INotLoggedInUserContext {
    hasAdminUser: boolean;
    createUser: (doc: CreateUserType) => void;
    loginWithGithub: () => void;
    loginWithGoogle: () => void;
    loginWithPassword: ({ email, password } : { email: string, password: string }) => void;
    sendResetPasswordEmail: (email: string, callback: (error: Meteor.Error) => void) => void;
}

const notLoggedInUserContext = createContext<INotLoggedInUserContext>({} as INotLoggedInUserContext);
export default notLoggedInUserContext;
export type { INotLoggedInUserContext };