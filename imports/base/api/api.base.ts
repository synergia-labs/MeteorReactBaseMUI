import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

abstract class ApiBase {
	constructor(methodsNames: Record<string, string>, publicationsNames: Record<string, string>) {
		Object.keys(methodsNames).forEach((methodName) => this.registerCallMethod(methodName, methodsNames[methodName]));
		Object.keys(publicationsNames).forEach((publicationName) =>
			this.registerPublications(publicationName, publicationsNames[publicationName])
		);
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
		};
	}

	/**
	 * Método para registrar as publicações.
	 * @param publicationName  - Nome da publicação que será adicionada a classe.
	 * @param subscribeName    - Nome da publicação que será chamada no Meteor.
	 * @returns {void}         - O método apenas registra uma publicação.
	 */
	private registerPublications(publicationName: string, subscribeName: string): void {
		(this as any)[publicationName] = (param: any, options: Mongo.Options<any>): Meteor.SubscriptionHandle => {
			return Meteor.subscribe(subscribeName, param || {}, options || {});
		};
	}
}

export default ApiBase;
