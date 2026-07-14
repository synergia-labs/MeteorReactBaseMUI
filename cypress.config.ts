import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';

export default defineConfig({
	video: false,
	fixturesFolder: '.cypress/fixtures',
	screenshotsFolder: '.cypress/screenshots',
	reporter: 'junit',
	reporterOptions: {
		mochaFile: '.cypress/results/cypress-report-[hash].xml',
		toConsole: true
	},
	e2e: {
		baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
		specPattern: '.cypress/integration/**/*.{feature,features}',
		supportFile: '.cypress/support/index.js',
		async setupNodeEvents(on, config) {
			await addCucumberPreprocessorPlugin(on, config);
			on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
			return config;
		}
	}
});
