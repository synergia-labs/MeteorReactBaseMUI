import { ServerBase } from '../server.base';
import EnumUserRoles from '/imports/modules/userprofile/common/enums/enumUserRoles';
import { IContext } from '/imports/typings/IContext';
import { z } from 'zod';

interface IMethodBase {
	roles?: EnumUserRoles[];
	paramSch?: z.ZodObject<any>;
	returnSch?: z.ZodObject<any>;
	name: string;
}

export abstract class MethodBase<Server extends ServerBase, Param = undefined, Return = undefined> {
	protected server?: Server;
	protected roles?: EnumUserRoles[];
	protected paramSch?: z.ZodObject<any>;
	protected returnSch?: z.ZodObject<any>;
	protected name: string;

	constructor({ name, roles, paramSch, returnSch }: IMethodBase) {
		this.name = name;
		this.roles = roles;
		this.paramSch = paramSch;
		this.returnSch = returnSch;
	}

	public setServerInstance(server: Server) {
		this.server = server;
	}

	protected beforeCall(param: Param, _context?: IContext) {
		// Validando parâmetros de entrada
		if (this.paramSch) {
			this.paramSch.parse(param);
		}

		// Lembrando que param é uma referência, portanto qualquer alteração nele será refletida no objeto original
		// Implementar Validação de segurança com base nas roles
	}
	protected abstract call(param: Param, _context?: IContext): Return;
	protected afterCall(_: Param, result: Return, _context?: IContext) {
		// Validando retorno
		if (this.returnSch) {
			this.returnSch.parse(result);
		}

		// Lembrando que param é uma referência, portanto qualquer alteração nele será refletida no objeto original
		// Implementar Log de registro
	}

	public execute(param: Param, context?: IContext): Return {
		try {
			this.beforeCall(param, context);
			const result = this.call(param, context);
			this.afterCall(param, result, context);
			return result;
		} catch (error) {
			console.error(`Error on method ${this.name}: ${error}`);
			throw error;
		}
	}
}
