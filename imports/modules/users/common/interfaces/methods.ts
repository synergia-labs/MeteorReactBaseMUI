import { MethodType } from "../../../../types/method";
import checkIfHasAdminUserCallMethodInstance from "../../backend/methods/checkIfHasAdminUser.callMethod";
import createUserCallMethodInstance from "../../backend/methods/createUser.callMethod";
import { TransformServerToApiMethodsType } from "../../../../types/serverApiMethods";
import getUserPhotoCallMethodInstance from "../../backend/methods/getUserPhoto";
import sendResetPasswordInstance from "../../backend/accountsMethods/sendResetPasswordEmail";
import updateUser from "../../backend/methods/updateUser";
import upsertUser from "../../backend/methods/upsertUser";
import countUsers from "../../backend/methods/countUsers";
import enableUser from "../../backend/methods/enableUser";
import disableUser from "../../backend/methods/disableUser";
import sendVerificationEmail from "../../backend/accountsMethods/sendVerificationEmail.callMethod";
import sendEnrolEmail from "../../backend/accountsMethods/sendEnrolEmail";
import { getUserBySimilarity } from "../../backend/methods/getBySimilarity";
import { setSimilarity } from "../../backend/methods/setSimilarity";
import { setIsMappeable } from "../../backend/methods/setIsMappeable";

/**Interface para utilização da classe módulo nos métodos.
 * IMPORTANTE: Adicionar apenas os métodos. Não adicionar publicações.
 */
interface IUsersServerMethods extends Record<string, (...args: any) => any> {
	checkIfHasAdminUser: MethodType<typeof checkIfHasAdminUserCallMethodInstance>;
	createUser: MethodType<typeof createUserCallMethodInstance>;
	getUserPhoto: MethodType<typeof getUserPhotoCallMethodInstance>;
	sendResetPasswordEmail: MethodType<typeof sendResetPasswordInstance>;
	updateUser: MethodType<typeof updateUser>;
	upsertUser: MethodType<typeof upsertUser>;
	countUsers: MethodType<typeof countUsers>;
	enableUser: MethodType<typeof enableUser>;
	disableUser: MethodType<typeof disableUser>;
	sendVerificationEmail: MethodType<typeof sendVerificationEmail>;
	sendEnrolEmail: MethodType<typeof sendEnrolEmail>;
	getUserBySimilarity: MethodType<typeof getUserBySimilarity>;
	setSimilarity: MethodType<typeof setSimilarity>;
	setIsMappeable: MethodType<typeof setIsMappeable>;
}

type UsersApiMethodsType = TransformServerToApiMethodsType<IUsersServerMethods>;
export type { IUsersServerMethods, UsersApiMethodsType };
