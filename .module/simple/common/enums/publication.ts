import { enumModuleNameSettings } from "./settings";

function getName(name: string) {
	return `${enumModuleNameSettings.MODULE_NAME}.${name}`;
}

export const enumModuleNamePublications = {
	// Example of publication definition
	examplePublication: getName("publicationExample") // Delete this line when starting to use this module
};
