module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: "tsconfig.json",
		tsconfigRootDir: __dirname,
		sourceType: "module"
	},
	plugins: ["@typescript-eslint/eslint-plugin", "import"],
	extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ["**/*.js", "*.js"],
	rules: {
		"no-console": "error",
		"no-debugger": "error",
		"linebreak-style": ["error", "unix"],
		"max-lines-per-function": ["error", { max: 30, skipBlankLines: true, skipComments: true }],
		"max-depth": ["error", { max: 3 }],
		"@typescript-eslint/naming-convention": [
			"error",
			{
				selector: "variableLike",
				format: ["camelCase", "UPPER_CASE"],
				filter: { match: false, regex: "^_" }
			},
			{ selector: ["function", "classMethod"], format: ["camelCase"] },
			{ selector: ["interface"], format: ["PascalCase"], prefix: ["I"] },
			{ selector: ["enum", "class"], format: ["PascalCase"] },
			{ selector: "enumMember", format: ["UPPER_CASE"] }
		],
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-non-null-asserted-optional-chain": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-empty-object-type": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				caughtErrors: "none"
			}
		],
		"prettier/prettier": [
			"error",
			{
				endOfLine: "lf",
				singleQuote: true,
				trailingComma: "all",
				printWidth: 100,
				semi: true,
				tabWidth: 2,
				arrowParens: "always",
				useTabs: false
			}
		],
		"import/no-relative-parent-imports": "error"
	},
	overrides: [
		{
			files: ["apps/**"], // Aplica essas regras apenas aos arquivos dentro da pasta "apps/"
			rules: {
				"no-restricted-imports": [
					// Ativa a regra de "importações restritas"
					"error", // Nível de severidade do erro (neste caso, 'error')
					{
						patterns: ["../apps/*", "**/*-ms/src/*", "../../../**/src"]
					}
				]
			}
		},
		{
			files: ["*.spec.ts", "*.module.ts", "*main.ts", "libs/modules/src/**", "**/migrations/*"],
			rules: {
				"max-lines-per-function": "off"
			}
		},
		//Decorators podem utilizar PascalCase (ex: @Filter, @Pagination)
		{
			files: ["*.decorator.ts"],
			rules: {
				"@typescript-eslint/naming-convention": [
					"error",
					{
						selector: "variable",
						modifiers: ["exported", "const"],
						types: ["function"],
						format: ["PascalCase"]
					}
				]
			}
		}
	]
};
