import { StorageServerMethods } from '../../../storage/common/interfaces/methods';
import { TransformServerToApiMethods } from '/imports/base/types/serverApiMethods';

interface SecurityServerMethods extends Record<string, (...args: any) => any> {}

type SecurityApiMethods = TransformServerToApiMethods<StorageServerMethods>;
export type { SecurityServerMethods, SecurityApiMethods };
