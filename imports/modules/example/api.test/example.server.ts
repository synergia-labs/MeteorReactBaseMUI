import { Meteor } from 'meteor/meteor';
import { MongoBase } from '/imports/api/server/mongo.base';
import { Neo4jBase } from '/imports/api/server/neo4j.base';
import { ServerBase } from '/imports/api/server/server.base';
import { IDoc } from '/imports/typings/IDoc';
import { createUser } from './methods/createUser';

interface ExampleType extends IDoc {}

export class ExampleServer extends ServerBase {
	mongoInstance?: MongoBase<ExampleType>;
	neo4jInstance?: Neo4jBase<ExampleType>;
	storageInstance?: any;

	constructor() {
		super('example');
		this.mongoInstance = new MongoBase<ExampleType>('example', {});
		this.neo4jInstance = new Neo4jBase<ExampleType>();

		// #region setInstance
		createUser.setServerInstance(this);
		// #endregion

		// #region registerMethods
		this.registerMethods({
			'create': { method: this.createUserF },
			'create1': { method: this.createUserF, endpointType: 'post' },
			'create2': { method: this.createUserF },
			'create3': { method: this.createUserF }
		});
		// #endregion

		// #region registerPublications
		this.registerPublications({
			'example': { method: this.createUserF },
			'example2': { method: this.createUserF },
			'example3': { method: this.createUserF },
			'example4': { method: this.createUserF },
			'example5': { method: this.createUserF }
		});
		// #endregion
	}

	// #region defineMethods
	createUserF = async (...props: any) => createUser.execute(props);
	// #endregion
}

export const exampleServer = new ExampleServer();
