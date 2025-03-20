import React, { createContext } from 'react';
import { IExample } from '../../api/exampleSch';
import { ISchema } from '/imports/typings/ISchema';

interface IExampleDetailContext {
	document: Partial<IExample>;
	loading: boolean;
	schema: ISchema<IExample>;
	closePage: () => void;
	onSubmit: (doc: IExample) => void;
	changeToEdit: (id: string) => void;
}

const ExampleDetailContext = createContext<IExampleDetailContext>({} as IExampleDetailContext);
export default ExampleDetailContext;
export type { IExampleDetailContext };
