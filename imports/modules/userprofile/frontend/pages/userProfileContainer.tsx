import React, { useCallback, useContext, useEffect, useState } from 'react';
import CreateAdminUserPage from './createAdminUser/createAdminUser.view';
import userProfileApi from '../api/api';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import Context, { IUserProfileContext } from './userProfileContext';
import { ICreateUser } from '../../common/types/ICreateUser';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import SignInPage from './signIn/signIn';
import { useNavigate } from 'react-router-dom';

const UserProfileContainer: React.FC = () => {
    const { showNotification } = useContext(AppLayoutContext);
    const { user } = useContext<IAuthContext>(AuthContext);
    const [ hasAdminUser, setHasAdminUser ] = useState<boolean>(true);

    const navigate = useNavigate();

    useEffect(() => { 
        if (user) navigate('/');
    }, [user]);


    useEffect(() => userProfileApi.checkIfHasAdminUser(undefined, (error, result) => {
        if(error) return showNotification({
            type: 'error',
            title: "Erro ao verificar existência de usuário administrador",
            message: "Ocorreu um erro ao verificar se existe um usuário administrador cadastrado no sistema. Por favor, tente novamente."
        });
        setHasAdminUser(result);
    }), []);
    
    const renderPage = () => {
        if(!hasAdminUser) return <CreateAdminUserPage />;
        return <SignInPage />;
    }

    const createUser = useCallback((doc: ICreateUser) => {
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

    const callBackLogin = useCallback((error: any) => {
        if(error) return showNotification({
            type: 'error',
            title: "Erro ao logar",
            message: "Ocorreu um erro ao logar no sistema. Por favor, tente novamente."
        });
        showNotification({
            type: 'success',
            title: "Login bem-sucedido",
            message: "Você foi logado com sucesso."
        });
    }, []);

    const loginWithGithub = useCallback(() => 
        Meteor.loginWithGithub( { requestPermissions: ["user"] }, callBackLogin ), []);
    const loginWithGoogle = useCallback(() => 
        Meteor.loginWithGoogle( {}, callBackLogin ), []);
    const loginWithPassword = useCallback(({ email, password } : { email: string, password: string }) => 
        Meteor.loginWithPassword(email, password, callBackLogin), []);

    const contextValues: IUserProfileContext = {
        createUser: createUser,
        loginWithGithub: loginWithGithub,
        loginWithGoogle: loginWithGoogle,
        loginWithPassword: loginWithPassword
    };

    return (
        <Context.Provider value={contextValues}>
            {renderPage()}
        </Context.Provider>
    )
}

export default UserProfileContainer;