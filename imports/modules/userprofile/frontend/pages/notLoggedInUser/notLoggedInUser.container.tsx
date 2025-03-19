import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import userProfileApi from '../../api/api';
import { CreateUserType } from '../../../common/types/createUser';
import Context, { INotLoggedInUserContext } from './notLoggedInUser.context';
import { useNavigate } from 'react-router-dom';

interface INotLoggedInUserContainerProps {
    children?: ReactNode;
}

const NotLoggedInUserContainer: React.FC<INotLoggedInUserContainerProps> = ({
    children
}) => {
    const { showNotification } = useContext(AppLayoutContext);
    const { user } = useContext<IAuthContext>(AuthContext);
    const [ hasAdminUser, setHasAdminUser ] = useState<boolean>(true);
    const navigate = useNavigate();


    useEffect(() => {
        if(user) return;
        userProfileApi.checkIfHasAdminUser(undefined, (error, result) => {
        if(error) return showNotification({
            type: 'error',
            title: "Erro ao verificar existência de usuário administrador",
            message: "Ocorreu um erro ao verificar se existe um usuário administrador cadastrado no sistema. Por favor, tente novamente."
        });
        setHasAdminUser(result);
    })}, []);

    const createUser = useCallback((doc: CreateUserType) => {
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
            navigate('/guest/sign-in');
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
        navigate('/');
    }, []);

    const loginWithGithub = useCallback(() => 
        Meteor.loginWithGithub( { requestPermissions: ["user"] }, callBackLogin ), []);
    const loginWithGoogle = useCallback(() => 
        Meteor.loginWithGoogle( {}, callBackLogin ), []);
    const loginWithPassword = useCallback(({ email, password } : { email: string, password: string }) => 
        Meteor.loginWithPassword(email, password, callBackLogin), []);

    const contextValues: INotLoggedInUserContext = {
        hasAdminUser: hasAdminUser,
        createUser: createUser,
        loginWithGithub: loginWithGithub,
        loginWithGoogle: loginWithGoogle,
        loginWithPassword: loginWithPassword,
    };

    return (
        <Context.Provider value={contextValues}>
            {children}
        </Context.Provider>
    )
}

export default NotLoggedInUserContainer;