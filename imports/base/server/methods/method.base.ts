import ServerBase from '../server.base';
import ActionsBase, { IActionsBase } from '../actions.base';

interface IMethodBase extends IActionsBase {}

abstract class MethodBase< Server extends ServerBase, Param = unknown, Return = unknown> 
	extends ActionsBase<Server, Param, Return> 
{
	constructor(props: IMethodBase) { super({ ...props, actionType: 'method' }); }
}

export default MethodBase;