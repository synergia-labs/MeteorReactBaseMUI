import js from '@eslint/js';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginMeteor from 'eslint-plugin-meteor';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

import typescriptParser from '@typescript-eslint/parser';
import noThrowInMethods from './.eslint-rules/no-throw-in-methods.js';
import eslintPluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node }, parser: typescriptParser } },
	{
		ignores: ['node_modules/', '.meteor/', 'build/', '.cypress/', '.vscode/', 'stories/']
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	js.configs.recommended, // Configuração padrão do ESLint
	{
		languageOptions: {
			ecmaVersion: 'latest', // Suporte à versão mais recente do JS
			sourceType: 'module' // Meteor suporta ESModules
		},
		plugins: {
			meteor: eslintPluginMeteor,
			prettier: prettierPlugin,
			import: eslintPluginImport,
			'custom-rules': {
				rules: {
					'no-throw-in-methods': noThrowInMethods // Registrando a regra personalizada
				}
			}
		},
		rules: {
			'no-console': ['error', { allow: ['warn', 'error'] }], // Avisar sobre console.log
			'prefer-const': 'error', // Preferir const
			'comma-dangle': ['off', 'always-multiline'], // Vírgula no final de objetos
			'quotes': ['error', 'single'], // Aspas simples
			'semi': ['error', 'always'], // Ponto e vírgula obrigatório
			'meteor/no-session': 'warn', // Avisar sobre o uso de Session (não recomendado)
			'prettier/prettier': 'error', // Exibe erro quando o código não está formatado corretamente
			'custom-rules/no-throw-in-methods': 'error', // Regra customizada
			'@typescript-eslint/no-empty-object-type': 'off', // Desativa a regra que emite o erro para interfaces vazias
			'@typescript-eslint/no-explicit-any': 'off', // Desativa a regra que emite o erro para uso de "any"
			'@typescript-eslint/ban-ts-comment': 'off', // Desativa a regra que emite o erro para uso de "// @ts-ignore"
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_', // Ignora argumentos com prefixo "_"
					varsIgnorePattern: '^React$, ^_' // Ignora a variável "React"
				}
			],
			'no-unused-vars': [
				'off',
				{
					argsIgnorePattern: '^_', // Ignora argumentos com prefixo "_"
					varsIgnorePattern: '^React$' // Ignora a variável "React"
				}
			],
			'import/no-restricted-paths': [
				'error',
				{
					zones: [
						{
							target: './**/frontend/', // Bloqueia qualquer frontend
							from: './**/backend/', // Se tentar importar do backend
							message: 'Frontend não pode importar código do backend!'
						},
						{
							target: './**/backend/', // Bloqueia qualquer backend
							from: './**/frontend/', // Se tentar importar do frontend
							message: 'Backend não pode importar código do frontend!'
						}
					]
				}
			]
		},
		settings: {
			meteor: {
				rootDir: '.' // Define a raiz do projeto Meteor
			}
		}
	}
];
