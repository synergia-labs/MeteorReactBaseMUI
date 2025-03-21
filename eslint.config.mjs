import globals from "globals";
// import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginMeteor from "eslint-plugin-meteor";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

import typescriptParser from "@typescript-eslint/parser";
import eslintPluginImport from "eslint-plugin-import";
import importPlugin from "eslint-plugin-import";

import createRuleMaxLines from "./.eslint-rules/max-function-lines.mjs";
import crossImports from "./.eslint-rules/cross-imports.mjs";

/** @type {import('eslint').Linter.Config[]} */
export default [
	prettierConfig, // Desativa regras do ESLint que conflitam com Prettier
	pluginReact.configs.flat.recommended, // Configuração recomendada do React
	...tseslint.configs.recommended,
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node }, parser: typescriptParser } },
	{
		ignores: ["node_modules/", ".meteor/", "build/", ".cypress/", ".vscode/", "stories/"]
	},
	{
		settings: {
			react: {
				version: "detect" // Faz com que o ESLint detecte a versão do React automaticamente
			},
			meteor: {
				rootDir: "." // Define a raiz do projeto Meteor
			}
		},
		languageOptions: {
			ecmaVersion: "latest", // Suporte à versão mais recente do JS
			sourceType: "module" // Meteor suporta ESModules
		},

		plugins: {
			"boundary": importPlugin,
			"react": pluginReact,
			"meteor": eslintPluginMeteor,
			"prettier": prettierPlugin,
			"import": eslintPluginImport,
			"custom-rules": {
				rules: {
					"cross-imports": crossImports,
					"max-lines-error": createRuleMaxLines(),
					"max-lines-warn": createRuleMaxLines()
				}
			}
		},
		rules: {
			"custom-rules/cross-imports": "error", // Regra customizada
			"custom-rules/max-lines-warn": ["warn", { maxLines: 40 }], // 👈 Warn acima de 50
			"custom-rules/max-lines-error": ["error", { maxLines: 80 }], // 👈 Error acima de 70

			"no-console": ["error", { allow: ["warn", "error", "info", "time", "timeEnd"] }], // Avisar sobre console.log
			"prefer-const": "error", // Preferir const
			"prettier/prettier": ["error", { singleQuote: false, trailingComma: "none" }], // **Garante aspas duplas e sem trailing comma**
			"meteor/no-session": "warn", // Avisar sobre o uso de Session (não recomendado)
			"@typescript-eslint/no-empty-object-type": "off", // Desativa a regra que emite erro para interfaces vazias
			"@typescript-eslint/no-explicit-any": "off", // Desativa a regra que emite erro para uso de "any"
			"@typescript-eslint/ban-ts-comment": "off", // Desativa a regra que emite erro para uso de "// @ts-ignore"
			"linebreak-style": ["error", "unix"],
			"max-depth": ["error", { max: 3 }],
			"no-unused-vars": "off",
			"no-restricted-syntax": [
				"error",
				{
					selector:
						"ClassDeclaration[superClass.name]:matches([superClass.name='MethodBase'], [superClass.name='ActionsBase'], [superClass.name='CreateMethodBase'], [superClass.name='PublicationBase']) MethodDefinition ThrowStatement",
					message: "Não é permitido usar 'throw' em métodos dentro desta classe. Utilize this.generateError em vez disso."
				}
			],
			"@typescript-eslint/naming-convention": [
				"error",
				{
					selector: "variableLike",
					format: ["camelCase", "UPPER_CASE"],
					filter: { match: false, regex: "^_" }
				},
				{ selector: ["classMethod"], format: ["camelCase"], leadingUnderscore: "allow" },
				{ selector: ["function"], format: ["PascalCase", "camelCase"], leadingUnderscore: "allow" },
				{ selector: ["interface"], format: ["PascalCase"], prefix: ["I"] },
				{ selector: ["variable"], format: ["camelCase", "PascalCase"], leadingUnderscore: "allow" },
				{ selector: ["enum"], format: ["camelCase"], prefix: ["enum"] },
				{ selector: ["typeAlias"], format: ["PascalCase"], suffix: ["Type"] },
				{ selector: ["class"], format: ["PascalCase"] },
				{ selector: "enumMember", format: ["UPPER_CASE"] }
			],
			"react/display-name": "off",
			"@typescript-eslint/no-unused-expressions": "off",

			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					ignoreRestSiblings: true,
					argsIgnorePattern: "^_", // Ignora argumentos com prefixo "_"
					varsIgnorePattern: "^(React|_|__)", // Ignora variáveis que começam com "React", "_" ou "__"
					caughtErrorsIgnorePattern: "^_*"
				}
			],

			"import/no-restricted-paths": [
				"error",
				{
					zones: [
						// Frontend → Backend
						{
							target: "*backend*",
							from: "*frontend*",
							message: "Importação do backend no frontend é proibida! 🔴"
						},
						// Backend → Frontend
						{
							target: "*frontend*",
							from: "*backend*",
							message: "Importação do frontend no backend é proibida! 🔵"
						}
					]
				}
			]
		}
	}
];
