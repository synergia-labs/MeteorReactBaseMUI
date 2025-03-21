// custom-max-lines.js
export default function createRuleMaxLines(options) {
	return {
		meta: {
			type: "suggestion",
			docs: {
				description: "Proíbe funções com mais de X linhas (ignorando componentes)."
			},
			messages: {
				tooLong: "Função excede {{maxLines}} linhas. Considere fragmentar em funções menores."
			},
			schema: [
				{
					type: "object",
					properties: { maxLines: { type: "number" } },
					additionalProperties: false
				}
			]
		},
		create(context) {
			const sourceCode = context.getSourceCode();
			const options = context.options[0] || {};
			const maxLines = options.maxLines || 50;

			// Verifica se a função é um componente (retorna JSX)
			function isComponentFunction(node) {
				const body = node.body;

				// Caso 1: Arrow function com retorno direto de JSX (ex: () => <div>...</div>)
				if (body.type === "JSXElement" || body.type === "JSXFragment") {
					return true;
				}

				// Caso 2: Corpo da função com return JSX
				if (body.type === "BlockStatement") {
					const returnStatement = body.body.find(
						(stmt) =>
							stmt.type === "ReturnStatement" &&
							stmt.argument &&
							(stmt.argument.type === "JSXElement" || stmt.argument.type === "JSXFragment")
					);
					return !!returnStatement;
				}

				return false;
			}

			return {
				// Aplica a função para declarações e expressões de função
				"FunctionDeclaration, FunctionExpression, ArrowFunctionExpression"(node) {
					if (isComponentFunction(node)) {
						return; // Ignora componentes
					}

					const lines = sourceCode.getText(node).split("\n");
					const filteredLines = lines.filter((line) => !/^\s*['"`]/.test(line));

					if (filteredLines.length > maxLines) {
						context.report({
							node,
							messageId: "tooLong",
							data: { maxLines }
						});
					}
				}
			};
		}
	};
}
