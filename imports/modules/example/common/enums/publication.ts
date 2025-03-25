import { enumExampleSettings } from "./settings";

function getName(name: string) {
	return `${enumExampleSettings.MODULE_NAME}.${name}`;
}

export const enumExamplePublications = {
	// Example of publication definition
	examplePublication: getName("publicationExample") // Delete this line when starting to use this module
};
