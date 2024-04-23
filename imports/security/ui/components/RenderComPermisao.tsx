import { segurancaApi } from '/imports/security/api/SegurancaApi';
import { getUser } from '/imports/libs/getUser';

type RenderComPermissaoProps = {
	recursos: string[];
	/**
	 * Ignora validação de recurso e renderiza se true
	 */
	ignorar?: boolean;
	//condição extra opcional se possuir recurso.
	exibir?: () => boolean;
	children: JSX.Element;
};

/**
 * Exibe o componente children se o usuário possuir algum dos recursos fornecidos associados ao seu perfil(meteor.roles).
 * @param recursos nomes do recursos
 * @param permissionFunc opcional. condicao extra testada para a exibição
 * @param children
 * @constructor
 */
export const RenderComPermissao = ({
	recursos,
	exibir,
	children,
	ignorar = false
}: RenderComPermissaoProps): JSX.Element | null => {
	const user = getUser();
	if (ignorar || segurancaApi.podeAcessarRecurso(user, ...recursos)) {
		if (exibir) {
			if (exibir()) return children;
			return null;
		}
		return children;
	}

	return null;
};
