import { enumEmailConfig } from "./config.enum";

function getName(name: string) {
	return `${enumEmailConfig.API_NAME}.${name}`;
}

export const enumEmailMethods = {
	sendEmail: getName("sendEmail")
};
