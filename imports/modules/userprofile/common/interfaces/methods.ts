import { MethodType } from "../../../../types/method";
import checkIfHasAdminUserCallMethodInstance from "../../backend/methods/checkIfHasAdminUser.callMethod";
import createUserCallMethodInstance from "../../backend/methods/createUser.callMethod";
import { TransformServerToApiMethodsType } from "../../../../types/serverApiMethods";
import getUserPhotoCallMethodInstance from "../../backend/methods/getUserPhoto";
import sendResetPasswordInstance from "../../backend/accountsMethods/sendResetPasswordEmail";

/**Interface para utilização da classe módulo nos métodos.
 * IMPORTANTE: Adicionar apenas os métodos. Não adicionar publicações.
 */
interface IUserProfileServerMethods extends Record<string, (...args: any) => any> {
	checkIfHasAdminUser: MethodType<typeof checkIfHasAdminUserCallMethodInstance>;
	create: MethodType<typeof createUserCallMethodInstance>;
	getUserPhoto: MethodType<typeof getUserPhotoCallMethodInstance>;
	sendResetPasswordEmail: MethodType<typeof sendResetPasswordInstance>;
}

type UsersApiMethodsType = TransformServerToApiMethodsType<IUserProfileServerMethods>;
export type { IUserProfileServerMethods, UsersApiMethodsType };
