import { enumExampleMethods } from "../../common/enums/methods";
import {
	paramMethodExampleSch,
	ParamMethodExampleType,
	returnMethodExampleSch,
	ReturnMethodExampleType
} from "../../common/types/methodExample";
import { ExampleServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";

class MethodBaseEx extends MethodBase<ExampleServer, ParamMethodExampleType, ReturnMethodExampleType> {
	constructor() {
		super({
			name: enumExampleMethods.exampleMethod,
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

export const methodExample = new MethodBaseEx();
