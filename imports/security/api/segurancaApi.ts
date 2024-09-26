import { mapRolesRecursos } from '/imports/security/config/mapRolesRecursos';
import { Meteor } from 'meteor/meteor';
import { getSystemUserProfile } from '/imports/libs/getUser';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';

type Recurso = string;

/**
 * Fornece acesso a informações de permissão de acesso do usuário a determinado recursos.
 */
class SegurancaApi {
	_getRecursosUsuario(user: IUserProfile | (Meteor.User & { roles?: string[] | undefined }) | undefined): Set<Recurso> {
		let roles = user && user.roles;
		if (!roles) roles = ['Public'];
		const resources = new Set<string>();

		roles.forEach((role) => {
			let recursosRole = mapRolesRecursos[role];
			if (recursosRole) {
				recursosRole.forEach((x) => resources.add(x));
			}
		});
		return resources;
	}

	/**
	 * Returna true se alguns se usuario logado possui acesso a algum recursos.
	 * @param user
	 * @param recursosTestados
	 */
	podeAcessarRecurso(
		user: IUserProfile | (Meteor.User & { roles?: string[] | undefined }) | undefined,
		...recursosTestados: string[]
	): boolean {
		if (!!user && getSystemUserProfile() === user) return true;
		const recursos = this._getRecursosUsuario(user);
		for (const role of recursosTestados) {
			if (recursos.has(role)) return true;
		}
		return false;
	}

	/**
	 * Lança erro se não tiver nenhum dos recursos. (Ou seja se possuir apenas um é valido)
	 * @param user
	 * @param recursos
	 * @param msgErro
	 */
	validarAcessoRecursos(
		user: IUserProfile,
		recursos: string[],
		msgErro: string = 'Você não tem permissao para realizar essa operação'
	): void {
		if (!this.podeAcessarRecurso(user, ...recursos))
			throw new Meteor.Error('Acesso negado', msgErro, recursos.join(','));
	}
}

export const segurancaApi = new SegurancaApi();
