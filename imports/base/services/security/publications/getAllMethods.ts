import { enumSecurityPublications } from '../common/enums/publications.enum';
import { paramGetAllSch, ParamGetAllType, returnGetMethodSch, ReturnGetMethodType } from '../common/types/get';
import { SecurityServer } from '../security.server';
import PublicationBase from '/imports/base/server/publication/publication.base';
import EnumUserRoles from '/imports/modules/userprofile/common/enums/enumUserRoles';
import { IContext } from '/imports/typings/IContext';

class GetAllMethodsPublication extends PublicationBase<SecurityServer, ParamGetAllType, ReturnGetMethodType> {
	constructor() {
		super({
			name: enumSecurityPublications.getAllMethodsPublication,
			description: 'Retorna todos os métodos disponíveis para uma determinada referência',
			roles: [EnumUserRoles.ADMIN],
			paramSch: paramGetAllSch,
			returnSch: returnGetMethodSch,
			enableCountPublication: true,
			transformedPublication: false
		});
	}

	async action(
		_params: ParamGetAllType,
		_options: Mongo.Options<ReturnGetMethodType>,
		_context: IContext
	): Promise<any> {
		console.log('getAllMethodsPublication.action: ', _params, _options, _context);

		const filter = { referred: _params.referred };
		return this.getServerInstance()?.getMethodCollection().find(filter, _options);
	}
}

export const getAllMethodsPublication = new GetAllMethodsPublication();
