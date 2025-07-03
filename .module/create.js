const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Configuração do readline para entrada do usuário
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Configura todas as variáveis globais do código

const TEMPLATE_DIR = "./.module/simple";
const MODULES_DIR = "./imports/modules";
const REGISTER_ROUTE_PATH = "./imports/app/routes/register.ts";
const REGISTER_SERVER_PATH = "./server/main.ts";
const REGISTER_I18N_PATH = "./imports/services/internationalization/index.ts";

// Função para perguntar algo ao usuário
const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

function toPascalCase(str) {
	return str
		.replace(/[^a-zA-Z0-9]+/g, " ") // Remove caracteres especiais e substitui por espaço
		.trim() // Remove espaços extras no início e no fim
		.split(" ") // Divide a string em palavras
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Converte para PascalCase
		.join(""); // Junta as palavras sem espaços
}
function toCamelCase(str) {
	return str
		.replace(/[^a-zA-Z0-9]+/g, " ") // Remove caracteres especiais e substitui por espaço
		.trim() // Remove espaços extras no início e no fim
		.split(" ") // Divide a string em palavras
		.map((word, index) => (index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())) // Converte para camelCase
		.join(""); // Junta as palavras sem espaços
}

// Função para copiar diretórios recursivamente
function copyDirectory(src, dest) {
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	fs.readdirSync(src).forEach((file) => {
		const srcFile = path.join(src, file);
		const destFile = path.join(dest, file);

		if (fs.statSync(srcFile).isDirectory()) {
			// Se for diretório, chama a função recursivamente
			copyDirectory(srcFile, destFile);
		} else {
			// Se for arquivo, apenas copia sem modificar nada
			fs.copyFileSync(srcFile, destFile);
		}
	});
}

// Função para substituir conteúdo de arquivos (substituições em cascata)
function replaceInFiles(refString, newString, modulePath) {
	function processDirectory(dir) {
		fs.readdirSync(dir).forEach((file) => {
			const filePath = path.join(dir, file);
			const stats = fs.statSync(filePath);

			if (stats.isDirectory()) {
				processDirectory(filePath); // Recursão para subdiretórios
			} else if (/\.(js|ts|jsx|tsx|json)$/.test(file)) {
				let content = fs.readFileSync(filePath, "utf8");

				if (content.includes(refString)) {
					content = content.replace(new RegExp(refString, "g"), newString);
					fs.writeFileSync(filePath, content, "utf8");
					console.log(`✅ Substituído em: ${filePath}`);
				}
			}
		});
	}

	processDirectory(modulePath);
}

// Adiciona um novo módulo ao arquivo register.ts.
function updateRegisterRouteFile(moduleName) {
	if (!fs.existsSync(REGISTER_ROUTE_PATH)) {
		console.log("❌ Erro: O arquivo register.ts não foi encontrado.");
		return;
	}

	let content = fs.readFileSync(REGISTER_ROUTE_PATH, "utf8");

	// Criar a string do novo import
	const importStatement = `import ${moduleName}RouterList from "/imports/modules/${moduleName}/routes";\n`;

	// Verifica se o import já existe
	if (content.includes(importStatement.trim())) {
		console.log(`⚠️ O módulo ${moduleName} já está registrado.`);
		return;
	}

	// Adiciona o import no topo do arquivo
	content = importStatement + content;

	// Encontrar a linha onde sysRoutesList é declarado
	const sysRoutesListRegex = /export const sysRoutesList: Array<RouteType> = addFullPathToRoutes\(\[(.*?)\]\);/s;
	const match = content.match(sysRoutesListRegex);

	if (match) {
		const currentRoutes = match[1].trim();
		const updatedRoutes = `${currentRoutes}, ...${moduleName}RouterList`;
		content = content.replace(
			sysRoutesListRegex,
			`export const sysRoutesList: Array<RouteType> = addFullPathToRoutes([${updatedRoutes}]);`
		);
	} else {
		console.log("❌ Erro: Não foi possível encontrar a declaração sysRoutesList.");
		return;
	}

	// Escreve de volta no arquivo
	fs.writeFileSync(REGISTER_ROUTE_PATH, content, "utf8");

	console.log(`✅ O módulo ${moduleName} foi adicionado ao register.ts com sucesso!`);
}

function updateRegisterI18nFile(moduleName) {
	if (!fs.existsSync(REGISTER_I18N_PATH)) {
		console.log("❌ Erro: O arquivo de registro de traduções não foi encontrado.");
		return;
	}

	let content = fs.readFileSync(REGISTER_I18N_PATH, "utf8");

	// Criar a string do novo import
	const importStatement = `import ${moduleName} from "/imports/modules/${moduleName}/common/locales";\n`;

	// Verifica se o import já existe
	if (content.includes(importStatement.trim())) {
		console.log(`⚠️ O módulo ${moduleName} já está registrado.`);
		return;
	}

	// Adiciona o import no topo do arquivo
	content = importStatement + content;

	// Encontrar a linha onde registerModules é declarado
	const registerModulesRegex = /const registerModules: Array<Record<enumSupportedLanguages, any>> = \[(.*?)\];/s;
	const match = content.match(registerModulesRegex);

	if (!match) return console.log("❌ Erro: Não foi possível encontrar a declaração registerModules.");
	const currentModules = match[1].trim();
	const updatedModules = `${currentModules}, ${moduleName}`;
	content = content.replace(
		registerModulesRegex,
		`const registerModules: Array<Record<enumSupportedLanguages, any>> = [${updatedModules}];`
	);

	// Escreve de volta no arquivo
	fs.writeFileSync(REGISTER_I18N_PATH, content, "utf8");
	console.log(`✅ O módulo ${moduleName} foi adicionado ao registro de traduções com sucesso!`);
}

// Adiciona um novo módulo ao arquivo register.ts.
function updateRegisterServerFile(moduleName) {
	if (!fs.existsSync(REGISTER_SERVER_PATH)) {
		console.log("❌ Erro: O arquivo register.ts não foi encontrado.");
		return;
	}

	let content = fs.readFileSync(REGISTER_SERVER_PATH, "utf8");

	// Criar a string do novo import
	const importStatement = `import "../imports/modules/${moduleName}/backend/server";\n`;

	// Verifica se o import já existe
	if (content.includes(importStatement.trim())) {
		console.log(`⚠️ O módulo ${moduleName} já está registrado.`);
		return;
	}

	// Adiciona o import no topo do arquivo
	content = importStatement + content;

	// Escreve de volta no arquivo
	fs.writeFileSync(REGISTER_SERVER_PATH, content, "utf8");

	console.log(`✅ O módulo ${moduleName} foi adicionado ao register.ts com sucesso!`);
}

// Execução do script
(async function main() {
	let moduleName = await askQuestion("Digite o nome do novo módulo: ");

	if (!moduleName) {
		console.log("Erro: O nome do módulo não pode estar vazio.");
		rl.close();
		return;
	}
	moduleName = toPascalCase(moduleName);

	// Caminho do novo módulo
	const newModulePath = path.join(MODULES_DIR, toCamelCase(moduleName));

	// Copia os arquivos e faz substituições
	copyDirectory(TEMPLATE_DIR, newModulePath);

	// Substitui o nome do módulo nos arquivos
	replaceInFiles("ModuleName", toPascalCase(moduleName), newModulePath);
	replaceInFiles("moduleName", toCamelCase(moduleName), newModulePath);

	// Registra as rotas e API do modulo
	updateRegisterRouteFile(toCamelCase(moduleName));
	updateRegisterServerFile(toCamelCase(moduleName));
	updateRegisterI18nFile(toCamelCase(moduleName));

	console.log(`✅ Módulo '${moduleName}' criado com sucesso em '${newModulePath}'!`);
	rl.close();
})();
