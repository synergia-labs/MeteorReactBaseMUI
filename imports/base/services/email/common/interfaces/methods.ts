import { MethodType as _ } from "/imports/base/types/method";
import { TransformServerToApiMethodsType } from "/imports/base/types/serverApiMethods";

interface IEmailServerMethods extends Record<string, (...args: any) => any> {}

type EmailApiMethodsType = TransformServerToApiMethodsType<IEmailServerMethods>;
export type { IEmailServerMethods, EmailApiMethodsType };
