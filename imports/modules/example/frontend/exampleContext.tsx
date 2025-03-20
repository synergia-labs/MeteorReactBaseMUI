import React, { createContext } from 'react';
import EnumExampleScreenState from '../common/enums/enumScreenState';

interface IExampleModuleContext {
	state?: EnumExampleScreenState;
	id?: string;
}

const ExampleModuleContext = createContext<IExampleModuleContext>({});

export default ExampleModuleContext;
export type { IExampleModuleContext };
