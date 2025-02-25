import { Mongo } from "meteor/mongo";
import { IExample } from "../exampleSch";
import { ExampleServerApi } from "../exampleServerApi";
import { IFilterPublication, IOptionsPublication } from "/imports/typings/IFilterProperties";

/**
 * Exemplo de publicação para recuperar detalhes de uma tarefa.
 * Regras:
 * 		- Retorna apenas os campos necessários para visualização.
 * 
 * @param filter Filtro para a consulta.
 * @param optionsPub Opções para a consulta.
 * @returns {Promise<Mongo.Cursor<IExample>>} Lista de tarefas.
 * 
*/

export function exampleDetailPublication(
    this: ExampleServerApi,
    filter?: IFilterPublication<IExample>,
    optionsPub?: IOptionsPublication<IExample>
): Promise<Mongo.Cursor<IExample>> {
    const publicationOptions: IOptionsPublication<IExample> = {
        ...optionsPub,
        projection: {
            contacts: 1,
            title: 1,
            description: 1,
            type: 1,
            typeMulti: 1,
            date: 1,
            files: 1,
            chip: 1,
            statusRadio: 1,
            statusToggle: 1,
            slider: 1,
            check: 1,
            address: 1
        }
    };

    return this.defaultDetailCollectionPublication(filter, publicationOptions);

};