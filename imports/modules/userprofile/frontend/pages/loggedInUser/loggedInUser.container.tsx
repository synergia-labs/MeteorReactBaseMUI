import React, { ReactNode } from 'react';
import Context, { ILoggedInUserContext } from './loggedInUser.context';

interface ILoggedInUserContainerProps {
    children?: ReactNode;
}

const LoggedInUserContainer: React.FC<ILoggedInUserContainerProps> = ({
    children
}) => {

    const contextValues: ILoggedInUserContext = {
    };

    return (
        <Context.Provider value={contextValues}>
            {children}
        </Context.Provider>
    )
}

export default LoggedInUserContainer;