import ServerBase from "../server.base";
import ActionsBase, { IActionsBase } from "../actions.base";
import { IContext } from "/imports/typings/IContext";

export interface IMethodBase extends IActionsBase {
	canRegister?: boolean;
}

abstract class MethodBase<Server extends ServerBase, Param = unknown, Return = unknown> extends ActionsBase<
	Server,
	Param,
	Return
> {
	private canRegister: boolean;
	constructor(props: IMethodBase) {
		super({ ...props, actionType: "method" });
		this.canRegister = props.canRegister ?? true;
	}

	getCanRegister(): boolean {
		return this.canRegister;
	}

	protected async beforeAction(_param: Param, _context: IContext): Promise<void> {
		super.beforeAction(_param, _context, false);
	}

	abstract action(_param: Param, _context: IContext): Promise<Return> | Return;

	async actionBaseMethod(_param: Param, _context: IContext): Promise<Return> {
		return await this.action(_param, _context);
	}
}

export default MethodBase;
