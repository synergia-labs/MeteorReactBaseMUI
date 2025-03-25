import { TransformServerToApiMethodsType } from "/imports/base/types/serverApiMethods";
// import { MethodType } from "/imports/base/types/method"; // Uncomment this line if you are using methods

/*
    You need to declare the module methods here with the same name as the enum/methods.ts (keyName).
    This is necessary to be able to use the methods in the backend/frontend linked with typescript.
*/
interface IExampleServerMethodsType extends Record<string, (...args: any) => any> {
	//methodbase: MethodType<typeof methodbase>; // Example of method definition
}

type ExampleApiMethodsType = TransformServerToApiMethodsType<IExampleServerMethodsType>;
export type { IExampleServerMethodsType, ExampleApiMethodsType };
