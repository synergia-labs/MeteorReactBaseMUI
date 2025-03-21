import ExampleContainer from "../frontend/exampleContainer";
import ExampleDetailProvider from "../frontend/pages/exampleDetail/exampleDetailProvider";
import ExampleListProvider from "../frontend/pages/exampleList/exampleListProvider";
import { RouteType } from "/imports/modules/modulesTypings";

const exampleRouterList: Array<RouteType | null> = [
	{
		path: "example",
		element: ExampleContainer,
		templateVariant: "AppBar",
		children: [
			{
				path: ":screenState/:exampleId",
				element: ExampleDetailProvider,
				isProtected: true
			},
			{
				path: ":screenState",
				element: ExampleDetailProvider,
				isProtected: true
			},
			{
				path: "list",
				element: ExampleListProvider,
				isProtected: true
			}
		]
	}
] as const;

export default exampleRouterList;
