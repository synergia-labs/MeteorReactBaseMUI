// eslint-plugin-custom-imports.js
import path from "path";

export default {
	meta: {
		type: "problem",
		docs: {
			description: "Bloqueia importações entre backend e frontend"
		}
	},
	create(context) {
		// Obtém o caminho do arquivo atual
		const currentFilePath = context.getFilename();

		return {
			// Captura todas as declarações de importação
			ImportDeclaration(node) {
				// Obtém o caminho do módulo importado
				const importPath = node.source.value;

				// Verifica se o caminho atual contém 'backend' ou 'frontend'
				const currentIsBackend = currentFilePath.includes("backend");
				const currentIsFrontend = currentFilePath.includes("frontend");

				// Verifica se o caminho importado contém 'backend' ou 'frontend'
				const importIsBackend = importPath.includes("backend");
				const importIsFrontend = importPath.includes("frontend");

				// Regra: Se um é backend e o outro frontend (ou vice-versa), gera erro
				if ((currentIsBackend && importIsFrontend) || (currentIsFrontend && importIsBackend)) {
					context.report({
						node,
						message: "Importação entre backend e frontend é proibida!"
					});
				}
			}
		};
	}
};
