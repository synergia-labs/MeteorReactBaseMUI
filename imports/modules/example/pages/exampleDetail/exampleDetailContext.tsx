import React, { createContext } from 'react';
import { IExample } from '../../api/exampleSch';

interface IExampleDetailContext{
    document?: Partial<IExample>;
    loading: boolean;

    closePage: () => void;
    navigateToEdit: () => void;
    onSubmit: (doc: Partial<IExample>) => void; 
}

const ExampleDetailContext = createContext<IExampleDetailContext>({} as IExampleDetailContext);
export default ExampleDetailContext;
export type {IExampleDetailContext};