import { Meteor } from 'meteor/meteor';
import { EndpointType, ServerBase } from '../server.base';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';
import { ZodTypeAny } from 'zod';

interface IMethodBase {
	roles?: Array<EnumUserRoles>;
	paramSch?: ZodTypeAny;
	returnSch?: ZodTypeAny;
	endpointType?: EndpointType;
	name: string;
}

export abstract class MethodBase<
	Server extends ServerBase,
	Param = unknown,
	Return = unknown
> {
	protected server?: Server;
	protected roles?: Array<EnumUserRoles>;
	protected paramSch?: ZodTypeAny;
	protected returnSch?: ZodTypeAny;
	protected endpointType?: EndpointType;
	protected name: string;

	constructor({ name, roles, paramSch, returnSch, endpointType }: IMethodBase) {
		this.name = name;
		this.roles = roles;
		this.paramSch = paramSch;
		this.returnSch = returnSch;
		this.endpointType = endpointType;
	}

	public getMethodName(): string {
		return this.name;
	}

	public setServerInstance(server: Server): void {
		this.server = server;
	}

	public getEndpointType(): EndpointType | undefined {
		return this.endpointType;
	}

	protected beforeCall(param: Param, _context?: IContext): void {
		// Validando parâmetros de entrada
		if (this.paramSch) {
			this.paramSch.parse(param);
		}

		// Validar segurança com base nas roles
	}

	protected abstract call(param: Param, _context?: IContext): Promise<Return>;

	protected afterCall(_: Param, result: Return, _context?: IContext): void {
		// Validando retorno
		if (this.returnSch) {
			this.returnSch.parse(result);
		}

		// Implementar Log de registro
	}

	public async execute(param: Param, context?: IContext): Promise<Return> {
		try {
			if(Meteor.isClient) throw new Meteor.Error( '500', 'Método não pode ser chamado no client');
			this.beforeCall(param, context);
			const result = await this.call(param, context);
			this.afterCall(param, result, context);
			return result;
		} catch (error) {
			console.error(`Error on method ${this.name}: ${error}`);
			throw error;
		}
	}

}
