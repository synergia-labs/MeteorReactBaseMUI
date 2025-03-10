import { Meteor } from "meteor/meteor";
import fillDatabaseWithFakeDataInstance from "../../backend/methods/fillDatabaseWithFakeData.callMethod";
import { MethodType } from "/imports/base/server/server.base";

/**Interface para utilização da classe módulo nos métodos.
 * IMPORTANTE: Adicionar apenas os métodos. Não adicionar publicações.
 */
interface ExampleServerMethods extends Record<string, (...args: any) => any> {
    fillDatabaseWithFakeDataInstance: MethodType<typeof fillDatabaseWithFakeDataInstance>;
}

type TransformServerToApiMethods<T extends Record<string, (...args: any) => any>> = {
    [K in keyof T]: (param: Parameters<T[K]>[0], callback: (error: Meteor.Error, result: Awaited<ReturnType<T[K]>>) => void) => void;
};

type ExampleApiMethods = TransformServerToApiMethods<ExampleServerMethods>;
export type { ExampleServerMethods, ExampleApiMethods };