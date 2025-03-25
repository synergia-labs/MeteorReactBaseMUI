import React from "react";
import BaseErrorPage from "./base/baseErrorPage.view";

const ForbiddenErrorPage: React.FC = () => {
	return (
		<BaseErrorPage
			codeError="403"
			errorTitle="Acesso negado"
			errorDescription="Você não possui permissão para acessar esta página ou recurso. 
            Por favor, entre em contato com o administrador do sistema para obter mais informações."
		/>
	);
};

export default ForbiddenErrorPage;
