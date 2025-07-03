import { enumModuleNameSettings } from "../enums/settings";

export function getModuleNameActionName(name: string) {
	return `${enumModuleNameSettings.MODULE_NAME}.${name}`;
}
