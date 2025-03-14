import ServerBase from '../server.base';
import ActionsBase, { IActionsBase } from '../actions.base';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { IContext } from '/imports/typings/IContext';
import { z } from 'zod';
import { MongoOptionsType } from '../../types/mongoOptions';
import e from 'cors';

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
			actionType: 'publication',
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

	protected async beforeAction(_param: [Param, Mongo.Options<unknown>], _context: IContext) {
		if (this.paramPubliSch) {
			this.paramPubliSch.parse(_param[0]);
		}
		super.beforeAction(_param, _context);
	}

	abstract action(_params: Param, _options: Mongo.Options<Return>, _context: IContext): Promise<Mongo.Cursor<Return>>;

	protected async afterAction(
		_param: [Param, Mongo.Options<unknown>],
		_result: Mongo.Cursor<Return>,
		_context: IContext
	): Promise<void> {
		if (this.returnPubliSch) {
			const errors: Array<string> = [];
			_result.forEach((doc) => {
				try {
					this.returnPubliSch.parse(doc);
				} catch (__) {
					errors.push(JSON.stringify(doc));
				}
				this.returnPubliSch.parse(doc);
			});
			if (errors.length > 0) {
				throw new Meteor.Error('500', `Os documentos não estão de acordo com o schema: \n${errors.join('\n')}`);
			}
		}
		super.afterAction(_param, _result, _context);
	}

	protected actionBaseMethod(
		_param: [Param, Mongo.Options<Return>],
		_context: IContext
	): Promise<Mongo.Cursor<Return>> {
		return this.action(_param[0], _param[1], _context);
	}

	protected async transformPublication(_doc: Return, _context: IContext): Promise<Return> {
		throw new Meteor.Error('500', 'O método transformPublication deve ser implementado');
	}
}

export default PublicationBase;
