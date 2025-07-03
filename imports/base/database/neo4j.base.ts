/* eslint-disable */
import neo4j, { Integer, Node, QueryResult, RecordShape, Relationship, Result } from "neo4j-driver";
import { config } from "./settings/neo4j.settings";
import { removeUndefinedProperties } from "/imports/libs/object/removeUndefinedProperties";
import { isValidVarName } from "/imports/libs/string/isValidVarName";
import { hasValue } from "/imports/libs/hasValue";
import { nanoid } from "nanoid";
import { ReturnCreateType } from "./types/neo4j/createReturn";
import { enumRelationshipLabels } from "./products/enums/relationshipLabels";
import { enumNodeLabels } from "./products/enums/nodeLabels";

const sessionConfig = {
	database: config.database
};

// Quando InspectNeo4jCalls é true, todas as chamadas ao banco de dados são impressas no console
export const InspectNeo4jCalls = true;

export class Neo4jBase {
	// @ts-ignore
	protected driver: neo4j.Driver;
	protected nodeLabel = "";
	protected relationshipType = "";

	// @ts-ignore

	constructor() {
		this.driver = neo4j.driver(config.uri, neo4j.auth.basic(config.user, config.password), {
			maxConnectionPoolSize: 300, // O número máximo de conexões no pool.
			connectionAcquisitionTimeout: 240000, // O tempo máximo em milissegundos para adquirir uma conexão.
			connectionTimeout: 60000, // O tempo máximo em milissegundos para estabelecer uma conexão.
			encrypted: "ENCRYPTION_OFF",
			trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
			fetchSize: 1000 // O número de registros a buscar por vez durante a iteração sobre os resultados de uma consulta
		});

		this.serverQuery = this.serverQuery.bind(this);
	}

	_extractMainProperties(node?: Node | Relationship) {
		if (!node) return;

		return {
			...node.properties,
			elementId: node.elementId,
			labels: (node as any).labels ?? [(node as any).type]
		} as Record<string, any>;
	}

	// region FormatMethods
	/**
	 * Formats the given parameters into a Cypher query string.
	 * This method ensures that all keys in the parameters object are valid identifiers
	 * and returns a string representation of the parameters to be used in Cypher queries.
	 *
	 * @param parameters - An optional object containing key-value pairs to be formatted.
	 * @returns A string representation of the parameters in Cypher query format.
	 *          If no parameters are provided, an empty string is returned.
	 * @throws An error if any key in the parameters object is not a valid identifier.
	 */

	_formatParameters(parameters?: { [key: string]: any }) {
		if (!parameters) return "";
		parameters = removeUndefinedProperties(parameters);
		return `{${Object.keys(parameters)
			.map((key) => {
				if (!isValidVarName(key)) {
					throw new Error(`_formatParameters: invalid identifier: ${key}`);
				}

				return `${key}: $${key}`;
			})
			.join(", ")}}`;
	}

	/**
	 * Formats the given parameters into a Cypher query string with node properties.
	 * This method ensures that all keys in the parameters object are valid identifiers
	 * and returns a string representation of the parameters to be used in Cypher queries,
	 * prefixed with the specified node name.
	 *
	 * @param node - The name of the node to prefix the parameters with.
	 * @param parameters - An object containing key-value pairs to be formatted.
	 * @returns A string representation of the parameters in Cypher query format with node properties.
	 * @throws An error if the node name or any key in the parameters object is not a valid identifier.
	 */
	_formatParametersWithNode(node: string, parameters: { [key: string]: any }) {
		parameters = removeUndefinedProperties(parameters);
		if (!isValidVarName(node)) throw new Error(`_formatParametersWithNode: invalid identifier: ${node}`);
		return Object.keys(parameters)
			.map((key) => {
				if (!isValidVarName(key)) throw new Error(`_formatParametersWithNode: invalid identifier: ${key}`);
				return `${node}.${key}=$${key}`;
			})
			.join(", ");
	}
	// endregion

	// region QueryMatchMethods

	/**
	 * Generates a Cypher query to match a node by its elementId.
	 * This method constructs a query string that matches a node in the database
	 * based on the provided elementId and optional node name.
	 *
	 * @param elementIdName - The name of the parameter representing the elementId.
	 * @param nodeName - The optional name of the node to match. Defaults to "node".
	 * @returns A Cypher query string to match a node by its elementId.
	 */
	_getNodeByElementIdQuery({ elementIdName, nodeName = "node" }: { elementIdName: string; nodeName?: string }) {
		const queryMatch = `
         MATCH (${nodeName})
         WHERE elementId(${nodeName}) = $${elementIdName}
      `;
		return queryMatch;
	}

	_getNodeByIdQuery({
		idName = "_id",
		nodeName = "node",
		versionElementIdName
	}: {
		idName: string;
		nodeName?: string;
		versionElementIdName?: string;
	}) {
		const queryMatch = `
			MATCH (${nodeName} {_id: $${idName}})<-[${enumRelationshipLabels.CHILDREN}]
				-(superNode${enumNodeLabels.SUPER_NODE})<-[${enumRelationshipLabels.VERSIONED}]-(versionNode${enumNodeLabels.VERSION})
			${versionElementIdName ? `WHERE elementId(versionNode) = $${versionElementIdName}` : "versionNode.isCurrent = true"}
		`;
		return queryMatch;
	}

	// Obtém a query MATCH para uma relação com um determinado elementId
	/**
	 * Generates a Cypher query to match a relationship by its elementId.
	 * This method constructs a query string that matches a relationship in the database
	 * based on the provided elementId and optional relationship type, parent, and child names.
	 *
	 * @param elementIdName - The name of the parameter representing the elementId of the relationship.
	 * @param relType - The optional type of the relationship to match. Defaults to an empty string.
	 * @param relationshipName - The optional name of the relationship to match. Defaults to "rel".
	 * @param parentName - The optional name of the parent node. Defaults to "parent".
	 * @param childName - The optional name of the child node. Defaults to "child".
	 * @returns A Cypher query string to match a relationship by its elementId.
	 */
	_getRelByElementIdQuery({
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

	async serverQuery<R extends RecordShape>(query: string, params?: any): Promise<QueryResult<R>> {
		const session = this.driver.session(sessionConfig);
		try {
			const result: Result = await session.run(query, params);
			return result;
		} catch (error) {
			throw new Error(`"_query" no Neo4j: ${error}`);
		} finally {
			await session.close();
		}
	}

	// region CreateIndices

	async createSearchIndex({
		indexName,
		label,
		field
	}: {
		indexName: string;
		label: string;
		field: string;
	}): Promise<void> {
		await this.serverQuery(`
			CREATE FULLTEXT INDEX ${indexName}
			IF NOT EXISTS
			FOR (n${label})
			ON EACH [n.${field}]
		`);
		console.info(`Index ${indexName} created for label ${label} on field ${field}`);
	}
	// endregion

	// region InsertMethods
	// Insere um nó no banco de dados (caso parentElementId seja informado, o nó é inserido como filho)
	async serverInsert<T extends { [key: string]: any } = any>({
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
	}): Promise<ReturnCreateType & { node?: Node<Integer, T> }> {
		const parameters: any = { _id, ...nodeData };
		const label = hasValue(nodeLabel) ? nodeLabel : this.nodeLabel;
		const relType = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		let query: string;

		if (parentElementId) {
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "parentElementId" })}
                MERGE (node)-[rel${relType}${this._formatParameters(relationshipData)}]->(child${label}${this._formatParameters(parameters)})
                RETURN node as PARENT, rel as RELATIONSHIP, child as NODE
            `;
		} else {
			query = `
                MERGE (node${label}${this._formatParameters(parameters)})
                RETURN node AS NODE, NULL AS RELATIONSHIP, NULL AS PARENT
            `;
		}

		try {
			const props = { ...parameters, ...(relationshipData || {}), parentElementId };
			const result = await this.serverQuery(query, props);
			return {
				parent: this._extractMainProperties(result?.records[0]?.get("PARENT") ?? {}),
				relationship: this._extractMainProperties(result?.records[0]?.get("RELATIONSHIP") ?? {}),
				node: this._extractMainProperties(result?.records[0]?.get("NODE")) as Node<Integer, T>
			};
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
	}): Promise<
		ReturnCreateType & {
			parentRelationship?: Record<string, any>;
			childRelationship?: Record<string, any>;
			child?: Record<string, any>;
		}
	> {
		const parameters: any = { _id, ...nodeData };
		const label = hasValue(nodeLabel) ? nodeLabel : this.nodeLabel;
		const relType = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		const relTypeParent = hasValue(relationshipTypeParent) ? relationshipTypeParent : this.relationshipType;
		const relTypeChild = hasValue(relationshipTypeChild) ? relationshipTypeChild : this.relationshipType;

		let query: string;
		if (parentElementId) {
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "parentElementId", nodeName: "parent" })}
                ${this._getNodeByElementIdQuery({ elementIdName: "childElementId", nodeName: "child" })}
                MATCH (parent)-[rel${relType}]->(child)
                DELETE rel
                MERGE (parent)-[prel${relTypeParent}${this._formatParameters(relationshipDataParent)}]->(node${label}${this._formatParameters(parameters)})-[crel${relTypeChild}${this._formatParameters(relationshipDataChild)}]->(child)
                RETURN parent as PARENT, prel as PARENT_RELATIONSHIP, node as NODE, crel as CHILD_RELATIONSHIP, child as CHILD
            `;
		} else {
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "childElementId", nodeName: "child" })}
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
			const result = await this.serverQuery(query, props);
			return {
				parent: this._extractMainProperties(result?.records[0]?.get("PARENT")),
				parentRelationship: this._extractMainProperties(result?.records[0]?.get("PARENT_RELATIONSHIP")),
				child: this._extractMainProperties(result?.records[0]?.get("CHILD")),
				childRelationship: this._extractMainProperties(result?.records[0]?.get("CHILD_RELATIONSHIP")),
				node: this._extractMainProperties(result?.records[0]?.get("NODE"))
			};
		} catch (error) {
			throw new Error(`"insertBetween" no Neo4j: ${error}`);
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
	}): Promise<Array<ReturnCreateType>> {
		const currentRel = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		const relType = hasValue(relationshipData) ? currentRel : relationshipType;
		relationshipData = { ...relationshipData, _id: nanoid() };

		let query: string;

		if (parentElementId && childElementId) {
			// Insere relacionamento entre dois nós especificos
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "parentElementId", nodeName: "parent" })}
                ${this._getNodeByElementIdQuery({ elementIdName: "childElementId", nodeName: "child" })}
                MERGE (parent)-[rel${relType}${this._formatParameters(relationshipData)}]->(child)
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (parentElementId && (childFilter || childLabel)) {
			// Insere relacionamento entre um nó pai e vários nós filhos
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "parentElementId", nodeName: "parent" })}
                MATCH (child${childLabel}${this._formatParameters(childFilter)})
                MERGE (parent)-[rel${relType}${this._formatParameters(relationshipData)}]->(child)
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (childElementId && (parentFilter || parentLabel)) {
			// Insere relacionamento entre vários nós pais e um nó filho
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "childElementId", nodeName: "child" })}
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
			const response = await this.serverQuery(query, parameters);
			return response?.records?.map((record: any) => ({
				parent: this._extractMainProperties(record?.get("PARENT")),
				child: this._extractMainProperties(record?.get("CHILD")),
				relationship: this._extractMainProperties(record?.get("RELATIONSHIP"))
			}));
		} catch (error) {
			throw new Error(`"serverInsertRelationships" no Neo4j: ${error}`);
		}
	}

	//endregion

	// region FindMethods

	// Busca no banco de dados os nós com um determinado label e filtros
	async serverFind({
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
	}): Promise<Array<Record<string, any>>> {
		const label = hasValue(nodeLabel) ? nodeLabel : this.nodeLabel;
		let query: string = `
            MATCH (node${label}${this._formatParameters(filter)})
            RETURN node as NODE
        `;

		if (props?.elementId) {
			query = `
            ${this._getNodeByElementIdQuery({ elementIdName: "elementId" })}
            RETURN node as NODE
            `;
		}

		if (props?.orderBy) {
			if (!isValidVarName(props.orderBy.prop)) throw new Error(`ServerFind: Invalid identifier: ${props.orderBy.prop}`);
			query = `
             ${query}
             ORDER BY NODE.${props.orderBy.prop} ${props.orderBy.desc ? "DESC" : ""}
            `;
		}

		try {
			const result = await this.serverQuery(query, {
				...filter,
				elementId: props?.elementId
			});
			return (result?.records?.map((record: any) => this._extractMainProperties(record?.get("NODE"))) ?? []) as Array<
				Record<string, any>
			>;
		} catch (error) {
			throw new Error(`"serverFind" no Neo4j: ${error}`);
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
	}): Promise<
		Array<{
			parent?: Record<string, any>;
			child?: Record<string, any>;
			relationship?: Record<string, any>;
		}>
	> {
		const currentRel = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		const relType = hasValue(relationshipFilter) ? currentRel : relationshipType;

		let query: string;

		if (relationshipElementId) {
			// encontra relacionamento baseado no elementId da relação
			query = `
                ${this._getRelByElementIdQuery({ elementIdName: "relationshipElementId", relType })}
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (parentElementId && childElementId) {
			// encontra relacionamento entre dois nós especificos
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "parentElementId", nodeName: "parent" })}
                ${this._getNodeByElementIdQuery({ elementIdName: "childElementId", nodeName: "child" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child)
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (parentElementId && (childFilter || childLabel)) {
			// encontra relacionamento entre um nó pai e vários nós filhos
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "parentElementId", nodeName: "parent" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child${childLabel}${this._formatParameters(childFilter)})
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (childElementId && (parentFilter || parentLabel)) {
			// encontra relacionamento entre vários nós pais e um nó filho
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "childElementId", nodeName: "child" })}
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
			throw new Error('É necessário um par de nós, elementId ou filter da relação "serverFindRelationships"');
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
			const response = await this.serverQuery(query, parameters);
			return (
				response?.records?.map((record: any) => ({
					parent: this._extractMainProperties(record?.get("PARENT")),
					child: this._extractMainProperties(record?.get("CHILD")),
					relationship: this._extractMainProperties(record?.get("RELATIONSHIP"))
				})) ?? []
			);
		} catch (error) {
			throw new Error(`"serverFindRelationships" no Neo4j: ${error}`);
		}
	}

	//endregion

	// region UpdateMethods
	// Atualiza um nó no banco de dados por meio do elementId
	async serverUpdate({
		elementId,
		_id,
		...updateProps
	}: {
		elementId?: string;
		_id?: string;
		[key: string]: any;
	}): Promise<Record<string, any> | undefined> {
		if (!elementId && !_id) throw new Meteor.Error("É necessário informar o elementId ou o id do nó a ser atualizado");

		const query = `
			${elementId ? this._getNodeByElementIdQuery({ elementIdName: "elementId" }) : this._getNodeByIdQuery({ idName: "_id" })}
         	SET ${this._formatParametersWithNode("node", updateProps)}
         	RETURN node as NODE
      	`;

		try {
			const result = await this.serverQuery(query, {
				...updateProps,
				_id,
				elementId
			});
			return this._extractMainProperties(result?.records[0]?.get("NODE"));
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
	}): Promise<Record<string, any> | undefined> {
		let query = "";
		const parameters = { _id: nanoid(), ...props };
		const label = hasValue(nodeLabel) ? nodeLabel : this.nodeLabel;

		try {
			query = `
				MERGE node WHERE elementId(node) = $elementId
				ON CREATE SET ${this._formatParametersWithNode("node", props)}
				ON MATCH SET ${this._formatParametersWithNode("node", props)}
                RETURN node as NODE
            `;

			const response = await this.serverQuery(query, {
				...parameters,
				elementId
			});

			return this._extractMainProperties(response?.records[0]?.get("NODE"));
		} catch (error) {
			throw new Error(`"upsert" no Neo4j: ${error}`);
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
	}): Promise<
		Array<{
			parent?: Record<string, any>;
			child?: Record<string, any>;
			relationship?: Record<string, any>;
		}>
	> {
		const currentRel = hasValue(relationshipType) ? relationshipType : this.relationshipType;
		const relType = hasValue(relationshipData) ? currentRel : relationshipType;

		let query: string;

		if (relationshipElementId) {
			// Atualiza relacionamento baseado no elementId da relação
			query = `
                ${this._getRelByElementIdQuery({ elementIdName: "relationshipElementId", relType })}
                SET ${this._formatParametersWithNode("rel", relationshipData)}
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (parentElementId && childElementId) {
			// Atualiza relacionamento entre dois nós especificos
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "parentElementId", nodeName: "parent" })}
                ${this._getNodeByElementIdQuery({ elementIdName: "childElementId", nodeName: "child" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child)
                SET ${this._formatParametersWithNode("rel", relationshipData)}
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (parentElementId && (childFilter || childLabel)) {
			// Atualiza relacionamento entre um nó pai e vários nós filhos
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "parentElementId", nodeName: "parent" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child${childLabel}${this._formatParameters(childFilter)})
                SET ${this._formatParametersWithNode("rel", relationshipData)}
                RETURN DISTINCT parent as PARENT, child as CHILD, rel as RELATIONSHIP
            `;
		} else if (childElementId && (parentFilter || parentLabel)) {
			// Atualiza relacionamento entre vários nós pais e um nó filho
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "childElementId", nodeName: "child" })}
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
			const response = await this.serverQuery(query, parameters);
			return response?.records?.map((record: any) => ({
				parent: this._extractMainProperties(record?.get("PARENT")),
				child: this._extractMainProperties(record?.get("CHILD")),
				relationship: this._extractMainProperties(record?.get("RELATIONSHIP"))
			}));
		} catch (error) {
			throw new Error(`"serverUpdateRelationships" no Neo4j: ${error}`);
		}
	}
	//endregion

	// region DeleteMethods

	// Remove um nó e todas suas relações do banco de dados por meio do elementId
	async serverRemove({ elementId }: { elementId: string }) {
		const query = `
            ${this._getNodeByElementIdQuery({ elementIdName: "elementId" })}
            DETACH DELETE node
        `;
		try {
			return await this.serverQuery(query, { elementId });
		} catch (error) {
			throw new Error(`"serverRemove" no Neo4j: ${error}`);
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
                ${this._getRelByElementIdQuery({ elementIdName: "relationshipElementId", relType })}
                DELETE rel
            `;
		} else if (parentElementId && childElementId) {
			// Deleta relacionamento entre dois nós especificos
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "parentElementId", nodeName: "parent" })}
                ${this._getNodeByElementIdQuery({ elementIdName: "childElementId", nodeName: "child" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child)
                DELETE rel
            `;
		} else if (parentElementId && (childFilter || childLabel)) {
			// Deleta relacionamento entre um nó pai e vários nós filhos
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "parentElementId", nodeName: "parent" })}
                OPTIONAL MATCH (parent)-[rel${relType}${this._formatParameters(relationshipFilter)}]->(child${childLabel}${this._formatParameters(childFilter)})
                DELETE rel
            `;
		} else if (childElementId && (parentFilter || parentLabel)) {
			// Deleta relacionamento entre vários nós pais e um nó filho
			query = `
                ${this._getNodeByElementIdQuery({ elementIdName: "childElementId", nodeName: "child" })}
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
			throw new Error('É necessário um par de nós, elementId ou filter da relação "serverDeleteRelationships"');
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
			return await this.serverQuery(query, parameters);
		} catch (error) {
			throw new Error(`"serverDeleteRelationships" no Neo4j: ${error}`);
		}
	}
	// endregion
	// Método para fechar a conexão
	async close() {
		//await this.session.close();
		await this.driver.close();
	}
}

/* eslint-enable */
