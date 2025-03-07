import ServerBase from '../server.base';
import ActionsBase, { IActionsBase } from '../actions.base';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { IContext } from '/imports/typings/IContext';

interface IPublicationBase extends Omit<IActionsBase, 'returnSch'> {
    enableCountPublication?: boolean;
    transformedPublication?: boolean;
}

abstract class PublicationBase< Server extends ServerBase, Param = unknown, Return = unknown> 
	extends ActionsBase<Server, [Mongo.ObjectID | Mongo.Selector<Param>, Mongo.Options<Param>], Mongo.Cursor<Return>> 
{
    private enableCountPublication: boolean;
    private transformedPublication: boolean;


	constructor({enableCountPublication = false, transformedPublication = false, ...props}: IPublicationBase) { 
        super({ ...props, actionType: 'publication', returnSch: undefined }); 
        this.enableCountPublication = enableCountPublication;
        this.transformedPublication = transformedPublication;
    };

    public isCountPublicationEnabled(): boolean { return !!this.enableCountPublication; }
    public isTransformedPublication(): boolean { return !!this.transformedPublication; }

    abstract action(_filter: Mongo.ObjectID | Mongo.Selector<Param>, _options: Mongo.Options<Param>, _context: IContext): Promise<Mongo.Cursor<Return>>;

    public actionBaseMethod(_param: [Mongo.ObjectID | Mongo.Selector<Param>, Mongo.Options<Param>], _context: IContext): Promise<Mongo.Cursor<Return, Return>> {
        return this.action(_param[0], _param[1], _context);
    }

    public async transformPublication(_doc: any, _context: IContext): Promise<Return> {
        throw new Meteor.Error('500', 'O método transformPublication deve ser implementado');
    }
}

export default PublicationBase;