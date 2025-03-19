import React, { createContext } from 'react';
import { CreateUserType } from '../../../common/types/createUser';

interface INotLoggedInUserContext {
    hasAdminUser: boolean;
    createUser: (doc: CreateUserType) => void;
    loginWithGithub: () => void;
    loginWithGoogle: () => void;
    loginWithPassword: ({ email, password } : { email: string, password: string }) => void;

    teste: string;
    setTeste: (value: string) => void;
}

const notLoggedInUserContext = createContext<INotLoggedInUserContext>({} as INotLoggedInUserContext);
export default notLoggedInUserContext;
export type { INotLoggedInUserContext };