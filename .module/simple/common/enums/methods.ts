import { enumModuleNameSettings } from "./settings";

function getName(name: string) {
	return `${enumModuleNameSettings.MODULE_NAME}.${name}`;
}

export const enumModuleNameMethods = {
	// Example of method definition
	exampleMethod: getName("methodExample") // Delete this line when starting to use this module
};
