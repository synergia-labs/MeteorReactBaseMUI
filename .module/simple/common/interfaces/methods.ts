import { TransformServerToApiMethodsType } from "/imports/base/types/serverApiMethods";
// import { MethodType } from "/imports/base/types/method"; // Uncomment this line if you are using methods

/*
    You need to declare the module methods here with the same name as the enum/methods.ts (keyName).
    This is necessary to be able to use the methods in the backend/frontend linked with typescript.
*/
interface IModuleNameServerMethodsType extends Record<string, (...args: any) => any> {
	//methodbase: MethodType<typeof methodbase>; // ModuleName of method definition
}

type ModuleNameApiMethodsType = TransformServerToApiMethodsType<IModuleNameServerMethodsType>;
export type { IModuleNameServerMethodsType, ModuleNameApiMethodsType };
