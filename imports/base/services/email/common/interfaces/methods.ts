import sendEmailInstance from "../../methods/sendEmail";
import { MethodType as _, MethodType } from "/imports/base/types/method";
import { TransformServerToApiMethodsType } from "/imports/base/types/serverApiMethods";

interface IEmailServerMethods extends Record<string, (...args: any) => any> {
	sendEmail: MethodType<typeof sendEmailInstance>;
}

type EmailApiMethodsType = TransformServerToApiMethodsType<IEmailServerMethods>;
export type { IEmailServerMethods, EmailApiMethodsType };
