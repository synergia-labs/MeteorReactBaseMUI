import ts from 'typescript';

const baseline = 1211;
const configPath = ts.findConfigFile(process.cwd(), ts.sys.fileExists, 'tsconfig.json');
if (!configPath) throw new Error('tsconfig.json não encontrado.');

const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
if (configFile.error) throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n'));
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, process.cwd());
const program = ts.createProgram({ rootNames: config.fileNames, options: config.options });
const diagnostics = ts
	.getPreEmitDiagnostics(program)
	.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);

if (diagnostics.length > baseline) {
	console.error(`O TypeScript regrediu: ${diagnostics.length} erros; baseline atual: ${baseline}.`);
	console.error(
		ts.formatDiagnosticsWithColorAndContext(diagnostics.slice(0, 50), {
			getCanonicalFileName: (fileName) => fileName,
			getCurrentDirectory: process.cwd,
			getNewLine: () => '\n'
		})
	);
	process.exit(1);
}

if (diagnostics.length === 0) {
	console.log('TypeScript: zero erros.');
} else {
	console.log(`TypeScript: ${diagnostics.length} erros legados (baseline ${baseline}); nenhuma regressão adicionada.`);
}
