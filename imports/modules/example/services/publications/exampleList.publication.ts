import { Mongo } from "meteor/mongo";
import { ExampleServer } from "../example.server";
import PublicationBase from "/imports/base/server/publication/publication.base";
import { IContext } from "/imports/typings/IContext";

class ExampleListPublication extends PublicationBase<ExampleServer, undefined, undefined>{
    constructor() {
        super({ name: 'exampleList', enableCountPublication: true});
    }
    
    public async action(_param: undefined, _context: IContext): Promise<Mongo.Cursor<any>> {
        console.log("Parametro recebido na publicação", _param);
        console.log('ExampleListPublication.action', _context);
        return this.getServerInstance()?.mongoInstance?.getCollectionInstance().find({}) as Mongo.Cursor<any>;
    }
}

const exampleListPublicationInstance = new ExampleListPublication();
export default exampleListPublicationInstance;