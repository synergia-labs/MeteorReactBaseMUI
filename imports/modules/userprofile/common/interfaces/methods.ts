import { Meteor } from "meteor/meteor";
import { MethodType } from "/imports/base/server/server.base";

/**Interface para utilização da classe módulo nos métodos.
 * IMPORTANTE: Adicionar apenas os métodos. Não adicionar publicações.
 */
interface UserProfileServerMethods extends Record<string, (...args: any) => any> {
}

type TransformServerToApiMethods<T extends Record<string, (...args: any) => any>> = {
    [K in keyof T]: (param: Parameters<T[K]>[0], callback: (error: Meteor.Error, result: Awaited<ReturnType<T[K]>>) => void) => void;
};

type UserProfileApiMethods = TransformServerToApiMethods<UserProfileServerMethods>;
export type { UserProfileServerMethods, UserProfileApiMethods };