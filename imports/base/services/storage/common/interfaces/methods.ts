import { deleteAudio } from '../../methods/deleteAudio';
import { deleteImage } from '../../methods/deleteImage';
import { uploadAudio } from '../../methods/uploadAudio';
import { uploadImage } from '../../methods/uploadImage';
import { MethodType } from '/imports/base/types/method';
import { TransformServerToApiMethods } from '/imports/base/types/serverApiMethods';

interface StorageServerMethods extends Record<string, (...args: any) => any> {
	uploadImage: MethodType<typeof uploadImage>;
	deleteImage: MethodType<typeof deleteImage>;
	uploadAudio: MethodType<typeof uploadAudio>;
	deleteAudio: MethodType<typeof deleteAudio>;
}

type StorageApiMethods = TransformServerToApiMethods<StorageServerMethods>;
export type { StorageServerMethods, StorageApiMethods };
