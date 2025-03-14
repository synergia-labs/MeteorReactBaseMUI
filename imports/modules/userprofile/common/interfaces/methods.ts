import { Meteor } from "meteor/meteor";
import { MethodType } from "/imports/base/types/method";
import checkIfHasAdminUserCallMethodInstance from "../../backend/methods/checkIfHasAdminUser.callMethod";
import createUserCallMethodInstance from "../../backend/methods/createUser.callMethod";

/**Interface para utilização da classe módulo nos métodos.
 * IMPORTANTE: Adicionar apenas os métodos. Não adicionar publicações.
 */
interface UserProfileServerMethods extends Record<string, (...args: any) => any> {
    checkIfHasAdminUser: MethodType<typeof checkIfHasAdminUserCallMethodInstance>;
    create: MethodType<typeof createUserCallMethodInstance>;
}

type TransformServerToApiMethods<T extends Record<string, (...args: any) => any>> = {
    [K in keyof T]: (param: Parameters<T[K]>[0], callback: (error: Meteor.Error, result: Awaited<ReturnType<T[K]>>) => void) => void;
};

type UserProfileApiMethods = TransformServerToApiMethods<UserProfileServerMethods>;
export type { UserProfileServerMethods, UserProfileApiMethods };