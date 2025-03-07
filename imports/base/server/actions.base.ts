import { ZodTypeAny } from 'zod';
import ServerBase, { EndpointType } from './server.base';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';
import { getUserServer } from '/imports/modules/userprofile/api/userProfileServerApi';
import { Meteor } from 'meteor/meteor';

interface IActionsBase {
	roles?: Array<EnumUserRoles>;
	paramSch?: ZodTypeAny;
	returnSch?: ZodTypeAny;
	endpointType?: EndpointType;
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
	//endregion

	//region Constructor
	constructor({ name, roles, paramSch, returnSch, endpointType, actionType }: IActionsBase) {
		this.name = name;
		this.roles = roles;
		this.paramSch = paramSch;
		this.returnSch = returnSch;
		this.endpointType = endpointType;
		this.actionType = actionType;
	}
	//endregion

	protected abstract actionBaseMethod(_param: Param, _context: IContext): Promise<Return> | Return;

	//region seters and getters
	public setServerInstance(server: Server): void {
		if (!!this.server) throw new Meteor.Error('500', 'Server já definido');
		this.server = server;
	}
	public getName(): string {
		if (!this.server) throw new Meteor.Error('500', 'Server não definido');
		return `${this.server.apiName}.${this.name}`;
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
	//endregion

	//region Auxiliar methods
	protected _checkPermissions(_context: IContext): void {
		if (!this.roles || this.roles.length === 0) return;

		const user = _context.user || getUserServer();
		if (!user) throw new Meteor.Error('401', 'Usuário não autenticado ou não encontrado');
		if (!user.roles) throw new Meteor.Error('403', 'Usuário não possui roles');

		const hasPermission = this.roles.some((role) => user.roles!.includes(role));
		if (!hasPermission) throw new Meteor.Error('403', 'Usuário não possui permissão para essa ação');
	}

	protected _registerActionLogs(_param: Param, _context: IContext): void {
		//TODO: Implementar registro de logs
	}
	//endregion

	//region Before action
	protected beforeAction(_param: Param, _context: IContext): void {
		if (this.paramSch) this.paramSch.parse(_param);
		this._checkPermissions(_context);
	}
	//endregion

	//region After action
	protected afterAction(_param: Param, _result: Return, _context: IContext): void {
		if (this.returnSch) this.returnSch.parse(_result);
		this._registerActionLogs(_param, _context);
	}
	//endregion

	public async execute(_param: Param, _context: IContext): Promise<Return> {
		try {
			if (Meteor.isClient)
				throw new Meteor.Error('500', `[${this.name}]: ${this.actionType} não pode ser chamado no client`);
			this.beforeAction(_param, _context);
			const result = await this.actionBaseMethod(_param, _context);
			this.afterAction(_param, result, _context);
			return result;
		} catch (error) {
			console.error(`Erro registrado no(a) ${this.actionType} ${this.name}: ${error}`);
			throw error;
		}
	}
}

type IActionBaseOmited = Omit<IActionsBase, 'actionType'>;

export default ActionsBase;
export type { IActionBaseOmited as IActionsBase };
