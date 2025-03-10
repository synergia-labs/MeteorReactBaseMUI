import enumExampleRegisterMethods from "../../common/enums/enumRegisterMethods";
import enumExampleRegisterPublications from "../../common/enums/enumRegisterPublications";
import { ExampleApiMethods } from "../../common/interfaces/methods";
import ApiBase from "../../../../base/api/api.base";

class ExampleApi extends ApiBase {
    constructor() {
        super(enumExampleRegisterMethods, enumExampleRegisterPublications);
    }
}


type teste = ExampleApiMethods & ExampleApi;

const exampleApi = new ExampleApi() as teste;
export default exampleApi;
export type { teste as ExampleApi  };