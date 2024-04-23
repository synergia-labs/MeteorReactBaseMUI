import React, { createContext, ReactNode } from 'react';
import { useUserAccount } from '../hooks/useUserAccount';
import { ISysAppContext } from '../typings/BoilerplateDefaultTypings';

const SysAppContext = createContext<ISysAppContext>({
	isLoggedIn: false,
	user: null,
	userLoading: false
} as ISysAppContext);

const AppContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { user, userLoading, isLoggedIn } = useUserAccount();

	const providerValue: ISysAppContext = {
		isLoggedIn,
		user,
		userLoading
	};

	return <SysAppContext.Provider value={providerValue}>{children}</SysAppContext.Provider>;
};

export { AppContainer, SysAppContext };

/*
    Adicione nesse provider valores de contexto globais que você queira acessar em qualquer lugar da aplicação.
    exemplo:
        * Dados do usuário logado
        * Dados do carrinho de compras
        * Dados de autenticação
        * Dados de localização
        * Chave de acesso a API
*/
