import { Mongo } from "meteor/mongo";
import { ExampleServer } from "../example.server";
import PublicationBase from "/imports/base/server/publication/publication.base";
import { IContext } from "/imports/typings/IContext";

class ExampleListPublication extends PublicationBase<ExampleServer, undefined, undefined>{
    constructor() {
        super({ 
            name: 'exampleList', 
            enableCountPublication: true,
            transformedPublication: true,
        });
    }
    
    public async action(_filter: Mongo.Selector<undefined>, _options: Mongo.Options<undefined>, _context: IContext): Promise<Mongo.Cursor<any>> {
        return this.getServerInstance()?.mongoInstance?.getCollectionInstance().find(_filter, _options) as Mongo.Cursor<any>;
    }

    public async transformPublication(_doc: any, _context: IContext): Promise<any> {
        return {..._doc, teste: 'teste'};
    }


}

const exampleListPublicationInstance = new ExampleListPublication();
export default exampleListPublicationInstance;