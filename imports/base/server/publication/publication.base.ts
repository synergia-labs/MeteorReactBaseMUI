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
	extends ActionsBase<Server, Param, Mongo.Cursor<Return>> 
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

    public transformPublication(_doc: any): Return {
        throw new Meteor.Error('500', 'O método transformPublication deve ser implementado');
    }
}

export default PublicationBase;