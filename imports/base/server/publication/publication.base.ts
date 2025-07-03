import ServerBase from "../server.base";
import ActionsBase, { IActionsBase } from "../actions.base";
import { Mongo } from "meteor/mongo";
import { Subscription } from "meteor/meteor";
import { IContext } from "../../../types/context";
import { z } from "zod";
import GenerateI18nErrorType from "/imports/services/internationalization/common/types/generateI18nErrorType";
import generateI18nError from "/imports/services/internationalization/utils/generateI18nError";

interface IPublicationBase extends IActionsBase {
	enableCountPublication?: boolean;
	transformedPublication?: boolean;
}

abstract class PublicationBase<Server extends ServerBase, Param, Return> extends ActionsBase<
	Server,
	[Param, Mongo.Options<Return>],
	Mongo.Cursor<Return>
> {
	private enableCountPublication: boolean;
	private transformedPublication: boolean;
	private paramPubliSch: z.ZodType<Param>;
	private returnPubliSch: z.ZodType<Return>;

	constructor({ enableCountPublication = false, transformedPublication = false, ...props }: IPublicationBase) {
		super({
			...props,
			actionType: "publication",
			returnSch: undefined,
			paramSch: undefined
		});
		this.paramPubliSch = props.paramSch as z.ZodType<Param>;
		this.returnPubliSch = props.returnSch as z.ZodType<Return>;

		this.enableCountPublication = enableCountPublication;
		this.transformedPublication = transformedPublication;
	}

	public isCountPublicationEnabled(): boolean {
		return !!this.enableCountPublication;
	}
	public isTransformedPublication(): boolean {
		return !!this.transformedPublication;
	}

	public async execute(
		_param: [Param, Mongo.Options<Return>],
		_context: IContext
	): Promise<Mongo.Cursor<Return, Return>> {
		return await super.execute(_param, _context);
	}

	protected async beforeAction(_param: [Param, Mongo.Options<unknown>], _context: IContext) {
		if (this.paramPubliSch) {
			this.paramPubliSch.parse(_param[0]);
		}
		await super.beforeAction(_param, _context);
	}

	protected generateError(params: GenerateI18nErrorType, _context?: IContext): void {
		super.includeAuditError(params, _context);
		(_context?.meteorInstance as Subscription)?.error(generateI18nError({ ...params, context: _context }));
	}

	abstract action(_params: Param, _options: Mongo.Options<Return>, _context: IContext): Promise<Mongo.Cursor<Return>>;

	protected async afterAction(
		_param: [Param, Mongo.Options<unknown>],
		_result: Mongo.Cursor<Return>,
		_context: IContext
	): Promise<void> {
		if (this.returnPubliSch) {
			const errors: Array<string> = [];
			_result?.forEach((doc) => {
				try {
					this.returnPubliSch.parse(doc);
				} catch (__) {
					errors.push(JSON.stringify(doc));
				}
				this.returnPubliSch.parse(doc);
			});
			if (errors.length > 0) {
				this.generateError(
					{
						key: "schemaError",
						params: { schema: errors.join("\n") },
						code: "500"
					},
					_context
				);
			}
		}
		super.afterAction(_param, _result, _context);
	}

	protected actionBaseMethod(_param: [Param, Mongo.Options<Return>], _context: IContext): Promise<Mongo.Cursor<Return>> {
		return this.action(_param[0], _param[1], _context);
	}

	async transformPublication(_doc: Return, _context: IContext): Promise<Return | void> {
		return this.generateError({ key: "publishTransformNotImplemented", code: "501" }, _context);
	}
}

export default PublicationBase;
