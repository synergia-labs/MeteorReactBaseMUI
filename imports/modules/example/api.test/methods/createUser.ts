import { ExampleServer } from '../example.server';
import {
	ParamCreateUserType,
	ReturnCreateUserType,
	paramCreateUserSch,
	returnCreateUserSch
} from '../types/create_user.type';
import { MethodBase } from '../../../../api/server/methods/method.base';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';

class CreateUser extends MethodBase<ExampleServer, ParamCreateUserType, ReturnCreateUserType> {
	constructor() {
		super({
			name: 'createUser',
			roles: [EnumUserRoles.ADM, EnumUserRoles.USER],
			paramSch: paramCreateUserSch,
			returnSch: returnCreateUserSch
		});
	}

	protected call(param: ParamCreateUserType): ReturnCreateUserType {
		console.log('Passou aqui: ', param);

		return { id: '123' };
	}
}
export const createUser = new CreateUser();
