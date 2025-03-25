import React, { ReactNode } from "react";
import ApiBase from "../../api/api.base";
import { enumEmailMethods } from "./common/enums/methods.enum";
import { EmailApiMethodsType } from "./common/interfaces/methods";

class EmailApi extends ApiBase {
	constructor() {
		super(enumEmailMethods, {});
	}
}

export type EmailApiType = EmailApi & EmailApiMethodsType;

const emailApi = new EmailApi() as EmailApiType;
export default emailApi;
