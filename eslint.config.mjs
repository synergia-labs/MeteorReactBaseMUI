import globals from "globals";
// import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintPluginMeteor from "eslint-plugin-meteor";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

import typescriptParser from "@typescript-eslint/parser";
import noThrowInMethods from "./.eslint-rules/no-throw-in-methods.mjs";
import eslintPluginImport from "eslint-plugin-import";
import importPlugin from "eslint-plugin-import";

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
					"no-throw-in-methods": noThrowInMethods // Registrando a regra personalizada
				}
			}
		},
		rules: {
			"no-console": ["error", { allow: ["warn", "error"] }], // Avisar sobre console.log
			"prefer-const": "error", // Preferir const
			"prettier/prettier": ["error", { singleQuote: false, trailingComma: "none" }], // **Garante aspas duplas e sem trailing comma**
			"meteor/no-session": "warn", // Avisar sobre o uso de Session (não recomendado)
			"custom-rules/no-throw-in-methods": "error", // Regra customizada
			"@typescript-eslint/no-empty-object-type": "off", // Desativa a regra que emite erro para interfaces vazias
			"@typescript-eslint/no-explicit-any": "off", // Desativa a regra que emite erro para uso de "any"
			"@typescript-eslint/ban-ts-comment": "off", // Desativa a regra que emite erro para uso de "// @ts-ignore"
			"no-unused-vars": "off",

			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					ignoreRestSiblings: true,
					argsIgnorePattern: "^_", // Ignora argumentos com prefixo "_"
					varsIgnorePattern: "^(React|_)$", // Ignora a variável "React"
					caughtErrorsIgnorePattern: "^_"
				}
			],
			"import/no-restricted-paths": [
				"error",
				{
					zones: [
						{
							// Qualquer arquivo dentro de uma pasta que contenha "frontend"
							target: "**/frontend/**",
							// Não pode importar de qualquer pasta que contenha "backend"
							from: "**/backend/**",
							message: "Importar arquivos do backend em um diretório frontend não é permitido."
						},
						{
							target: "**/backend/**",
							from: "**/frontend/**",
							message: "Importar arquivos do frontend em um diretório backend não é permitido."
						}
					]
				}
			]
		}
	}
];
