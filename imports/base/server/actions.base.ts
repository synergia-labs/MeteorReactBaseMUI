import { ZodTypeAny } from 'zod';
import ServerBase from './server.base';
import { IContext } from '/imports/typings/IContext';
import { Meteor } from 'meteor/meteor';
import { EndpointType } from '../types/serverParams';
import EnumUserRoles from '../../modules/userprofile/common/enums/enumUserRoles';
import { enumSecurityConfig } from '../services/security/common/enums/config.enum';
import { _checkPermission } from '../services/security/backend/utils/checkPermission';

interface IActionsBase {
	roles?: Array<EnumUserRoles>;
	paramSch?: ZodTypeAny;
	returnSch?: ZodTypeAny;
	endpointType?: EndpointType;
	description?: string;
	name: string;
	actionType: 'method' | 'publication';
	isProtected?: boolean;
	referred?: string;
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
	private isProtected: boolean;
	private description?: string;
	private referred?: string;
	//endregion

	//region Constructor
	constructor({
		name,
		roles,
		paramSch,
		returnSch,
		endpointType,
		actionType,
		description,
		isProtected,
		referred
	}: IActionsBase) {
		this.name = name;
		this.roles = roles;
		this.paramSch = paramSch;
		this.returnSch = returnSch;
		this.endpointType = endpointType;
		this.actionType = actionType;
		this.description = description;
		this.isProtected = isProtected ?? false;
		this.referred = referred;
	}
	//endregion

	protected generateError({ _message, _code = '500' }: { _message: string; _code?: string; _context?: IContext }): void {
		throw new Meteor.Error(_code, `[${this.name}]: ${_message}`);
	}

	protected abstract actionBaseMethod(_param: Param, _context: IContext): Promise<Return>;

	//region seters and getters
	public setServerInstance(server: Server): void {
		if (this.server) this.generateError({ _message: 'Server instance already set', _code: '500' });
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
	public getDescription(): string {
		return this.description ?? '';
	}
	public getIsProtected(): boolean {
		return this.isProtected;
	}
	//endregion

	//region Before action
	protected async beforeAction(_param: Param, _context: IContext, securityValidation: boolean = true): Promise<void> {
		if (this.paramSch) _param = this.paramSch.parse(_param);

		if (securityValidation) {
			const permission = await _checkPermission(this.name, this.referred ?? enumSecurityConfig.apiName, _context);
			if (!permission) this.generateError({ _message: 'Sem permissão', _code: '403', _context });
		}
	}
	//endregion

	//region After action
	protected async afterAction(_param: Param, _result: Return, _context: IContext): Promise<void> {
		if (this.returnSch) _result = this.returnSch.parse(_result);
	}
	//endregion

	//region OnError
	protected async onError(_param: Param, _context: IContext, _error: Meteor.Error): Promise<Return | void> {
		console.error(`Erro registrado no(a) ${this.actionType} ${this.name}: ${_error}`);
		this.generateError({ _message: _error.message, _context });
	}

	public async execute(_param: Param, _context: IContext): Promise<Return> {
		try {
			if (Meteor.isClient)
				this.generateError({ _message: 'Método não pode ser executado no client', _code: '500', _context });
			await this.beforeAction(_param, _context);
			const result = await this.actionBaseMethod(_param, _context);
			await this.afterAction(_param, result, _context);
			return result;
		} catch (error) {
			return (await this.onError(_param, _context, error as Meteor.Error)) as Return;
		}
	}
}

type IActionBaseOmited = Omit<IActionsBase, 'actionType'>;

export default ActionsBase;
export type { IActionBaseOmited as IActionsBase };
