import { deleteAudio } from "../../methods/deleteAudio";
import { deleteImage } from "../../methods/deleteImage";
import { uploadAudio } from "../../methods/uploadAudio";
import { uploadImage } from "../../methods/uploadImage";
import { MethodType } from "/imports/base/types/method";
import { TransformServerToApiMethodsType } from "/imports/base/types/serverApiMethods";

interface IStorageServerMethods extends Record<string, (...args: any) => any> {
	uploadImage: MethodType<typeof uploadImage>;
	deleteImage: MethodType<typeof deleteImage>;
	uploadAudio: MethodType<typeof uploadAudio>;
	deleteAudio: MethodType<typeof deleteAudio>;
}

type StorageApiMethodsType = TransformServerToApiMethodsType<IStorageServerMethods>;
export type { IStorageServerMethods, StorageApiMethodsType };
