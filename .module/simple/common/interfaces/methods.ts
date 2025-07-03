import { TransformServerToApiMethodsType } from "/imports/types/serverApiMethods";
// import { MethodType } from "/imports/base/types/method"; // Uncomment this line if you are using methods

/*
    You need to declare the module methods here with the same name as the enum/methods.ts (keyName).
    This is necessary to be able to use the methods in the backend/frontend linked with typescript.
*/
interface IModuleNameMethodsTypeRegistered extends Record<string, (...args: any) => any> {
	//methodbase: MethodType<typeof methodbase>; // Alerts of method definition
}
// Methods declared here will not be registered in the server (cant be called by the client)
interface IModuleNameMethodsTypeNotRegistered extends Record<string, (...args: any) => any> {
	//methodbase: MethodType<typeof methodbase>; // Alerts of method definition
}

type ModuleNameApiMethodsType = TransformServerToApiMethodsType<IModuleNameMethodsTypeRegistered>;
type ModuleNameMethodsType = IModuleNameMethodsTypeRegistered & IModuleNameMethodsTypeNotRegistered;
export type { ModuleNameMethodsType, ModuleNameApiMethodsType };
