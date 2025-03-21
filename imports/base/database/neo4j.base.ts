/* eslint-disable */
// @ts-nocheck
import neo4j from "neo4j-driver";
import { Meteor } from "meteor/meteor";
import { IConnection } from "../../typings/IConnection";
import { Validador } from "../../libs/Validador";
import { MongoInternals } from "meteor/mongo";
import { getRealUser, getUser } from "../../libs/getUser";
import { ISchema } from "../../typings/ISchema";
import { IDocNeo4j } from "../../typings/DocType";
import { IContext } from "../../typings/IContext";
import { nanoid } from "nanoid";
import { hasValue } from "../../libs/hasValue";
import { inspectSubCallsNeo4j } from "./productNeo4jServerBase";
import { prometheusMetrics } from "./prometheusMetrics";
import { performance } from "perf_hooks";
import { config } from "./neo4j.settings";
import { WebApp } from "meteor/webapp";
import connectRoute from "connect-route";
import { IUserProfile } from "../modules/userprofile/api/UserProfileSch";
import { validarIdentificador } from "../libs/validarIdentificador";
import { VersionNeo4jLabel } from "../modules/graph/api/models/nodes/VersionSch";
import { SuperNodeLabel } from "../modules/graph/api/models/nodes/SuperNodesSch";
import { ChildrenRelType } from "../modules/graph/api/models/relationships/ChildrenSch";
import { VersionedNeo4jRelType } from "../modules/graph/api/models/relationships/VersionedSch";
import { prodI18n } from "../translate/config";
import { removeUndefinedProperties } from "../libs/undefinedThreats";

const sessionConfig = {
	database: config.database
};

// Quando InspectNeo4jCalls é true, todas as chamadas ao banco de dados são impressas no console
export const InspectNeo4jCalls = true;

export class Neo4jBase<Doc extends IDocNeo4j> {
	// @ts-ignore
	protected driver: neo4j.Driver;
	// @ts-ignore

	protected schema: ISchema<Doc>;
	protected nodeLabel: string;
	protected relationshipType: string;

	constructor(nodeLabel?: string, schema?: ISchema<IDocNeo4j>, relationshipType?: string) {
		this.nodeLabel = nodeLabel || ":NodeLabel";
		this.relationshipType = relationshipType || ":RELATIONSHIP_TYPE";

		this.schema = schema || {};

		this.driver = neo4j.driver(config.uri, neo4j.auth.basic(config.user, config.password), {
			maxConnectionPoolSize: 300, // O número máximo de conexões no pool.
			connectionAcquisitionTimeout: 240000, // O tempo máximo em milissegundos para adquirir uma conexão.
			connectionTimeout: 60000, // O tempo máximo em milissegundos para estabelecer uma conexão.
			encrypted: "ENCRYPTION_OFF",
			trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
			fetchSize: 1000 // O número de registros a buscar por vez durante a iteração sobre os resultados de uma consulta
		});

		this.registerMethod = this.registerMethod.bind(this);
		this._createContext = this._createContext.bind(this);

		this.includeAuditData = this.includeAuditData.bind(this);
		this._formatParameters = this._formatParameters.bind(this);
		this._formatParametersWithNode = this._formatParametersWithNode.bind(this);

		this._query = this._query.bind(this);
		this._insert = this._insert.bind(this);
		this._find = this._find.bind(this);
		this._update = this._update.bind(this);
		this._delete = this._delete.bind(this);

		this._getQueryMatchNodeByElementId = this._getQueryMatchNodeByElementId.bind(this);
		this._getQueryAuditCreateData = this._getQueryAuditCreateData.bind(this);
		this._getQueryMatchNodeById = this._getQueryMatchNodeById.bind(this);

		this.registerMethod("query", this.serverQuery.bind(this));
		this.registerMethod("insert", this.serverInsert.bind(this));
		this.registerMethod("find", this.serverFind.bind(this));
		this.registerMethod("findWithFilter", this.serverFindWithFilter.bind(this));
		this.registerMethod("update", this.serverUpdate.bind(this));
		this.registerMethod("upsert", this.serverUpsert.bind(this));
		this.registerMethod("remove", this.serverRemove.bind(this));
		this.registerMethod("countRel", this.serverFindRelationships.bind(this));
		this.registerMethod("insertRelationships", this.serverInsertRelationships.bind(this));
		this.registerMethod("updateRelationships", this.serverUpdateRelationships.bind(this));
		this.registerMethod("deleteRelationships", this.serverDeleteRelationships.bind(this));
		this.registerMethod("FetchAllGraphData", this.serverFetchAllGraphData.bind(this));
	}

	includeAuditData(doc: Doc, action: string, defaultUser: string = "Anonymous") {
		const userData = getRealUser();
		const userId = userData?._id || defaultUser;

		if (action === "insert") {
			doc.createdby = userId;
			doc.createdat = new Date().toISOString();
			doc.lastupdate = new Date().toISOString();
			doc.updatedby = userId;
		} else {
			doc.lastupdate = new Date().toISOString();
			doc.updatedby = userId;
		}
		return doc;
	}

	addRestEndpoint(
		route: string,
		func: (params: any, options: any) => any,
		types: string[] = ["get", "post"],
		apiOptions: {
			apiVersion: number;
			authFunction: (headers: any, params: any) => boolean;
		} = {
			apiVersion: 1,
			authFunction: () => true
		}
	) {
		if (Meteor.isServer) {
			const routerName = (this.nodeLabel + "").toString().replace(":", "");
			if (!route || !func || !types || !apiOptions) {
				console.error("CREATE API ERRRO:", routerName, route);
				return;
			}
			const endpoinUrl = `/api/v${apiOptions.apiVersion || 1}/${routerName}/${route}`;

			const handleFunc = (type: string) => async (req: any, res: any) => {
				// Configurar o timeout da resposta
				res.setTimeout(600000); // 600 segundos

				const endpointContext = {
					urlParams: req.params,
					queryParams: req.query,
					bodyParams: req.body,
					request: req,
					response: res
				};

				const params = Object.assign(
					{},
					endpointContext.queryParams || {},
					endpointContext.urlParams || {},
					endpointContext.bodyParams || {}
				);

				const context = {
					type,
					headers: req.headers,
					response: endpointContext.response
				};

				if (apiOptions.authFunction && !apiOptions.authFunction(req.headers, params)) {
					res.writeHead(403, {
						"Content-Type": "application/json"
					});
					res.write("Access denied");
					res.end();
					return;
				}

				try {
					res.writeHead(200, {
						"Content-Type": "application/json"
					});

					const result = await func(params, context);

					res.write(typeof result === "object" ? JSON.stringify(result) : `${result ? result.toString() : "-"}`);
					res.end(); // Must call this immediately before return!
					return;
				} catch (e) {
					console.error(`API ERROR:${routerName}|${route} - `, e);
					res.writeHead(403, {
						"Content-Type": "application/json"
					});
					res.write("Error");
					res.end();
					return;
				}
			};

			if (types) {
				types.forEach((type) => {
					console.info(`CREATE ENDPOINT ${type.toUpperCase()} ${endpoinUrl}`);
					WebApp.connectHandlers.use(
						connectRoute((router: any) => {
							router[type](endpoinUrl, handleFunc(type));
						})
					);
				});
			}
		}
	}

	registerMethod = (name: string, func: Function) => {
		const self = this;
		const action = name;
		const collection = this.nodeLabel;
		const methodFullName = `${collection}.${name}`;

		const method = {
			[methodFullName]: async (...param: any[]) => {
				const start = performance.now();
				inspectSubCallsNeo4j && console.info(`\nCALL Method [${name} ${param ? param.length : "-"}]`);
				InspectNeo4jCalls &&
					console.time(
						inspectSubCallsNeo4j
							? `[${name} ${param ? param.length : "-"}] time`
							: `CALL Method [${name} ${param ? param.length : "-"}] time`
					);

				// Prevent unauthorized access
				try {
					// @ts-ignore
					const connection = this.connection;
					// @ts-ignore
					const meteorContext = self._createContext(this.schema, collection, action, connection);

					// Here With pass the new Metoer Method with the framework
					// security and the meteor _context.
					let functionResult = func(...param, meteorContext);
					if (functionResult instanceof Promise) {
						functionResult = await functionResult;
					}

					if (action === "insert") {
						meteorContext.docId = functionResult;
					}
					meteorContext.validador.lancarErroSeHouver();
					return functionResult;
				} catch (error) {
					console.error("Error on CALL Method:", name, "error:", JSON.stringify(error));
					throw error;
				} finally {
					InspectNeo4jCalls &&
						console.timeEnd(
							inspectSubCallsNeo4j
								? `[${name} ${param ? param.length : "-"}] time`
								: `CALL Method [${name} ${param ? param.length : "-"}] time`
						);

					prometheusMetrics.createHistogramMetric(
						{
							name: `${collection}_Calls_Server`,
							help: `time of all call functions of ${collection} service by client in ms`,
							labelNames: ["method"],
							buckets: [100, 300, 500, 1000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000]
						},
						{
							labels: {
								method: name
							},
							value: performance.now() - start
						}
					);
				}
			}
		};
		if (Meteor.isServer) {
			self.addRestEndpoint(
				Object.keys(method)[0].split(".")[1],

				async (params) => {
					const param = [...Object.values(params)];
					try {
						return await method[Object.keys(method)[0]](...param);
					} catch (e) {
						console.error(e);
						return null;
					}
				},
				["post"]
			);
			Meteor.methods(method);
		}
	};

	protected _createContext(
		schema: ISchema<Doc>,
		collection: string,
		action: string,
		connection?: IConnection,
		userProfile?: IUserProfile,
		validadorArg?: Validador,
		session?: MongoInternals.MongoConnection
	): IContext {
		const user: IUserProfile = userProfile || getUser(connection);

		const validador = validadorArg || new Validador(schema);
		return {
			collection,
			action,
			user,
			connection,
			schema,
			validador,
			session
		};
	}

	// Formata os parâmetros para serem utilizados em uma query Cypher Passando propriedades

	_formatParameters(parameters?: { [key: string]: any }) {
		if (!parameters) return "";
		parameters = removeUndefinedProperties(parameters);
		return `{${Object.keys(parameters)
			.map((key) => {
				if (!validarIdentificador(key)) {
					throw new Error(`_formatParameters: invalid identifier: ${key}`);
				}

				return `${key}: $${key}`;
			})
			.join(", ")}}`;
	}

	// Formata os parâmetros para serem utilizados em uma query Cypher SET

	_formatParametersWithNode(node: string, parameters: { [key: string]: any }) {
		parameters = removeUndefinedProperties(parameters);
		if (!validarIdentificador(node)) throw new Error(`_formatParametersWithNode: invalid identifier: ${node}`);
		return Object.keys(parameters)
			.map((key) => {
				if (!validarIdentificador(key)) throw new Error(`_formatParametersWithNode: invalid identifier: ${key}`);
				return `${node}.${key}=$${key}`;
			})
			.join(", ");
	}

	// Obtém a query MATCH para um nó com um determinado elementId

	_getQueryMatchNodeByElementId({ elementIdName, nodeName = "node" }: { elementIdName: string; nodeName?: string }) {
		const queryMatch = `
         MATCH (${nodeName})
         WHERE elementId(${nodeName}) = $${elementIdName}
      `;
		return queryMatch;
	}

	_getQueryMatchNodeById({
		idName = "_id",
		nodeName = "node",
		companyIdName = "companyId",
		superNodeLabel = ""
	}: {
		idName?: string;
		nodeName?: string;
		companyIdName?: string;
		superNodeLabel?: string;
	}) {
		try {
			const queryMatch = `
            MATCH(versionNode${VersionNeo4jLabel})-[${VersionedNeo4jRelType}]->(${SuperNodeLabel}${superNodeLabel || ""})-[${ChildrenRelType}]->(${nodeName})
            WHERE ${nodeName}._id = $${idName} AND versionNode.clientId = $${companyIdName} AND versionNode.isCurrent = true
         `;

			return queryMatch;
		} catch (error) {
			throw error;
		}
	}

	async _checkIfUserHasAccessToNode({
		userId,
		companyId,
		nodeId,
		nodeElementId
	}: {
		userId?: string;
		companyId?: string;
		nodeId?: string;
		nodeElementId?: string;
	}): Promise<boolean> {
		try {
			if (!hasValue(nodeId) && !hasValue(nodeElementId)) throw prodI18n.error({ key: "errors.checkAccess.notProvided" });

			if (!hasValue(userId)) {
				const user = getUser();
				userId = user.accessAsUser?._id || user._id;
			}
			if (!hasValue(companyId)) companyId = getUser().companyId;

			const query = `
            ${this._getQueryMatchNodeById({ idName: "userId", nodeName: "userNode", companyIdName: "companyId" })}
            ${
													hasValue(nodeElementId)
														? this._getQueryMatchNodeByElementId({ elementIdName: "nodeElementId", nodeName: "node" })
														: this._getQueryMatchNodeById({ idName: "nodeId", nodeName: "node", companyIdName: "companyId" })
												}
            RETURN security.canAccess(userNode, node) as canAccess
         `;

			return await this.serverQuery(query, { userId, companyId, nodeId, nodeElementId }).then(
				(result) => !!result.records?.[0]?.get("canAccess")
			);
		} catch (error) {
			throw error;
		}
	}

	_getQueryAuditCreateData(nodeName: string, update?: boolean) {
		const user = getRealUser();
		return update
			? `
         ${nodeName}.updatedat = '${new Date().toISOString()}',
         ${nodeName}.updatedby = '${user?._id || "system"}'
      `
			: `
         ${nodeName}._id = toString(timestamp()) + '-' + toString(rand()),
         ${nodeName}.createdat = '${new Date().toISOString()}',
         ${nodeName}.createdby = '${user?._id || "system"}'
      `;
	}

	// Obtém a query MATCH para uma relação com um determinado elementId

	_getQueryMatchRelByElementId({
		elementIdName,
		relType = "",
		relationshipName = "rel",
		parentName = "parent",
		childName = "child"
	}: {
		elementIdName: string;
		relType?: string;
		relationshipName?: string;
		parentName?: string;
		childName?: string;
	}) {
		const queryMatch = `
            MATCH (${parentName})-[${relationshipName}${relType}]->(${childName})
            WHERE elementId(${relationshipName}) = $${elementIdName}
        `;
		return queryMatch;
	}

	// Método para executar queries

	async _query(query: string, params?: any) {
		const session = this.driver.session(sessionConfig);
		try {
			const result = await session.run(query, params);
			return result;
		} catch (error) {
			throw new Error(`"_query" no Neo4j: ${error}`);
		} finally {
			await session.close();
		}
	}

	// Método para inserir dados

	async _insert(query: string, parameters?: any) {
		const session = this.driver.session(sessionConfig);
		try {
			const result = await session.run(query, parameters);
			return result;
		} catch (error) {
			throw new Error(`"_insert" no Neo4j: ${error}`);
		} finally {
			await session.close();
		}
	}

	// Método para buscar dados

	async _find(query: string, parameters?: any) {
		const session = this.driver.session(sessionConfig);
		try {
			const result = await session.run(query, parameters);
			return result;
		} catch (error) {
			throw new Error(`"_find" no Neo4j: ${error}`);
		} finally {
			await session.close();
		}
	}

	// Método para atualizar dados

	async _update(query: string, parameters?: any) {
		const session = this.driver.session(sessionConfig);
		try {
			const result = await session.run(query, parameters);
			return result;
		} catch (error) {
			throw new Error(`"_update" no Neo4j: ${error}`);
		} finally {
			await session.close();
		}
	}

	// Método para remover registros

	async _delete(query: string, parameters?: any) {
		const session = this.driver.session(sessionConfig);
		try {
			const result = await session.run(query, parameters);
			return result;
		} catch (error) {
			throw new Error(`"_delete" no Neo4j: ${error}`);
		} finally {
			await session.close();
		}
	}

	// Método para executar queries no banco de dados

	async serverQuery(query: string, params?: any) {
		try {
			return await this._query(query, params);
		} catch (e) {
			throw new Error(`"serverQuery" no Neo4j: ${e}`);
		}
	}

	// Insere um nó no banco de dados (caso parentElementId seja informado, o nó é inserido como filho)

	async serverInsert({
		_id = nanoid(),
		nodeLabel,
		nodeData,
		parentElementId,
		relationshipType,
		relationshipData
	}: {
		_id?: string;
		nodeLabel?: string;
		nodeData: { [key: string]: any };
		parentElementId?: string;
		parentLabel?: string;
		relationshipType?: string;
		relationshipData?: { [key: string]: any };
	}) {
		const parameters: any = { _id, ...nodeData };
		const label = hasValue(nodeLabel) ? nodeLabel : this.nodeLabel;
		const relType = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		let query: string;

		if (parentElementId) {
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "parentElementId" })}
                MERGE (node)-[rel${relType}${this._formatParameters(relationshipData)}]->(child${label}${this._formatParameters(parameters)})
                RETURN node as PARENT, rel as RELATIONSHIP, child as NODE
            `;
		} else {
			query = `
                MERGE (node${label}${this._formatParameters(parameters)})
                RETURN node as NODE
            `;
		}

		try {
			const props = { ...parameters, ...(relationshipData || {}), parentElementId };
			const result = await this._insert(query, props);
			return result;
		} catch (error) {
			throw new Error(`"serverInsert" no Neo4j: ${error}`);
		}
	}

	// Insere um nó entre dois outros nós (caso no parenteElementId não seja informado, o nó é apenas inserido como pai)

	async serverInsertBetween({
		_id = nanoid(),
		nodeLabel,
		nodeData,
		relationshipType,
		childElementId,
		relationshipDataChild,
		relationshipTypeChild,
		parentElementId,
		relationshipDataParent,
		relationshipTypeParent
	}: {
		_id?: string;
		childElementId: string;
		childLabel?: string;
		parentElementId?: string;
		parentLabel?: string;
		relationshipType?: string;
		relationshipTypeParent?: string;
		relationshipTypeChild?: string;
		nodeLabel: string;
		nodeData: { [key: string]: any };
		relationshipDataParent?: { [key: string]: any };
		relationshipDataChild?: { [key: string]: any };
	}) {
		const parameters: any = { _id, ...nodeData };
		const label = hasValue(nodeLabel) ? nodeLabel : this.nodeLabel;
		const relType = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		const relTypeParent = hasValue(relationshipTypeParent) ? relationshipTypeParent : this.relationshipType;
		const relTypeChild = hasValue(relationshipTypeChild) ? relationshipTypeChild : this.relationshipType;

		let query: string;
		if (parentElementId) {
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "parentElementId", nodeName: "parent" })}
                ${this._getQueryMatchNodeByElementId({ elementIdName: "childElementId", nodeName: "child" })}
                MATCH (parent)-[rel${relType}]->(child)
                DELETE rel
                MERGE (parent)-[prel${relTypeParent}${this._formatParameters(relationshipDataParent)}]->(node${label}${this._formatParameters(parameters)})-[crel${relTypeChild}${this._formatParameters(relationshipDataChild)}]->(child)
                RETURN parent as PARENT, prel as PARENT_RELATIONSHIP, node as NODE, crel as CHILD_RELATIONSHIP, child as CHILD
            `;
		} else {
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "childElementId", nodeName: "child" })}
                MERGE (node${label}${this._formatParameters(parameters)})-[crel${relTypeChild}${this._formatParameters(relationshipDataChild)}]->(child)
                RETURN node as NODE, crel as CHILD_RELATIONSHIP, child as CHILD
            `;
		}

		try {
			const props = {
				...parameters,
				...(relationshipDataParent || {}),
				...(relationshipDataChild || {}),
				parentElementId,
				childElementId
			};
			const result = await this._insert(query, props);
			return result;
		} catch (error) {
			throw new Error(`"insertBetween" no Neo4j: ${error}`);
		}
	}

	// Busca no banco de dados os nós com um determinado label

	async serverFind({ nodeLabel }: { nodeLabel?: string }) {
		// Definindo a consulta Cypher para buscar os nós
		const query = `
            MATCH (n${hasValue(nodeLabel) ? nodeLabel : this.nodeLabel}) RETURN n as NODE
        `;

		try {
			const result = await this._find(query);
			return result.map((record: any) => record.get("n").properties);
		} catch (error) {
			throw new Error(`"serverFind" no Neo4j: ${error}`);
		}
	}

	// Busca no banco de dados os nós com um determinado label e filtros

	async serverFindWithFilter({
		filter,
		nodeLabel,
		props
	}: {
		filter?: { [key: string]: any };
		nodeLabel?: string;
		props?: {
			orderBy?: {
				prop: string;
				desc?: boolean;
			};
			elementId?: string;
		};
	}) {
		const label = hasValue(nodeLabel) ? nodeLabel : this.nodeLabel;
		let query: string = `
            MATCH (node${label}${this._formatParameters(filter)})
            RETURN node as NODE
        `;

		if (props?.elementId) {
			query = `
            ${this._getQueryMatchNodeByElementId({ elementIdName: "elementId" })}
            RETURN node as NODE
            `;
		}

		if (props?.orderBy) {
			if (!validarIdentificador(props.orderBy.prop))
				throw new Error(`ServerFindWithFilter: Invalid identifier: ${props.orderBy.prop}`);
			query = `
             ${query}
             ORDER BY NODE.${props.orderBy.prop} ${props.orderBy.desc ? "DESC" : ""}
            `;
		}

		try {
			const result = await this._find(query, {
				...filter,
				elementId: props?.elementId
			});
			return result;
		} catch (error) {
			throw new Error(`"serverFindWithFilter" no Neo4j: ${error}`);
		}
	}

	// Atualiza um nó no banco de dados por meio do elementId

	async serverUpdate({ elementId, ...updateProps }: { elementId: string; [key: string]: any }) {
		const query = `
         ${this._getQueryMatchNodeByElementId({ elementIdName: "elementId" })}
         SET ${this._formatParametersWithNode("node", updateProps)}
         RETURN node as NODE
      `;

		try {
			const result = await this._update(query, {
				...updateProps,
				elementId
			});
			return result;
		} catch (error) {
			throw new Error(`"serverUpdate" no Neo4j: ${error}`);
		}
	}

	// Atualiza se o nó existir, senão insere um nó no banco de dados

	async serverUpsert({
		elementId,
		nodeLabel,
		parentElementId,
		parentLabel,
		relationshipType,
		...props
	}: {
		elementId: string;
		nodeLabel?: string;
		parentElementId?: string;
		parentLabel?: string;
		relationshipType?: string;
		[key: string]: any;
	}) {
		let query = "";
		const parameters = { _id: nanoid(), ...props };
		const label = hasValue(nodeLabel) ? nodeLabel : this.nodeLabel;

		try {
			const nodeExistsQuery = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "elementId" })}
                RETURN node as NODE
            `;

			const nodeExistsResult = await this._find(nodeExistsQuery, { elementId });
			if (nodeExistsResult?.length === 0) {
				return await this.serverInsert({
					_id: parameters._id,
					nodeLabel: label,
					nodeData: props,
					parentElementId,
					parentLabel,
					relationshipType
				});
			}

			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "elementId" })}
                SET ${this._formatParametersWithNode("node", props)}
                RETURN node as NODE
            `;

			return await this._update(query, {
				...parameters,
				elementId
			});
		} catch (error) {
			throw new Error(`"upsert" no Neo4j: ${error}`);
		}
	}

	// Remove um nó e todas suas relações do banco de dados por meio do elementId

	async serverRemove({ elementId, _nodeLabel }: { elementId: string; nodeLabel?: string }) {
		const query = `
            ${this._getQueryMatchNodeByElementId({ elementIdName: "elementId" })}
            DETACH DELETE node
        `;
		try {
			await this._delete(query, { elementId });
			return { success: true, message: `Nó com elementId '${elementId}' removido com sucesso.` };
		} catch (error) {
			throw new Error(`"serverRemove" no Neo4j: ${error}`);
		}
	}

	// Encotra relacionamentos entre nós no banco de dados

	async serverFindRelationships({
		parentLabel = "",
		parentElementId,
		parentFilter,
		childLabel = "",
		childElementId,
		childFilter,
		relationshipType = "",
		relationshipElementId,
		relationshipFilter
	}: {
		relationshipType?: string;
		relationshipElementId?: string;
		relationshipFilter?: { [key: string]: any };
		parentLabel?: string;
		parentElementId?: string;
		parentFilter?: { [key: string]: any };
		childLabel?: string;
		childElementId?: string;
		childFilter?: { [key: string]: any };
	}) {
		const currentRel = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		const relType = hasValue(relationshipFilter) ? currentRel : relationshipType;

		let query: string;

		if (relationshipElementId) {
			// encontra relacionamento baseado no elementId da relação
			query = `
                ${this._getQueryMatchRelByElementId({ elementIdName: "relationshipElementId", relType })}
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (parentElementId && childElementId) {
			// encontra relacionamento entre dois nós especificos
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "parentElementId", nodeName: "parent" })}
                ${this._getQueryMatchNodeByElementId({ elementIdName: "childElementId", nodeName: "child" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child)
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (parentElementId && (childFilter || childLabel)) {
			// encontra relacionamento entre um nó pai e vários nós filhos
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "parentElementId", nodeName: "parent" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child${childLabel}${this._formatParameters(childFilter)})
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (childElementId && (parentFilter || parentLabel)) {
			// encontra relacionamento entre vários nós pais e um nó filho
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "childElementId", nodeName: "child" })}
                OPTIONAL MATCH (parent${parentLabel}${this._formatParameters(parentFilter)})-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child)
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (((parentFilter || parentLabel) && (childFilter || childLabel)) || relationshipFilter) {
			// encontra relacionamento baseado apenas nos filtros da relação e dos nós de origem e destino
			query = `
                MATCH (parent${parentLabel}${this._formatParameters(parentFilter)})-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child${childLabel}${this._formatParameters(childFilter)})
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else {
			throw new Error('É necessário um par de nós, elementId ou filter da relação "serverUpdateRelationships"');
		}

		try {
			const parameters = {
				...parentFilter,
				...childFilter,
				...relationshipFilter,
				parentElementId,
				childElementId,
				relationshipElementId
			};
			return await this._insert(query, parameters);
		} catch (error) {
			throw new Error(`"serverUpdateRelationships" no Neo4j: ${error}`);
		}
	}

	// Insere relacionamentos entre nós no banco de dados

	async serverInsertRelationships({
		parentLabel = "",
		parentElementId,
		parentFilter,
		childLabel = "",
		childElementId,
		childFilter,
		relationshipType = "",
		relationshipData
	}: {
		parentLabel?: string;
		parentElementId?: string;
		parentFilter?: { [key: string]: any };
		childLabel?: string;
		childElementId?: string;
		childFilter?: { [key: string]: any };
		relationshipType?: string;
		relationshipData?: { [key: string]: any };
	}) {
		const currentRel = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		const relType = hasValue(relationshipData) ? currentRel : relationshipType;
		relationshipData = { ...relationshipData, _id: nanoid() };

		let query: string;

		if (parentElementId && childElementId) {
			// Insere relacionamento entre dois nós especificos
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "parentElementId", nodeName: "parent" })}
                ${this._getQueryMatchNodeByElementId({ elementIdName: "childElementId", nodeName: "child" })}
                MERGE (parent)-[rel${relType}${this._formatParameters(relationshipData)}]->(child)
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (parentElementId && (childFilter || childLabel)) {
			// Insere relacionamento entre um nó pai e vários nós filhos
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "parentElementId", nodeName: "parent" })}
                MATCH (child${childLabel}${this._formatParameters(childFilter)})
                MERGE (parent)-[rel${relType}${this._formatParameters(relationshipData)}]->(child)
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (childElementId && (parentFilter || parentLabel)) {
			// Insere relacionamento entre vários nós pais e um nó filho
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "childElementId", nodeName: "child" })}
                MATCH (parent${parentLabel}${this._formatParameters(parentFilter)})
                MERGE (parent)-[rel${relType}${this._formatParameters(relationshipData)}]->(child)
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if ((parentFilter || parentLabel) && (childFilter || childLabel)) {
			// Insere relacionamento entre vários nós pais e vários nós filhos
			query = `
                MATCH (parent${parentLabel}${this._formatParameters(parentFilter)})
                MATCH (child${childLabel}${this._formatParameters(childFilter)})
                MERGE (parent)-[rel${relType}${this._formatParameters(relationshipData)}]->(child)
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else {
			throw new Error('É necessário um par de nós "serverInsertRelationships"');
		}

		try {
			const parameters = {
				...relationshipData,
				parentElementId,
				childElementId,
				...parentFilter,
				...childFilter
			};
			return await this._insert(query, parameters);
		} catch (error) {
			throw new Error(`"serverInsertRelationships" no Neo4j: ${error}`);
		}
	}

	// Atualiza relacionamentos entre nós no banco de dados

	async serverUpdateRelationships({
		parentLabel = "",
		parentElementId,
		parentFilter,
		childLabel = "",
		childElementId,
		childFilter,
		relationshipType = "",
		relationshipElementId,
		relationshipFilter,
		relationshipData
	}: {
		relationshipType?: string;
		relationshipElementId?: string;
		relationshipFilter?: { [key: string]: any };
		relationshipData: { [key: string]: any };
		parentLabel?: string;
		parentElementId?: string;
		parentFilter?: { [key: string]: any };
		childLabel?: string;
		childElementId?: string;
		childFilter?: { [key: string]: any };
	}) {
		const currentRel = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		const relType = hasValue(relationshipData) ? currentRel : relationshipType;

		let query: string;

		if (relationshipElementId) {
			// Atualiza relacionamento baseado no elementId da relação
			query = `
                ${this._getQueryMatchRelByElementId({ elementIdName: "relationshipElementId", relType })}
                SET ${this._formatParametersWithNode("rel", relationshipData)}
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (parentElementId && childElementId) {
			// Atualiza relacionamento entre dois nós especificos
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "parentElementId", nodeName: "parent" })}
                ${this._getQueryMatchNodeByElementId({ elementIdName: "childElementId", nodeName: "child" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child)
                SET ${this._formatParametersWithNode("rel", relationshipData)}
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (parentElementId && (childFilter || childLabel)) {
			// Atualiza relacionamento entre um nó pai e vários nós filhos
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "parentElementId", nodeName: "parent" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child${childLabel}${this._formatParameters(childFilter)})
                SET ${this._formatParametersWithNode("rel", relationshipData)}
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (childElementId && (parentFilter || parentLabel)) {
			// Atualiza relacionamento entre vários nós pais e um nó filho
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "childElementId", nodeName: "child" })}
                OPTIONAL MATCH (parent${parentLabel}${this._formatParameters(parentFilter)})-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child)
                SET ${this._formatParametersWithNode("rel", relationshipData)}
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (((parentFilter || parentLabel) && (childFilter || childLabel)) || relationshipFilter) {
			// Atualiza relacionamento baseado apenas nos filtros da relação e dos nós de origem e destino
			query = `
                MATCH (parent${parentLabel}${this._formatParameters(parentFilter)})-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child${childLabel}${this._formatParameters(childFilter)})
                SET ${this._formatParametersWithNode("rel", relationshipData)}
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else {
			throw new Error('É necessário um par de nós, elementId ou filter da relação "serverUpdateRelationships"');
		}

		try {
			const parameters = {
				...relationshipData,
				...parentFilter,
				...childFilter,
				...relationshipFilter,
				parentElementId,
				childElementId,
				relationshipElementId
			};
			return await this._insert(query, parameters);
		} catch (error) {
			throw new Error(`"serverUpdateRelationships" no Neo4j: ${error}`);
		}
	}

	// Deleta relacionamentos entre nós no banco de dados

	async serverDeleteRelationships({
		parentLabel = "",
		parentElementId,
		parentFilter,
		childLabel = "",
		childElementId,
		childFilter,
		relationshipType = "",
		relationshipElementId,
		relationshipFilter
	}: {
		relationshipType?: string;
		relationshipElementId?: string;
		relationshipFilter?: { [key: string]: any };
		parentLabel?: string;
		parentElementId?: string;
		parentFilter?: { [key: string]: any };
		childLabel?: string;
		childElementId?: string;
		childFilter?: { [key: string]: any };
	}) {
		const currentRel = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		const relType = hasValue(relationshipFilter) ? currentRel : relationshipType;

		let query: string;

		if (relationshipElementId) {
			// Deleta relacionamento baseado no elementId da relação
			query = `
                ${this._getQueryMatchRelByElementId({ elementIdName: "relationshipElementId", relType })}
                DELETE rel
            `;
		} else if (parentElementId && childElementId) {
			// Deleta relacionamento entre dois nós especificos
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "parentElementId", nodeName: "parent" })}
                ${this._getQueryMatchNodeByElementId({ elementIdName: "childElementId", nodeName: "child" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child)
                DELETE rel
            `;
		} else if (parentElementId && (childFilter || childLabel)) {
			// Deleta relacionamento entre um nó pai e vários nós filhos
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "parentElementId", nodeName: "parent" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child${childLabel}${this._formatParameters(childFilter)})
                DELETE rel
            `;
		} else if (childElementId && (parentFilter || parentLabel)) {
			// Deleta relacionamento entre vários nós pais e um nó filho
			query = `
                ${this._getQueryMatchNodeByElementId({ elementIdName: "childElementId", nodeName: "child" })}
                OPTIONAL MATCH (parent${parentLabel}${this._formatParameters(parentFilter)})-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child)
                DELETE rel
            `;
		} else if (((parentFilter || parentLabel) && (childFilter || childLabel)) || relationshipFilter) {
			// Deleta relacionamento baseado apenas nos filtros da relação e dos nós de origem e destino
			query = `
                MATCH (parent${parentLabel}${this._formatParameters(parentFilter)})-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child${childLabel}${this._formatParameters(childFilter)})
                DELETE rel
            `;
		} else {
			throw new Error('É necessário um par de nós, elementId ou filter da relação "serverUpdateRelationships"');
		}

		try {
			const parameters = {
				...parentFilter,
				...childFilter,
				...relationshipFilter,
				parentElementId,
				childElementId,
				relationshipElementId
			};
			return await this._insert(query, parameters);
		} catch (error) {
			throw new Error(`"serverUpdateRelationships" no Neo4j: ${error}`);
		}
	}

	calculatePositions(
		nodesMap: Map<
			string,
			{
				posX: number;
				posY: number;
				outgoingRelationships: any[];
				incomingRelationships: any[];
				position?: any;
			}
		>,
		rootIds: string[]
	) {
		const distanceH = 200; // Distância vertical fixa entre os níveis
		const baseDistanceW = 200; // Distância horizontal base entre os nós

		// Função auxiliar para calcular a largura necessária para a subárvore de cada nó
		const calculateSubtreeWidth = (nodeId: string, visited: Set<string>): number => {
			if (visited.has(nodeId)) return 0;
			visited.add(nodeId);

			const node = nodesMap.get(nodeId);
			if (!node || node.outgoingRelationships.length === 0) {
				return baseDistanceW; // Largura base para nós sem filhos
			}

			// Soma das larguras das subárvores dos filhos
			let totalWidth = 0;
			node.outgoingRelationships.forEach((rel) => {
				totalWidth += calculateSubtreeWidth(rel.relatedNodeElementId, new Set(visited));
			});

			return totalWidth;
		};

		// Função para definir posições, ajustada para evitar sobreposição
		const setPositionsWithSubtreeWidth = (nodeId: string, depth: number, parentPosX: number, visited: Set<string>) => {
			const node = nodesMap.get(nodeId);
			if (!node || visited.has(nodeId)) return;
			visited.add(nodeId);

			const childrenWidths: number[] = [];
			let totalWidth = 0;

			// Calcula a largura total dos filhos
			node.outgoingRelationships.forEach((rel) => {
				const childId = rel.relatedNodeElementId;
				const childWidth = calculateSubtreeWidth(childId, new Set());
				childrenWidths.push(childWidth);
				totalWidth += childWidth;
			});

			// Calcula a posição horizontal do nó pai para que fique centralizado com relação aos filhos
			const parentPosXPai = parentPosX - totalWidth / 2;

			let accumulatedWidth = 0; // Acumula a largura processada até o momento para posicionar os filhos

			node.outgoingRelationships.forEach(async (rel, index) => {
				const childId = rel.relatedNodeElementId;
				// Posição X do filho baseada no offsetX ajustado pela largura acumulada dos filhos anteriores
				// e centrado na sua própria subárvore
				const childPosX = parentPosXPai + accumulatedWidth + childrenWidths[index] / 2;
				setPositionsWithSubtreeWidth(childId, depth + 1, childPosX, visited);
				accumulatedWidth += childrenWidths[index]; // Atualiza a largura acumulada
			});

			// Ajusta a posição do nó atual depois de posicionar todos os filhos, para centralizá-lo sobre eles
			node.position = { x: parentPosXPai + totalWidth / 2, y: depth * distanceH };
		};

		let globalOffsetX = 0;
		for (const rootId of rootIds) {
			const subtreeWidth = calculateSubtreeWidth(rootId, new Set());
			setPositionsWithSubtreeWidth(rootId, 0, globalOffsetX + subtreeWidth / 2, new Set());
			globalOffsetX += subtreeWidth; // Isso irá posicionar cada árvore ao lado da anterior
		}
	}

	async serverFetchAllGraphData(
		labels: string[] = [],
		propertiesProp: { [key: string]: any } = {},
		level: number = 0,
		_context: any
	) {
		const session = this.driver.session(sessionConfig);

		const properties = propertiesProp || {};
		if (properties && properties.updatePosition) {
			delete properties.updatePosition;
		}

		if (properties) {
			Object.keys(properties).forEach((key) => {
				if (!hasValue(properties[key])) {
					delete properties[key];
				}
			});
		}

		// Construir partes da consulta com base nos rótulos e propriedades fornecidos
		let labelsFilter = "";
		if (labels.length > 0) {
			labelsFilter = `: ${labels.join("|")}`;
		}

		let propertiesFilter = "";

		if (Object.keys(properties).length > 0) {
			let where = "";
			if (properties.elementId) {
				where = "elementId(n) = $elementId";
			}

			const propsFilter = Object.entries(properties)
				.map(([key]) => {
					if (!validarIdentificador(key)) throw new Error(`"serverFetchAllGraphData": Invalid identifier: ${key}`);

					if (key === "tags") {
						// Para o campo tags, verifica se a searchString está contida em algum dos elementos do array
						return `ANY(tag IN n.tags WHERE toLower(tag) CONTAINS toLower($${key}))`;
					} else {
						// Para outros campos, mantém o comportamento original
						return `toLower(n.${key}) =~ '.*' + $${key} + '.*'`;
					}
				})
				.join(" AND ");

			propertiesFilter = `WHERE ${where ? where + (propsFilter ? " AND " : "") : ""}${propsFilter}`;
		}

		const query = `
         MATCH (n${labelsFilter})
         ${propertiesFilter}
         WITH n
         OPTIONAL MATCH (n)-[r]->(m)
         WITH n, collect(distinct {relationship: r, relationshipElementId: elementId(r), relatedNode: m, relatedNodeElementId: elementId(m)}) as outgoingRelationships
         OPTIONAL MATCH (n)<-[rIn]-(mIn)
         RETURN elementId(n) as nodeId, labels(n) as labels, n as node,
         outgoingRelationships,
         collect(distinct {relationship: rIn, relationshipElementId: elementId(rIn), relatedNode: mIn, relatedNodeElementId: elementId(mIn)}) as incomingRelationships
      `;

		try {
			console.time("Primary query");
			const result = await session.run(query, properties);
			console.timeEnd("Primary query");
			const nodesMap = new Map();

			const rootIds = new Set<string>();

			// const rootId = await this.getRootId();
			// !level && rootIds.add(rootId);

			const visited = new Set();

			// Função recursiva para buscar nós até o nível indicado
			const fetchRelatedNodes = async (nodeId: string, currentLevel: number) => {
				if (!visited.has(nodeId)) return;
				visited.add(nodeId);

				const session = this.driver.session(sessionConfig);

				if (currentLevel <= level) {
					const queryRelated = `
                  MATCH (n)-[r]->(o)
                  WHERE elementId(n) = $nodeId
                  WITH o
                  OPTIONAL MATCH (o)-[rOut]->(mOut)
                  WITH o,
                     collect(distinct {relationship: rOut, relationshipElementId: elementId(rOut), relatedNode: mOut, relatedNodeElementId: elementId(mOut)}) as outgoingRelationships
                  OPTIONAL MATCH (o)<-[rIn]-(mIn)
                  RETURN
                     elementId(o) as nodeId,
                     labels(o) as labels,
                     o as node,
                     outgoingRelationships,
                     collect(distinct {relationship: rIn,  relationshipElementId: elementId(rIn), relatedNode: mIn, relatedNodeElementId: elementId(mIn)}) as incomingRelationships
               `;

					try {
						const resultRelated = await session.run(queryRelated, { nodeId });

						await Promise.all(
							resultRelated.records.map(async (record: any) => {
								const nodeId = record.get("nodeId");
								const nodeLabels = record.get("labels"); // Array de labels do nó
								const nodeProps = record.get("node").properties;

								const outgoingRelationships = record.get("outgoingRelationships").map((rel: any) => ({
									labels: rel.relatedNode ? rel.relatedNode.labels : null,
									relationshipType: rel.relationship ? rel.relationship.type : null,
									relationshipProperties: rel.relationship ? rel.relationship.properties : {},
									relationshipElementId: rel.relationshipElementId,
									relatedNodeProperties: rel.relatedNode ? rel.relatedNode.properties : null,
									relatedNodeElementId: rel.relatedNodeElementId
								}));

								const incomingRelationships = record.get("incomingRelationships").map((rel: any) => ({
									labels: rel.relatedNode ? rel.relatedNode.labels : null,
									relationshipType: rel.relationship ? rel.relationship.type : null,
									relationshipProperties: rel.relationship ? rel.relationship.properties : {},
									relationshipElementId: rel.relationshipElementId,
									relatedNodeProperties: rel.relatedNode ? rel.relatedNode.properties : null,
									relatedNodeElementId: rel.relatedNodeElementId
								}));

								if (
									incomingRelationships.length === 0 ||
									!incomingRelationships.find((rel: any) => rel.relationshipType !== null)
								) {
									// Este nó é uma raiz, pois não tem relações de entrada
									rootIds.add(nodeId);
								}

								nodesMap.set(nodeId, {
									elementId: nodeId,
									labels: nodeLabels, // Adiciona labels ao objeto do nó
									properties: nodeProps,
									outgoingRelationships,
									incomingRelationships,
									position: { x: nodeProps.posX || 0, y: nodeProps.posY || 0 }
								});

								// Recursivamente busca nós relacionados até o próximo nível
								await fetchRelatedNodes(nodeId, currentLevel + 1);
								await fetchRelatedNodesIncomingRelationships(nodeId, currentLevel + 1);
							})
						);
					} finally {
						await session.close();
					}
				}
			};
			const fetchRelatedNodesIncomingRelationships = async (nodeId: string, currentLevel: number) => {
				const session = this.driver.session(sessionConfig);

				if (currentLevel <= level) {
					const queryRelated = `
                  MATCH (o)-[r]->(n)
                  WHERE elementId(n) = $nodeId
                  WITH o
                  OPTIONAL MATCH (o)-[rOut]->(mOut)
                  WITH o,
                     collect(distinct {relationship: rOut, relationshipElementId: elementId(rOut), relatedNode: mOut, relatedNodeElementId: elementId(mOut)}) as outgoingRelationships
                  OPTIONAL MATCH (o)<-[rIn]-(mIn)
                  RETURN elementId(o) as nodeId, labels(o) as labels, o as node,
                        outgoingRelationships,
                        collect(distinct {relationship: rIn, relationshipElementId: elementId(rIn), relatedNode: mIn, relatedNodeElementId: elementId(mIn)}) as incomingRelationships
               `;

					try {
						const resultRelated = await session.run(queryRelated, { nodeId });

						await Promise.all(
							resultRelated.records.map(async (record: any) => {
								const nodeId = record.get("nodeId");
								const nodeLabels = record.get("labels"); // Array de labels do nó
								const nodeProps = record.get("node").properties;

								const outgoingRelationships = record.get("outgoingRelationships").map((rel: any) => ({
									labels: rel.relatedNode ? rel.relatedNode.labels : null,
									relationshipType: rel.relationship ? rel.relationship.type : null,
									relationshipProperties: rel.relationship ? rel.relationship.properties : {},
									relationshipElementId: rel.relationshipElementId,
									relatedNodeProperties: rel.relatedNode ? rel.relatedNode.properties : null,
									relatedNodeElementId: rel.relatedNodeElementId
								}));

								const incomingRelationships = record.get("incomingRelationships").map((rel: any) => ({
									labels: rel.relatedNode ? rel.relatedNode.labels : null,
									relationshipType: rel.relationship ? rel.relationship.type : null,
									relationshipProperties: rel.relationship ? rel.relationship.properties : {},
									relationshipElementId: rel.relationshipElementId,
									relatedNodeProperties: rel.relatedNode ? rel.relatedNode.properties : null,
									relatedNodeElementId: rel.relatedNodeElementId
								}));

								if (
									incomingRelationships.length === 0 ||
									!incomingRelationships.find((rel: any) => rel.relationshipType !== null)
								) {
									// Este nó é uma raiz, pois não tem relações de entrada
									rootIds.add(nodeId);
								}

								nodesMap.set(nodeId, {
									elementId: nodeId,
									labels: nodeLabels, // Adiciona labels ao objeto do nó
									properties: nodeProps,
									outgoingRelationships,
									incomingRelationships,
									position: { x: nodeProps.posX || 0, y: nodeProps.posY || 0 }
								});

								// Recursivamente busca nós relacionados até o próximo nível
								await fetchRelatedNodes(nodeId, currentLevel + 1);
								await fetchRelatedNodesIncomingRelationships(nodeId, currentLevel + 1);
							})
						);
					} finally {
						await session.close();
					}
				}
			};

			console.time("Promise.all");
			await Promise.all(
				result.records.map(async (record: any) => {
					const nodeId = record.get("nodeId");
					const nodeLabels = record.get("labels"); // Array de labels do nó
					const nodeProps = record.get("node").properties;

					const outgoingRelationships = record.get("outgoingRelationships").map((rel: any) => ({
						labels: rel.relatedNode ? rel.relatedNode.labels : null,
						relationshipType: rel.relationship ? rel.relationship.type : null,
						relationshipProperties: rel.relationship ? rel.relationship.properties : {},
						relationshipElementId: rel.relationshipElementId,
						relatedNodeProperties: rel.relatedNode ? rel.relatedNode.properties : null,
						relatedNodeElementId: rel.relatedNodeElementId
					}));

					const incomingRelationships = record.get("incomingRelationships").map((rel: any) => ({
						labels: rel.relatedNode ? rel.relatedNode.labels : null,
						relationshipType: rel.relationship ? rel.relationship.type : null,
						relationshipProperties: rel.relationship ? rel.relationship.properties : {},
						relationshipElementId: rel.relationshipElementId,
						relatedNodeProperties: rel.relatedNode ? rel.relatedNode.properties : null,
						relatedNodeElementId: rel.relatedNodeElementId
					}));

					if (
						incomingRelationships.length === 0 ||
						!incomingRelationships.find((rel: any) => rel.relationshipType !== null)
					) {
						// Este nó é uma raiz, pois não tem relações de entrada
						rootIds.add(nodeId);
					}

					nodesMap.set(nodeId, {
						elementId: nodeId,
						labels: nodeLabels, // Adiciona labels ao objeto do nó
						properties: nodeProps,
						outgoingRelationships,
						incomingRelationships,
						p: true, //Primary
						position: { x: nodeProps.posX || 0, y: nodeProps.posY || 0 }
					});

					// Se o level for maior que zero, buscar nós relacionados até o nível indicado
					if (level > 0) {
						await fetchRelatedNodes(nodeId, 1);
						await fetchRelatedNodesIncomingRelationships(nodeId, 1);
					}
				})
			);
			console.timeEnd("Promise.all");

			console.time("getNodeId");
			const nodeList = Array.from(nodesMap.values());
			// Verifica se há nós cujo "pai" não está entre os nós retornados
			nodeList.forEach((node) => {
				if (
					node.incomingRelationships.length > 0 &&
					!node.incomingRelationships.find((rel: any) => !!nodeList.find((no) => no.elementId === rel.relatedNodeElementId))
				) {
					rootIds.add(node.elementId);
				}
			});
			console.timeEnd("getNodeId");

			// Calcula as posições posX e posY usando BFS ou outra estratégia
			this.calculatePositions(nodesMap, Array.from(rootIds));

			return nodeList.map((node) => ({
				...node,
				label: node.labels.join(", ") // Combina todos os labels em uma string, se necessário
			}));
		} catch (error) {
			console.error(`Erro ao buscar todo o grafo: ${error}`);
			throw error;
		} finally {
			await session.close();
		}
	}

	// Método para fechar a conexão
	async close() {
		//await this.session.close();
		await this.driver.close();
	}
}

/* eslint-enable */
