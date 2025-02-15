import fakeTasks from "../../fakeData/exampleFakeData";
import { ExampleServerApi } from "../exampleServerApi";
import { IContext } from "/imports/typings/IContext";

/**
 * Preenche o banco de dados com dados falsos.
 * 
 * @param {undefined} _ 		- Parâmetro não utilizado. 
 * @param {IContext} context 	- Contexto da operação.
 * @returns {Promise<void>} 	- Promessa de execução.
 * 
*/
export async function fillDatabaseWithFakeData  (
    this: ExampleServerApi,
    _: undefined, 
    context: IContext
): Promise<void> {
    for(const task of fakeTasks) 
        await this.serverInsert(task, context);
};