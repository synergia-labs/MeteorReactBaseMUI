import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import { UsersServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { z } from "zod";
import storageServer from "/imports/services/storage/storage.server";
import { enumFileType } from "/imports/services/storage/common/types/file.type";
import isValidLink from "/imports/libs/string/isValidLink";
import fetchImageMetadata from "/imports/libs/downloads/fetchImageMetadata";
import { getFileUrlSch, GetFileUrlType } from "/imports/services/storage/common/types/getFileUrl.type";
import { enumResolution } from "/imports/services/storage/common/types/resolution.type";

/**
 * Método que busca a foto do usuário.
 * @property {string} _id - Id do usuário.
 * @returns {string | undefined} - Foto do usuário.
 */

class GetUserPhotoCallMethod extends MethodBase<UsersServer, Omit<GetFileUrlType, "type">, string | undefined> {
	constructor() {
		super({
			name: enumUserProfileRegisterMethods.getUserPhoto,
			paramSch: getFileUrlSch.omit({ type: true }),
			returnSch: z.string().optional()
		});
	}

	async action(
		{ _id, resolution = enumResolution.enum.P144, ...otherProps }: Omit<GetFileUrlType, "type">,
		_context: IContext
	): Promise<string | undefined> {
		const user = await this.getServerInstance()?.mongoInstance.findOneAsync({
			_id: _id
		});
		if (!user) this.generateError({ _message: "Usuário não encontrado", _code: "404" }, _context);
		if (!user?.profile?.photo) return undefined;
		if (isValidLink(user?.profile?.photo)) {
			const { _id, path } = await storageServer.uploadImage({ archive: await fetchImageMetadata(user?.profile?.photo) });
			await this.getServerInstance()?.mongoInstance.updateAsync({ _id: user._id }, { $set: { "profile.photo": _id } });
			return path;
		}
		return storageServer.getUrl({
			_id: user!.profile!.photo!,
			type: enumFileType.enum.IMAGE,
			resolution: resolution,
			...otherProps
		});
	}
}

const getUserPhotoCallMethodInstance = new GetUserPhotoCallMethod();
export default getUserPhotoCallMethodInstance;
