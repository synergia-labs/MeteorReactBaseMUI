import neo4j from "neo4j-driver";

const config = {
	uri: process.env.NEO4J_URL || "neo4j://localhost:7687/",
	user: process.env.NEO4J_USER || "neo4j",
	password: process.env.NEO4J_PASSWORD || "12345678",
	database: process.env.NEO4J_DB || "neo4j"
};

const diver = neo4j.driver(config.uri, neo4j.auth.basic(config.user, config.password), {
	maxConnectionPoolSize: 300, // O número máximo de conexões no pool.
	connectionAcquisitionTimeout: 240000, // O tempo máximo em milissegundos para adquirir uma conexão.
	connectionTimeout: 60000, // O tempo máximo em milissegundos para estabelecer uma conexão.
	encrypted: "ENCRYPTION_OFF",
	trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
	fetchSize: 1000 // O número de registros a buscar por vez durante a iteração sobre os resultados de uma consulta
});
const session = diver.session();

export { config, session, diver };
