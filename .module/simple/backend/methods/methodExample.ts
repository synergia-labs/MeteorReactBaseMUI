import { enumModuleNameMethods } from "../../common/enums/methods";
import {
	paramMethodExampleSch,
	ParamMethodExampleType,
	returnMethodExampleSch,
	ReturnMethodExampleType
} from "../../common/types/methodExample";
import { ModuleNameServerType } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/types/context";

class MethodExample extends MethodBase<ModuleNameServerType, ParamMethodExampleType, ReturnMethodExampleType> {
	constructor() {
		super({
			name: enumModuleNameMethods.exampleMethod,
			paramSch: paramMethodExampleSch,
			returnSch: returnMethodExampleSch,
			roles: [],
			description: "This is an example of a method"
		});
	}

	action(
		_param: ParamMethodExampleType,
		_context: IContext
	): ReturnMethodExampleType | Promise<ReturnMethodExampleType> {
		// Here you can implement your method
		return {} as ReturnMethodExampleType;
	}
}

export const methodExample = new MethodExample();
