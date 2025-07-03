import ServerBase from "../server.base";
import MethodBase, { IMethodBase } from "./method.base";
import { IContext } from "../../../types/context";
import { nanoid } from "nanoid";

export abstract class UpsertMethodBaseNeo4j<S extends ServerBase, P, R> extends MethodBase<S, P, R> {
	constructor(props: IMethodBase) {
		super(props);
	}

	abstract isCreateMode(param: P, _context: IContext): boolean;

	protected insertAuditData(param: P, _context: IContext): void {
		if (!(param instanceof Object)) return;
		Object.keys(param as Record<string, any>).forEach((key) => {
			if (key.includes("Data")) {
				if (this.isCreateMode(param, _context)) {
					(param as Record<string, any>)[key].createdAt = new Date().toLocaleString();
					(param as Record<string, any>)[key].createdBy = (_context.user._id ?? Meteor.userId()) as string;
					if (!(param as Record<string, any>)[key]._id) (param as Record<string, any>)[key]._id = nanoid();
				} else {
					(param as Record<string, any>)[key].updatedAt = new Date().toLocaleString();
					(param as Record<string, any>)[key].updatedBy = (_context.user._id ?? Meteor.userId()) as string;
				}
			}
		});
	}

	protected async beforeAction(param: P, _context: IContext): Promise<void> {
		await super.beforeAction(param, _context);
		this.insertAuditData(param, _context);
	}
}
