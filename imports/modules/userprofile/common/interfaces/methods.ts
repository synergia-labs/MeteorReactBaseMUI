import { Meteor } from "meteor/meteor";
import { MethodType } from "/imports/base/types/method";
import checkIfHasAdminUserCallMethodInstance from "../../backend/methods/checkIfHasAdminUser.callMethod";
import createUserCallMethodInstance from "../../backend/methods/createUser.callMethod";
import onLoginInstance from "../../backend/methods/onLogin";
import { TransformServerToApiMethods } from "/imports/base/types/serverApiMethods";
import sendResetPasswordInstance from "../../backend/methods/sendResetPasswordEmail";

/**Interface para utilização da classe módulo nos métodos.
 * IMPORTANTE: Adicionar apenas os métodos. Não adicionar publicações.
 */
interface UserProfileServerMethods extends Record<string, (...args: any) => any> {
    checkIfHasAdminUser: MethodType<typeof checkIfHasAdminUserCallMethodInstance>;
    create: MethodType<typeof createUserCallMethodInstance>;
    onLogin: MethodType<typeof onLoginInstance>;
    sendResetPasswordEmail: MethodType<typeof sendResetPasswordInstance>;
}


type UsersApiMethods = TransformServerToApiMethods<UserProfileServerMethods>;
export type { UserProfileServerMethods, UsersApiMethods };