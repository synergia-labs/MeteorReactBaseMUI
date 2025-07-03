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

					// Flags para rastrear se estamos dentro de um template literal (`string multilinha`)
					let insideTemplateLiteral = false;

					const filteredLines = lines.filter((line) => {
						const trimmedLine = line.trim();

						// Ignora linhas de comentário
						if (/^\/\//.test(trimmedLine) || /^\/\*.*\*\/$/.test(trimmedLine)) {
							return false;
						}

						// Alterna a flag quando encontra um template literal (`) no início ou fim
						const backtickMatches = trimmedLine.match(/`/g);
						if (backtickMatches && backtickMatches.length % 2 !== 0) {
							insideTemplateLiteral = !insideTemplateLiteral;
						}

						// Ignora linha dentro de um template literal
						if (insideTemplateLiteral) {
							return false;
						}

						// Mantém todas as outras linhas
						return true;
					});

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
