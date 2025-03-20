// .eslint-rules/no-throw-in-methods.js

export default {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Proíbe o uso de throw em classes que estendem MethodBase, PublicationBase, CreateMethodBase ou ActionBase'
		},
		messages: {
			noThrow:
				"Não é permitido usar 'throw' em classes que estendem MethodBase, PublicationBase, CreateMethodBase ou ActionBase."
		},
		schema: []
	},

	create(context) {
		// Garantindo que o parser TypeScript seja utilizado
		const sourceCode = context.getSourceCode();

		return {
			ThrowStatement(node) {
				// A partir do contexto, obter o nó de classe
				const ancestors = sourceCode.getNodeByRangeIndex(node.range[0]).parent;

				// Verificando a superclasse da classe atual
				if (ancestors && ancestors.superClass) {
					const superClassName = ancestors.superClass.name;

					// Verificando se a superclasse corresponde a uma das classes especificadas
					if (
						superClassName === 'MethodBase' ||
						superClassName === 'PublicationBase' ||
						superClassName === 'CreateMethodBase' ||
						superClassName === 'ActionBase'
					) {
						// Relatando o erro se a classe for uma subclasse de uma das mencionadas
						context.report({
							node,
							messageId: 'noThrow'
						});
					}
				}
			}
		};
	}
};
