import { enumSecurityConfig } from '../../common/enums/config.enum';
import { enumSecurityPublications } from '../../common/enums/publications.enum';
import { paramGetAllSch, ParamGetAllType, returnGetMethodSch, ReturnGetMethodType } from '../../common/types/get';
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
		const server = this.getServerInstance()?.getMethodCollection();
		if (!server) throw new Error('Server instance not found');

		const alreadyFound: Array<string> = [];

		const referredVarCursor = await server.find({ referred: _params.referred }).fetch();
		referredVarCursor.forEach((doc) => {
			alreadyFound.push(doc.name);
		});

		const cursor = server.find({
			$or: [{ referred: _params.referred }, { referred: enumSecurityConfig.apiName, name: { $nin: alreadyFound } }]
		});

		return cursor;
	}
}

export const getAllMethodsPublication = new GetAllMethodsPublication();
