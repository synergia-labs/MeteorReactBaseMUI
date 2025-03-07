import ServerBase from '../server.base';
import ActionsBase, { IActionsBase } from '../actions.base';
import { IContext } from '/imports/typings/IContext';

interface IMethodBase extends IActionsBase {}

abstract class MethodBase<Server extends ServerBase, Param = unknown, Return = unknown> extends ActionsBase<
	Server,
	Param,
	Return
> {
	constructor(props: IMethodBase) {
		super({ ...props, actionType: 'method' });
	}

	abstract action(_param: Param, _context: IContext): Promise<Return> | Return;

	actionBaseMethod(_param: Param, _context: IContext): Promise<Return> | Return {
		return this.action(_param, _context);
	}
}

export default MethodBase;
