import React, { ReactNode } from "react";
import ApiBase from "../../api/api.base";
import { enumEmailMethods } from "./common/enums/methods.enum";
import { EmailApiMethodsType } from "./common/interfaces/methods";
import SendEmailType from "./common/types/sendEmail";
import { Meteor } from "meteor/meteor";
import { Buffer } from "buffer";
global.Buffer = Buffer;

class EmailApi extends ApiBase {
	constructor() {
		super(enumEmailMethods, {});
	}

	sendEmail = (
		{ html, ...props }: Omit<SendEmailType, "html"> & { html: ReactNode },
		callback: (error: Meteor.Error) => void
	) => {
		Meteor.call(enumEmailMethods.sendEmail, { ...props, html: `` }, callback);
	};
}

export type EmailApiType = EmailApi & EmailApiMethodsType;

const emailApi = new EmailApi() as EmailApiType;
export default emailApi;
