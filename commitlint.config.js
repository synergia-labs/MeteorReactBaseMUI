module.exports = {
	extends: [],
	rules: {
		"cz-emoji": [2, "always"]
	},
	plugins: [
		{
			rules: {
				"cz-emoji": ({ raw }) => {
					// 🔧 Limpeza da mensagem: remove espaços extras no início e fim
					const cleanRaw = raw.trim();

					// 🛑 Ignorar validação para commits do tipo 'wip'
					const wipMatch = cleanRaw.match(/^wip\b/i);
					if (wipMatch) {
						console.info("🛠️ Commit WIP detectado: validação ignorada");
						return [true];
					}

					// ✅ Padrão esperado:
					// tipo(escopo): :emoji: subject \n descrição
					const headerPattern = /^([\w\-]+)\(([^\)]+)\):\s+(:[^:\s]+:)\s+(.+)$/m;
					const parts = cleanRaw.split(/\n+/);
					const header = parts[0];
					const description = parts.slice(1).join("\n").trim();

					const headerMatch = header.match(headerPattern);

					// ❌ Se o padrão do cabeçalho não for atendido, vamos identificar o que está faltando
					if (!headerMatch) {
						console.info("🚫 Padrão de cabeçalho inválido");
						// 🔍 Validações específicas com mensagens claras
						if (!/^(\w+)/.test(header))
							return [false, "❌ Tipo ausente ou inválido. Exemplo válido: `feat`, `fix`, `chore`, etc."];
						if (!/\([^\)]+\)/.test(header))
							return [false, "❌ Escopo ausente ou inválido. Exemplo válido: `(app)`, `(api)`, `(login)`, etc."];
						if (!/\):\s/.test(header))
							return [false, "❌ Formatação incorreta após o escopo. Deve conter `): ` (dois pontos e espaço)."];
						if (!/\):\s+:[^:\s]+:/.test(header))
							return [false, "❌ Emoji ausente ou mal formatado. Deve ser no formato `:emoji:` com espaços ao redor."];

						// 🕵️‍♂️ Verifica se há subject após o emoji
						const emojiPattern = /\):\s+(:[^:\s]+:)(.*)$/;
						const emojiMatch = header.match(emojiPattern);
						if (emojiMatch) {
							const afterEmoji = emojiMatch[2].trim();
							if (!afterEmoji) {
								return [false, "❌ Subject ausente após o emoji. Informe um título curto do que foi feito."];
							}
						}

						// Mensagem genérica caso não identifique um erro específico
						return [
							false,
							"🚫 Formato inválido. Use: `tipo(escopo): :emoji: subject` e opcionalmente uma descrição após uma quebra de linha"
						];
					}

					// 🟢 Extrai os grupos capturados do cabeçalho
					const type = headerMatch[1];
					const scope = headerMatch[2];
					const emoji = headerMatch[3];
					const subject = headerMatch[4];

					console.info("✅ Tipo:", type);
					console.info("✅ Escopo:", scope);
					console.info("✅ Emoji:", emoji);
					console.info("✅ Subject:", subject);

					// Se houver descrição, exibe também
					if (description) {
						console.info("✅ Descrição:", description);
					}

					// ✨ Mensagem válida!
					return [true];
				}
			}
		}
	]
};
