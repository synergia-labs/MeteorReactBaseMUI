import fillDatabaseWithFakeDataInstance from "../../backend/methods/fillDatabaseWithFakeData.callMethod";
import { MethodType } from "/imports/base/types/method";
import { TransformServerToApiMethods } from "/imports/base/types/serverApiMethods";

/**Interface para utilização da classe módulo nos métodos.
 * IMPORTANTE: Adicionar apenas os métodos. Não adicionar publicações.
 */
interface ExampleServerMethods extends Record<string, (...args: any) => any> {
	fillDatabaseWithFakeDataInstance: MethodType<typeof fillDatabaseWithFakeDataInstance>;
}

type ExampleApiMethods = TransformServerToApiMethods<ExampleServerMethods>;
export type { ExampleServerMethods, ExampleApiMethods };
