import { Mongo } from "meteor/mongo";
import { IExample } from "../exampleSch";
import { IFilterPublication, IOptionsPublication } from "/imports/typings/IFilterProperties";
import { getUserServer } from "/imports/modules/userprofile/api/userProfileServerApi";
import { IMongoOptions } from "/imports/api/serverBase";
import { ExampleServerApi } from "../exampleServerApi";

/**
 * Exemplo de publicação para recuperar a lista de tarefas.
 * Regras:
 * 		- Retorna apenas as tarefas do usuário logado.
 * 
 * @param filter Filtro para a consulta.
 * @param optionsPub Opções para a consulta.
 * @returns {Promise<Mongo.Cursor<IExample>>} Lista de tarefas.
 * 
*/
export function exmpleListPublication(
    this: ExampleServerApi,
    filter?: IFilterPublication<IExample>,
    optionsPub?: IOptionsPublication<IExample>
): Promise<Mongo.Cursor<IExample>> {
    const user = getUserServer();
    const subFilter = { ...filter, createdby: user._id };
    const subOptions: Partial<IMongoOptions<IExample>> = {
        ...optionsPub,
        projection: { title: 1, type: 1, typeMulti: 1, createdat: 1 },
    };
    return this.defaultListCollectionPublication(subFilter, subOptions);
};