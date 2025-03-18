import { StorageServerMethods } from '../../../storage/common/interfaces/methods';
import { checkMethodPermission } from '../../methods/checkMethodPermission';
import { getMethod } from '../../methods/getMethod';
import { getRole } from '../../methods/getRole';
import { methodSafeInsert } from '../../methods/methodSafeInsert';
import { roleSafeInsert } from '../../methods/roleSafeInsert';
import { MethodType } from '/imports/base/types/method';
import { TransformServerToApiMethods } from '/imports/base/types/serverApiMethods';

interface SecurityServerMethods extends Record<string, (...args: any) => any> {
	roleSafeInsert: MethodType<typeof roleSafeInsert>;
	methodSafeInsert: MethodType<typeof methodSafeInsert>;
	getMethod: MethodType<typeof getMethod>;
	getRole: MethodType<typeof getRole>;
	checkMethodPermission: MethodType<typeof checkMethodPermission>;
}

type SecurityApiMethods = TransformServerToApiMethods<StorageServerMethods>;
export type { SecurityServerMethods, SecurityApiMethods };
