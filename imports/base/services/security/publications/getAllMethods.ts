import { enumSecurityPublications } from '../common/enums/publications.enum';
import { paramGetAllSch, ParamGetAllType, returnGetMethodSch, ReturnGetMethodType } from '../common/types/get';
import { SecurityServer } from '../security.server';
import PublicationBase from '/imports/base/server/publication/publication.base';
import { IContext } from '/imports/typings/IContext';

class GetAllMethodsPublication extends PublicationBase<SecurityServer, ParamGetAllType, ReturnGetMethodType> {
	constructor() {
		super({
			name: enumSecurityPublications.getMethods,
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
	): Promise<any> {}
}
