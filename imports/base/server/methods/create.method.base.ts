import { AuditType } from "../../types/audit";
import ServerBase from "../server.base";
import MethodBase, { IMethodBase } from "./method.base";
import { IContext } from "/imports/typings/IContext";

export abstract class CreateMethodBase<S extends ServerBase, P, R> extends MethodBase<S, P & AuditType, R> {
	constructor(props: IMethodBase) {
		super(props);
	}

	protected insertAuditData(param: P & AuditType, _context: IContext): void {
		param.createdAt = new Date();
		param.createdBy = (_context.user._id ?? Meteor.userId()) as string;
	}

	protected async beforeAction(param: P & AuditType, _context: IContext): Promise<void> {
		super.beforeAction(param, _context);
		this.insertAuditData(param, _context);

		if (!param.createdBy) {
			throw new Meteor.Error("500", "Usuário não encontrado - Para realizar esta ação é necessário estar logado");
		}
	}
}
