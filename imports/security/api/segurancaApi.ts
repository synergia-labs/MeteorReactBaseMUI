import { mapRolesRecursos } from '/imports/security/config/mapRolesRecursos';
import { Meteor } from 'meteor/meteor';
import { getSystemUserProfile } from '/imports/libs/getUser';
import EnumUserRoles from '/imports/modules/userprofile/common/enums/enumUserRoles';

type Recurso = string;

/**
 * Fornece acesso a informações de permissão de acesso do usuário a determinado recursos.
 */
class SegurancaApi {
	_getRecursosUsuario(user: Meteor.User | undefined): Set<Recurso> {
		const roles = user?.profile?.roles || EnumUserRoles.PUBLIC;
		const resources = new Set<string>();

		for (const role of roles) {
			const roleResources = (mapRolesRecursos as any)[role];
			if (!roleResources) continue;
			for (const resource of roleResources) {
				resources.add(resource);
			}
		}


		return resources;
	}

	/**
	 * Returna true se alguns se usuario logado possui acesso a algum recursos.
	 * @param user
	 * @param recursosTestados
	 */
	podeAcessarRecurso(
		user: Meteor.User | undefined,	
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
		user: Meteor.User | undefined,
		recursos: string[],
		msgErro: string = 'Você não tem permissao para realizar essa operação'
	): void {
		if (!this.podeAcessarRecurso(user, ...recursos))
			throw new Meteor.Error('Acesso negado', msgErro, recursos.join(','));
	}
}

export const segurancaApi = new SegurancaApi();
