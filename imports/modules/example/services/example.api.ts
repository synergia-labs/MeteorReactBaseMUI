import { ProductBase } from "/imports/base/api/api.product";
import { IMeteorError } from "/imports/typings/IMeteorError";

class ExampleApi extends ProductBase<any> {
    constructor() {
        super('example', {}, { enableCallMethodObserver: false, enableSubscribeObserver: false});
    }

    fillDatabaseWithFakeData = (callback?: (e: IMeteorError) => void) => this.callMethod('fillDatabaseWithFakeData', {}, callback);

}

const exampleApi = new ExampleApi();
export default exampleApi;