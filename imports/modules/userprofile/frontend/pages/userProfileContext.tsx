import React, { createContext } from 'react';
import { ICreateUser } from '../../common/types/ICreateUser';

interface IUserProfileContext {
    createUser: (doc: ICreateUser) => void;
}

const UserProfileContext = createContext<IUserProfileContext>({} as IUserProfileContext);
export default UserProfileContext;
export type { IUserProfileContext };