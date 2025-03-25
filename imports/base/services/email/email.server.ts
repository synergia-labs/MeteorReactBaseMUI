import MethodBase from "../../server/methods/method.base";
import ServerBase from "../../server/server.base";
import { enumEmailConfig } from "./common/enums/config.enum";
import sendEmailInstance from "./methods/sendEmail";

const _methodInstances: Array<MethodBase<any, any, any>> = [sendEmailInstance] as const;

export class EmailServer extends ServerBase {
	constructor() {
		super(enumEmailConfig.API_NAME);

		this.registerMethods(_methodInstances, this);
	}
}

const emailServerInstance = new EmailServer();
export default emailServerInstance;
