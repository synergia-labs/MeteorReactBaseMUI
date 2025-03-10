import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

abstract class ApiBase {
    private subscribeList: Array<string>;

    constructor(methodsNames: Record<string, string>, subscribeList: Record<string, string>) {
        Object.keys(methodsNames).forEach((methodName) => 
            this.registerCallMethod(methodName, methodsNames[methodName])
        );
        this.subscribeList = Object.values(subscribeList);
    }

    /**
     * Método para registrar os Meteors Calls. 
     * @param methodName  - Nome do método que será adicionado a classe.
     * @param callName    - Nome do método que será chamado no Meteor.
     * @returns {void}    - O Retorno do método é dado no callback de parâmetro.    
    */
    private registerCallMethod(methodName: string, callName: string): void {
        (this as any)[methodName] = (param: any, callBack: (error: Meteor.Error, result: any) => void) => {
            Meteor.call(callName, param, callBack);
        }
    };

    /**
     * Método para registrar as publicações.
     * @template Param          - Parâmetro genérico para o filtro da publicação.
     * @param subscribeName     - Nome da publicação registrada no servidor (registrada no enum de publicações).
     * @param filter            - Filtro para a publicação.
     * @param options           - Opções para a publicação.
     * @returns {void}          - O método apenas registra uma publicação.
    */
    public subscribe<Param>(
        subscribeName: string,
        filter?: Mongo.ObjectID | Mongo.Selector<Param>, 
        options?: Mongo.Options<Param>
    ): void {
        try{
            if(!this.subscribeList.includes(subscribeName)) 
                throw new Meteor.Error( '404', `Não foi possível encontrar a publicação: ${subscribeName}`);
            Meteor.subscribe(subscribeName, filter, options);
        }catch(e){
            console.error(e);
        }        
    };
}

export default ApiBase;