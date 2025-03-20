import EnumExampleSettings from "..";

const getName = (name: string): string => `${EnumExampleSettings.MODULE_NAME}.${name}`;

const enumExampleRegisterPublications = {
	exampleList: getName("exampleList")
} as const;

export default enumExampleRegisterPublications;
