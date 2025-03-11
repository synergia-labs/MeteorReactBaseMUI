import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import { UserProfileServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";

class FillDatabaseWithFakeData extends MethodBase<UserProfileServer, void, void> {
    constructor() {
        super({ name: enumUserProfileRegisterMethods.sendVerificationEmail, endpointType: 'post' });
    }

    async action(_prop: void, _context: IContext): Promise<void> {
    }
} 

const fillDatabaseWithFakeDataInstance = new FillDatabaseWithFakeData();
export default fillDatabaseWithFakeDataInstance;
