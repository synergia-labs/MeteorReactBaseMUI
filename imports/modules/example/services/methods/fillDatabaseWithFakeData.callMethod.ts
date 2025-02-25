import { ExampleServer } from "../example.server";
import { MethodBase } from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";

class FillDatabaseWithFakeData extends MethodBase<ExampleServer, void, void> {
    constructor() {
        super({ name: 'fillDatabaseWithFakeData', endpointType: 'post' });
    }

    public async call(prop: void, context: IContext): Promise<void> {
        console.log('fillDatabaseWithFakeData');
        console.log('prop', prop);
        console.log('context', context);
    }
} 

const fillDatabaseWithFakeDataInstance = new FillDatabaseWithFakeData();

export default fillDatabaseWithFakeDataInstance;