import React from "react";
import { useUserAccount } from "../hooks/useUserAccount";
import { ISysAppContext } from "../typings/BoilerplateDefaultTypings";

export const SysAppContext = React.createContext<ISysAppContext>({
    isLoggedIn: false,
    user: null, 
    userLoading: false,
} as ISysAppContext);

export const AppContainer = ({ children } : {children?: JSX.Element | JSX.Element[]}) => {
    const { user, userLoading, isLoggedIn } = useUserAccount();
    const providerValue = {
        isLoggedIn,
        user,
        userLoading
    }

    return (
        <SysAppContext.Provider value={providerValue}>
            {children}
        </SysAppContext.Provider>
    )
}

/* 
    Adicione nesse provider valores de contexto globais que você queira acessar em qualquer lugar da aplicação.
    exemplo:
        * Dados do usuário logado
        * Dados do carrinho de compras
        * Dados de autenticação
        * Dados de localização
        * Chave de acesso a API
*/