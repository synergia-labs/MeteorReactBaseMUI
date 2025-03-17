import MethodBase from "/imports/base/server/methods/method.base";
import ProductServerBase from "/imports/base/server/server.product";
import EnumUserProfileSettings from "../common";
import { UserProfileServerMethods } from "../common/interfaces/methods";
import { Meteor } from "meteor/meteor";
import checkIfHasAdminUserCallMethodInstance from "./methods/checkIfHasAdminUser.callMethod";
import createUserCallMethodInstance from "./methods/createUser.callMethod";
import { Mongo } from "meteor/mongo";
import { Accounts } from 'meteor/accounts-base';


/**Array com as instâncias de todas as classes de método do módulo */
const _methodInstances: Array<MethodBase<any, any, any>> = [
    checkIfHasAdminUserCallMethodInstance,
    createUserCallMethodInstance
] as const;

/**Array com as instâncias de todas as classes de publicação do módulo */
const _publicationInstances: Array<any> = [
] as const;

class UserProfileServer extends ProductServerBase {
    public mongoInstance: Mongo.Collection<Meteor.User>;
    public storageInstance?: any;

    constructor() {
        super(EnumUserProfileSettings.MODULE_NAME);
        this.mongoInstance = Meteor.users;

        this.registerMethods(_methodInstances, this);
        this.registerPublications(_publicationInstances, this);
    }

    /**
     * Método chamado quando um usuário faz login.
     * 
     * Este método é chamado automaticamente e configurado no Accounts do sistema.
     * 
     * @param { Meteor.User } user              - Usuário que fez login.
     * @param { Meteor.IConnection } connection - Conexão do usuário. 
     */    
    public async onLogin({ user, connection } : { user: Meteor.User, connection: Meteor.IConnection }): Promise<void> {
        await this.mongoInstance.updateAsync(
			{ _id: user._id }, 
			{ $set: { 'profile.connected': true, 'profile.lastAccess': new Date() }}
		);
		
		connection.onClose(Meteor.bindEnvironment(this.onLogout.bind(this, { user })));
	};

    /**
     * Método chamado quando um usuário faz logout.
     * 
     * Este método é chamado automaticamente e configurado no Accounts do sistema.
     * 
     * @param { Meteor.User } user - Usuário que fez logout.
     */
    public async onLogout({ user } : { user: Meteor.User }): Promise<void> {
        await this.mongoInstance.updateAsync(
			{ _id: user._id }, 
			{ $set: { 'profile.connected': false, 'profile.lastAccess': new Date() }}
		);
    }


}


type interfaceWithMethods = UserProfileServerMethods & UserProfileServer;

const userProfileServer = new UserProfileServer() as interfaceWithMethods;
export default userProfileServer;
export type { interfaceWithMethods as UserProfileServer };