import { enumExampleSettings } from "./settings";

function getName(name: string) {
	return `${enumExampleSettings.MODULE_NAME}.${name}`;
}

export const enumExampleMethods = {
	// Example of method definition
	exampleMethod: getName("methodExample") // Delete this line when starting to use this module
};
