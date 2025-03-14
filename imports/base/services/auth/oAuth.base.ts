import { ServiceConfiguration } from "meteor/service-configuration";
import { hasValue } from "/imports/libs/hasValue";

abstract class OAuthBase {
    private cliendId: string;
    private secret: string;
    private loginStyle: 'popup' | 'redirect';
    private serviceName: string;

    constructor(serviceName: string, clientId: string, secret: string, loginStyle?: 'popup' | 'redirect') {
        this.serviceName = serviceName;
        this.cliendId = clientId;
        this.secret = secret;
        this.loginStyle = loginStyle ?? 'popup';
    }

    public getServiceName = (): string => this.serviceName;

    /**
     * Método que inicializa o serviço de autent
     * @returns {Promise<void>}
    */
    public async register(): Promise<void> {
        try{
            if(!hasValue(this.cliendId)) throw new Meteor.Error("400", "ClientId não informado");
            if(!hasValue(this.secret)) throw new Meteor.Error("400", "Secret não informado");
            if(!hasValue(this.serviceName)) throw new Meteor.Error("400", "Nome do serviço não informado");

            await ServiceConfiguration.configurations.upsertAsync(
                { service: this.serviceName },
                {
                    $set: {
                        clientId: this.cliendId,
                        secret: this.secret,
                        loginStyle: this.loginStyle,
                    },
                }
            );
        }catch(error){
            console.error('Error initializing OAuth service:', error);
        }
    }

    /**
     * Método que configura o serviço de autenticação
     * Indica o que o sistema deve fazer caso o email usuário a ser cadastrado por um serviço externo já exista
     * na base de dados. 
     * 
     * @param serviceData                   - Dados do serviço de autenticação
     * @returns {Meteor.User | undefined}   - Caso seja retornado um usuário, o sistema irá logar o usuário e associar
     * o serviço de autenticação a ele. Caso seja retornado undefined, o sistema irá criar um novo usuário e associar. 
     * 
     */
    public async onUserMatched(_serviceData: any): Promise<Meteor.User | null> {
        return null;
    }

};

export default OAuthBase;