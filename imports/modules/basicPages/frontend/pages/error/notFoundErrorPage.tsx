import React from "react";
import BaseErrorPage from "./base/baseErrorPage.view";

const NotFoundErrorPage: React.FC = () => {
	return (
		<BaseErrorPage
			codeError="404"
			errorTitle="Página não encontrada"
			errorDescription="A página que você está tentando acessar não existe ou se encontra indisponível. 
			Por favor, verifique o URL digitado ou utilize o botão abaixo para voltar à página inicial e continuar navegando."
		/>
	);
};

export default NotFoundErrorPage;
