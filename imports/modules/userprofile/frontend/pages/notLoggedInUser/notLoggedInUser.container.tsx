import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import usersApi from '../../api/api';
import { CreateUserType } from '../../../common/types/createUser';
import Context, { INotLoggedInUserContext } from './notLoggedInUser.context';
import { useNavigate } from 'react-router-dom';

interface INotLoggedInUserContainerProps {
    children?: ReactNode;
}

const NotLoggedInUserContainer: React.FC<INotLoggedInUserContainerProps> = ({
    children
}) => {
    const { showNotification, showDialog } = useContext(AppLayoutContext);
    const { user } = useContext<IAuthContext>(AuthContext);
    const [ hasAdminUser, setHasAdminUser ] = useState<boolean>(true);
    const navigate = useNavigate();


    useEffect(() => {
        if(user) return;
        usersApi.checkIfHasAdminUser(undefined, (error, result) => {
        if(error) return showNotification({
            type: 'error',
            title: "Erro ao verificar existência de usuário administrador",
            message: "Ocorreu um erro ao verificar se existe um usuário administrador cadastrado no sistema. Por favor, tente novamente."
        });
        setHasAdminUser(result);
    })}, []);

    const createUser = useCallback((doc: CreateUserType) => {
        usersApi.create(doc, (error) => {
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
            if(!hasAdminUser) setHasAdminUser(true);
            navigate('/guest/sign-in');
        });
    }, [hasAdminUser]);

    const callBackLogin = useCallback((error: any) => {
        if(error) return showNotification({
            type: 'error',
            title: "Erro ao logar",
            message: "Ocorreu um erro ao logar no sistema. Por favor, tente novamente."
        });
        navigate('/');
    }, []);

    const sendResetPasswordEmail = useCallback((email: string, callback: (error: Meteor.Error) => void) => {
        usersApi.sendResetPasswordEmail(email, callback);
    }, []);

    const resetUserPassword = useCallback((token: string, newPassword: string, callback: (error?: Error | Meteor.Error) => void) => {
        usersApi.resetForgotPassword(token, newPassword, (error) => {
            if(!error){
                navigate('/');
                showDialog({
                    title: "Senha alterada",
                    message: "Sua senha foi alterada com sucesso. Seja bem-vindo de volta!",
                    confirmButtonLabel: "Ok"
                });
            }
            callback(error);
        });
    }, []);

    const verifyEmail = useCallback((token: string, callback: (error?: Error | Meteor.Error) => void) => 
        usersApi.verifyEmail(token, callback), []);

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
        sendResetPasswordEmail: sendResetPasswordEmail,
        resetUserPassword: resetUserPassword,
        verifyEmail: verifyEmail
    };

    return (
        <Context.Provider value={contextValues}>
            {children}
        </Context.Provider>
    )
}

export default NotLoggedInUserContainer;