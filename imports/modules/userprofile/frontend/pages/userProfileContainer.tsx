import React, { useCallback, useContext, useEffect, useState } from 'react';
import CreateAdminUserPage from './createAdminUser/createAdminUser.view';
import userProfileApi from '../api/api';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import Context, { IUserProfileContext } from './userProfileContext';
import { ICreateUser } from '../../common/types/ICreateUser';
import { useTracker } from 'meteor/react-meteor-data';

const UserProfileContainer: React.FC = () => {
    const { showNotification } = useContext(AppLayoutContext);
    const [ hasAdminUser, setHasAdminUser ] = useState<boolean>(true);

    useEffect(() => userProfileApi.checkIfHasAdminUser(undefined, (error, result) => {
        console.log(error, result);
        if(error) return showNotification({
            type: 'error',
            title: "Erro ao verificar existência de usuário administrador",
            message: "Ocorreu um erro ao verificar se existe um usuário administrador cadastrado no sistema. Por favor, tente novamente."
        });
        setHasAdminUser(result);
    }), []);

    const user = useTracker(() => Meteor.user(), []);
    


    const renderPage = () => {
        if(!hasAdminUser) return <CreateAdminUserPage />;
        return <div>{JSON.stringify(user)}</div>;
    }

    const createUser = useCallback((doc: ICreateUser) => {
        console.log(doc);
        userProfileApi.create(doc, (error) => {
            if(error) return showNotification({
                type: 'error',
                title: "Erro ao criar usuário",
                message: "Ocorreu um erro ao criar o usuário. Por favor, tente novamente."
            });
            showNotification({
                type: 'success',
                title: "Usuário criado",
                message: `O usuário ${doc.name} foi criado com sucesso.`
            });
        });
    }, []);


    const contextValues: IUserProfileContext = {
        createUser: createUser
    };

    return (
        <Context.Provider value={contextValues}>
            {renderPage()}
        </Context.Provider>
    )
}

export default UserProfileContainer;