import { enumExamplePublications } from "../../common/enums/publication";
import {
	paramPublicationExampleSch,
	ParamPublicationExampleType,
	returnPublicationExampleSch,
	ReturnPublicationExampleType
} from "../../common/types/publicationExample";
import { ExampleServer } from "../server";
import PublicationBase from "/imports/base/server/publication/publication.base";
import { IContext } from "../../../../types/context";

class PublicationExample extends PublicationBase<
	ExampleServer,
	ParamPublicationExampleType,
	ReturnPublicationExampleType
> {
	constructor() {
		super({
			name: enumExamplePublications.examplePublication,
			paramSch: paramPublicationExampleSch,
			returnSch: returnPublicationExampleSch,
			description: "This is an example of a publication"
		});
	}

	action(
		_params: ParamPublicationExampleType,
		_options: Mongo.Options<ReturnPublicationExampleType>,
		_context: IContext
	): Promise<Mongo.Cursor<ReturnPublicationExampleType>> {
		// Here you can implement your publication

		// An publication needs to return a Mongo.Cursor
		return {} as Promise<Mongo.Cursor<ReturnPublicationExampleType>>;
	}
}

export const publicationExample = new PublicationExample();
