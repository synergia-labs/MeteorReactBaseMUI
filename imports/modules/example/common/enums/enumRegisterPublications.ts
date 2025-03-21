import enumExampleSettings from "..";

const getName = (name: string): string => `${enumExampleSettings.MODULE_NAME}.${name}`;

const enumExampleRegisterPublications = {
	exampleList: getName("exampleList")
} as const;

export default enumExampleRegisterPublications;
