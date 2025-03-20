import { checkMethodPermission } from "../../backend/methods/checkMethodPermission";
import { getMethod } from "../../backend/methods/getMethod";
import { getRole } from "../../backend/methods/getRole";
import { methodSafeInsert } from "../../backend/methods/methodSafeInsert";
import { roleSafeInsert } from "../../backend/methods/roleSafeInsert";
import { MethodType } from "/imports/base/types/method";
import { TransformServerToApiMethods } from "/imports/base/types/serverApiMethods";

interface SecurityServerMethods extends Record<string, (...args: any) => any> {
	roleSafeInsert: MethodType<typeof roleSafeInsert>;
	methodSafeInsert: MethodType<typeof methodSafeInsert>;
	getMethod: MethodType<typeof getMethod>;
	getRole: MethodType<typeof getRole>;
	checkMethodPermission: MethodType<typeof checkMethodPermission>;
}

type SecurityApiMethods = TransformServerToApiMethods<SecurityServerMethods>;
export type { SecurityServerMethods, SecurityApiMethods };
