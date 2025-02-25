import { MongoBase } from "/imports/base/database/mongo.base";
import { Neo4jBase } from "/imports/base/database/neo4j.base";
import ProductServerBase from "/imports/base/server/server.product";
import { IDoc } from "/imports/typings/IDoc";

interface ExampleType extends IDoc {}

class ExampleServerApi extends ProductServerBase {
	mongoInstance?: MongoBase<ExampleType>;
	neo4jInstance?: Neo4jBase<ExampleType>;
	storageInstance?: any;
	
	constructor() {
		super('example');
		this.mongoInstance = new MongoBase<ExampleType>('example', {});
		this.neo4jInstance = new Neo4jBase<ExampleType>();
	};


}


// class ExampleServerApi extends ProductServerBase<IExample> {
// 	numero: number;

// 	constructor() {
// 		super('example', exampleSch, { resources: Recurso });
// 		this.numero = 0;


// 		this.addPublication('exampleList', this.exmpleListPublication );
// 		this.addPublication('exampleDetail', this.exampleDetailPublication);

// 	};

// 	exmpleListPublication = exmpleListPublication.bind(this);
// 	exampleDetailPublication = exampleDetailPublication.bind(this);


// 	setNumero(numero: number){
// 		this.numero = numero;
// 	}

// 	getNumero(){
// 		return this.numero;
// 	}


// }

// export const exampleServerApi = new ExampleServerApi();
// export { ExampleServerApi };
