import { checkMethodPermission } from "../../backend/methods/checkMethodPermission";
import { getMethod } from "../../backend/methods/getMethod";
import { getRole } from "../../backend/methods/getRole";
import { getRolesListNames } from "../../backend/methods/getRolesListNames";
import { methodSafeInsert } from "../../backend/methods/methodSafeInsert";
import { roleSafeInsert } from "../../backend/methods/roleSafeInsert";
import { MethodType } from "../../../../types/method";
import { TransformServerToApiMethodsType } from "../../../../types/serverApiMethods";

interface ISecurityServerMethods extends Record<string, (...args: any) => any> {
	roleSafeInsert: MethodType<typeof roleSafeInsert>;
	methodSafeInsert: MethodType<typeof methodSafeInsert>;
	getMethod: MethodType<typeof getMethod>;
	getRole: MethodType<typeof getRole>;
	getRolesListNames: MethodType<typeof getRolesListNames>;
	checkMethodPermission: MethodType<typeof checkMethodPermission>;
}

type SecurityApiMethodsType = TransformServerToApiMethodsType<ISecurityServerMethods>;
export type { ISecurityServerMethods, SecurityApiMethodsType };
