import ServerBase from '../server.base';
import ActionsBase, { IActionsBase } from '../actions.base';
import { IContext } from '/imports/typings/IContext';

export interface IMethodBase extends IActionsBase {}

abstract class MethodBase<Server extends ServerBase, Param = unknown, Return = unknown> extends ActionsBase<
	Server,
	Param,
	Return
> {
	constructor(props: IMethodBase) {
		super({ ...props, actionType: 'method' });
	}

	abstract action(_param: Param, _context: IContext): Promise<Return> | Return;

	async actionBaseMethod(_param: Param, _context: IContext): Promise<Return> {
		return await this.action(_param, _context);
	}
}

export default MethodBase;
