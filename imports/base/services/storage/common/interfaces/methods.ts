import { deleteImage } from '../../methods/deleteImage';
import { uploadImage } from '../../methods/uploadImage';
import { MethodType } from '/imports/base/types/method';
import { TransformServerToApiMethods } from '/imports/base/types/serverApiMethods';

interface StorageServerMethods extends Record<string, (...args: any) => any> {
	uploadImage: MethodType<typeof uploadImage>;
	deleteImage: MethodType<typeof deleteImage>;
}

type StorageApiMethods = TransformServerToApiMethods<StorageServerMethods>;
export type { StorageServerMethods, StorageApiMethods };
