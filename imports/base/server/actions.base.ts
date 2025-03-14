import { ZodTypeAny } from 'zod';
import ServerBase from './server.base';
import { IContext } from '/imports/typings/IContext';
import { Meteor } from 'meteor/meteor';
import { EndpointType } from '../types/serverParams';
import EnumUserRoles from '/imports/modules/userprofile/common/enums/enumUserRoles';

interface IActionsBase {
	roles?: Array<EnumUserRoles>;
	paramSch?: ZodTypeAny;
	returnSch?: ZodTypeAny;
	endpointType?: EndpointType;
	description?: string;
	name: string;
	actionType: 'method' | 'publication';
}

/**Clase base para criação das classes base de método e publicação */
abstract class ActionsBase<Server extends ServerBase, Param = unknown, Return = unknown> {
	//region Properties
	private name: string;
	private actionType: 'method' | 'publication';
	private server?: Server;
	private roles?: Array<EnumUserRoles>;
	private paramSch?: ZodTypeAny;
	private returnSch?: ZodTypeAny;
	private endpointType?: EndpointType;
	private description?: string;
	//endregion

	//region Constructor
	constructor({ name, roles, paramSch, returnSch, endpointType, actionType, description }: IActionsBase) {
		this.name = name;
		this.roles = roles;
		this.paramSch = paramSch;
		this.returnSch = returnSch;
		this.endpointType = endpointType;
		this.actionType = actionType;
		this.description = description;
	}
	//endregion

	protected abstract actionBaseMethod(_param: Param, _context: IContext): Promise<Return>;

	//region seters and getters
	public setServerInstance(server: Server): void {
		if (!!this.server) throw new Meteor.Error('500', 'Server já definido');
		this.server = server;
	}
	public getName(): string {
		return this.name;
	}
	public getActionType(): 'method' | 'publication' {
		return this.actionType;
	}
	public getServerInstance(): Server | undefined {
		return this.server;
	}
	public getRoles(): Array<EnumUserRoles> | undefined {
		return this.roles;
	}
	public getParamSch(): ZodTypeAny | undefined {
		return this.paramSch;
	}
	public getReturnSch(): ZodTypeAny | undefined {
		return this.returnSch;
	}
	public getEndpointType(): EndpointType | undefined {
		return this.endpointType;
	}
	public getDescription(): string | undefined {
		return this.description;
	}
	//endregion

	//region Before action
	protected async beforeAction(_param: Param, _context: IContext): Promise<void> {
		if (this.paramSch) this.paramSch.parse(_param);
	}
	//endregion

	//region After action
	protected async afterAction(_param: Param, _result: Return, _context: IContext): Promise<void> {
		if (this.returnSch) this.returnSch.parse(_result);
	}
	//endregion

	//region OnError
	protected onError(_param: Param, _context: IContext, _error: Error): Return | void {
		console.error(`Erro registrado no(a) ${this.actionType} ${this.name}: ${_error}`);
		throw new Meteor.Error('500', `[${this.name}]: Erro interno - ${_error}`);
	}

	public async execute(_param: Param, _context: IContext): Promise<Return> {
		try {
			if (Meteor.isClient)
				throw new Meteor.Error('500', `[${this.name}]: ${this.actionType} não pode ser chamado no client`);
			await this.beforeAction(_param, _context);
			const result = await this.actionBaseMethod(_param, _context);
			await this.afterAction(_param, result, _context);
			return result;
		} catch (error) {
			return this.onError(_param, _context, error as Error) as Return;
		}
	}
}

type IActionBaseOmited = Omit<IActionsBase, 'actionType'>;

export default ActionsBase;
export type { IActionBaseOmited as IActionsBase };
