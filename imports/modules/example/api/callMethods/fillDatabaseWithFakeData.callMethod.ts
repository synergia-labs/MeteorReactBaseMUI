import fakeTasks from "../../fakeData/exampleFakeData";
import { ExampleServerApi } from "../exampleServerApi";
import { IUserProfile } from "/imports/modules/userprofile/api/userProfileSch";
import { IContext } from "/imports/typings/IContext";

abstract class BaseClass<ServerBaseInstance, Param, Retorno> {
    protected serverBaseInstance?: ServerBaseInstance;

    public setServerBaseInstance(serverBaseInstance: ServerBaseInstance): void {
        this.serverBaseInstance = serverBaseInstance;
    }

    beforeCallMethod(param: Param, context: IContext): void { 
        if(!this.serverBaseInstance) throw new Error("ServerBaseInstance não definido.");

    }
    abstract callMethod(param: Param, context: IContext): Retorno;
    afterCallMethod(param: Param, context: IContext): void {  /* Implementação padrão */ }
    execute(param: Param, context: IContext): Retorno {
        this.beforeCallMethod(param, context);
        const retorno = this.callMethod(param, context);
        this.afterCallMethod(param, context);
        return retorno;
    }
    
}


interface ParamatroDoMetodo{ user: IUserProfile; }
interface RetornoCallMethod{ id: string; }

class FillDatabaseWithFakeData extends BaseClass<ExampleServerApi, ParamatroDoMetodo, RetornoCallMethod> {
    beforeCallMethod(param: ParamatroDoMetodo, context: IContext): void {
        super.beforeCallMethod(param, context);
        this.serverBaseInstance?.teste();
    }


    callMethod(param: ParamatroDoMetodo, context: IContext): RetornoCallMethod {
        console.log("Preenchendo banco de dados com dados falsos.");
        console.log("Numero:", this.serverBaseInstance?.getNumero());
        return { id: "ok" };
    }
};

class FillDatabaseWithFakeData2 extends BaseClass<ExampleServerApi, ParamatroDoMetodo, RetornoCallMethod> {

    callMethod(param: ParamatroDoMetodo, context: IContext): RetornoCallMethod {
        console.log("Preenchendo banco de dados com dados falsos. 222222222222222222");
        this.serverBaseInstance?.setNumero(10);
        this.serverBaseInstance?.fillDatabase(param, context);
        return { id: "ok" };
    }
};

const fillDatabaseWithFakeDataCallMethod = new FillDatabaseWithFakeData();
const fillDatabaseWithFakeDataCallMethod2 = new FillDatabaseWithFakeData2();

export { fillDatabaseWithFakeDataCallMethod, fillDatabaseWithFakeDataCallMethod2 };














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