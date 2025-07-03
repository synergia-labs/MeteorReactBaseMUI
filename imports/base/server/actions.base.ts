import { ZodTypeAny } from "zod";
import ServerBase from "./server.base";
import { IContext } from "../../types/context";
import { Meteor } from "meteor/meteor";
import { EndpointType } from "../../types/serverParams";
import { enumSecurityConfig } from "../../services/security/common/enums/config";
import { _checkPermission } from "../../services/security/backend/utils/checkPermission";
import GenerateI18nErrorType from "/imports/services/internationalization/common/types/generateI18nErrorType";
import generateI18nError from "/imports/services/internationalization/utils/generateI18nError";
import { nanoid } from "nanoid";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";
import { textNormalize } from "/imports/libs/textUtilities";
import { hasValue } from "/imports/libs/hasValue";

interface IActionsBase {
	roles?: Array<enumUserRoles>;
	paramSch?: ZodTypeAny;
	returnSch?: ZodTypeAny;
	endpointType?: EndpointType;
	name: string;
	actionType: "method" | "publication";
	isProtected?: boolean;
	referred?: string;
}

/**Clase base para criação das classes base de método e publicação */
abstract class ActionsBase<Server extends ServerBase, Param = unknown, Return = unknown> {
	//region Properties
	private name: string;
	private actionType: "method" | "publication";
	private server?: Server;
	private roles?: Array<enumUserRoles>;
	private paramSch?: ZodTypeAny;
	private returnSch?: ZodTypeAny;
	private endpointType?: EndpointType;
	private isProtected: boolean;
	private referred?: string;
	//endregion

	//region Constructor
	constructor({ name, roles, paramSch, returnSch, endpointType, actionType, isProtected, referred }: IActionsBase) {
		this.name = name;
		this.roles = roles;
		this.paramSch = paramSch;
		this.returnSch = returnSch;
		this.endpointType = endpointType;
		this.actionType = actionType;
		this.isProtected = isProtected ?? false;
		this.referred = referred;

		this.beforeAction = this.beforeAction.bind(this);
		this.execute = this.execute.bind(this);
		this.actionBaseMethod = this.actionBaseMethod.bind(this);
	}
	//endregion

	protected includeAuditError(param: GenerateI18nErrorType, _context?: IContext): void {
		param.params = param.params ?? {};
		param.params._id = nanoid();
		param.params.action = this.name;
		param.params.date = new Date().toISOString();
		param.params.user = _context?.user?._id ?? (Meteor.userId() || "guest");
		param.params.apiName = _context?.apiName ?? this.getServerInstance(_context).apiName ?? "unknown";
		param.params.idConnection = param.params.idConnection || _context?.meteorInstance?.connection?.id || "not-defined";
		param.params.ipConnection =
			param.params.ipConnection || _context?.meteorInstance?.connection?.clientAddress || "not-defined";
		param.params.xForward =
			param.params.xForward || _context?.meteorInstance?.connection?.httpHeaders["x-forwarded-for"] || "not-defined";
	}

	protected generateError(params: GenerateI18nErrorType, _context?: IContext): void {
		if (!hasValue(params.origin)) params.origin = "action";
		this.includeAuditError(params, _context);
		throw generateI18nError({ ...params, context: _context });
	}

	protected abstract actionBaseMethod(_param: Param, _context: IContext): Promise<Return>;

	//region seters and getters
	public setServerInstance(server: Server, _context?: IContext): void {
		if (!!this.server) this.generateError({ key: "serverNotFound", code: "500" }, _context);
		this.server = server;
	}
	public getName(): string {
		return this.name;
	}
	public getActionType(): "method" | "publication" {
		return this.actionType;
	}
	public getServerInstance(_context?: IContext): Server {
		if (!this.server) {
			this.generateError({ key: "unregisteredMethod", code: "500" }, _context);
		}
		return this.server!;
	}
	public getRoles(): Array<enumUserRoles> | undefined {
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
	public getIsProtected(): boolean {
		return this.isProtected;
	}
	//endregion

	//region Before action
	protected async beforeAction(_param: Param, _context: IContext, securityValidation: boolean = true): Promise<void> {
		if (this.paramSch) {
			const zodValidate = this.paramSch.safeParse(_param);

			if (!zodValidate.success) {
				const errors = zodValidate.error.errors
					.map(
						(el, idx) =>
							// @ts-ignore
							`${idx + 1}º ${el.path.join(".")}(${el.message}): expected(${el?.expected}) - received(${el?.received})`
					)
					.join(" \n ");

				this.generateError({
					origin: "beforeAction",
					key: "schemaError",
					code: "400",
					params: {
						disagreement: errors
					},
					namespace: "common"
				});
			}
			_param = zodValidate.data;
		}

		if (securityValidation) {
			const permission = await _checkPermission(this.name, this.referred ?? enumSecurityConfig.API_NAME, _context);
			if (!permission) this.generateError({ key: "forbidden", code: "403" }, _context);
		}
	}
	//endregion

	protected upsertSearchObject<T extends { [key: string]: any; search?: { [key: string]: any } }>(
		obj: T,
		keys: Array<string>
	): T | undefined {
		const newObj = obj;
		if (typeof obj !== "object") return undefined;
		if (!obj) return undefined;
		if (!newObj.search) newObj.search = {};
		if (Array.isArray(keys)) {
			keys.forEach((key) => {
				if (obj[key]) {
					if (!newObj.search) newObj.search = {};
					newObj.search[key] = textNormalize(obj[key]);
				}
			});
		}
		for (const key in newObj?.search) {
			if (!keys.includes(key)) delete newObj.search[key];
		}
		return newObj;
	}

	//region After action
	protected async afterAction(_param: Param, _result: Return, _context: IContext): Promise<void> {
		if (this.returnSch) {
			const zodValidate = this.returnSch.safeParse(_result);
			if (!zodValidate.success) {
				const errors = zodValidate.error.errors
					.map(
						(el: any, idx) =>
							`${idx + 1}º ${el.path.join(".")}(${el.message}): expected(${el?.expected}) - received(${el?.received})`
					)
					.join(" \n ");
				this.generateError({
					key: "schemaError",
					code: "400",
					origin: "afterAction",
					params: {
						disagreement: errors
					},
					namespace: "common"
				});
			}
			_result = zodValidate.data;
		}
	}
	//endregion

	//region OnError
	protected async onError(_param: Param, _context: IContext, _error: unknown): Promise<Return> {
		console.error(`Erro registrado no(a) ${this.actionType} ${this.name}: ${_error}`);
		if (_error instanceof Meteor.Error) throw _error;
		else throw generateI18nError({ key: "generic", error: _error, context: _context });
	}

	public async execute(_param: Param, _context: IContext): Promise<Return> {
		try {
			if (Meteor.isClient) this.generateError({ key: "serverMethodOnClient", code: "500" }, _context);

			await this.beforeAction(_param, _context);
			const result = await this.actionBaseMethod(_param, _context);
			await this.afterAction(_param, result, _context);

			return result;
		} catch (error) {
			return await this.onError(_param, _context, error);
		}
	}
}

type ActionBaseOmitedType = Omit<IActionsBase, "actionType">;

export default ActionsBase;
export type { ActionBaseOmitedType as IActionsBase };
