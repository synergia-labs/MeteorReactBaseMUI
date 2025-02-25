import React, { createContext } from 'react';
import EnumExampleScreenState from './config/enumExampleScreenState';

interface IExampleModuleContext {
    state?: EnumExampleScreenState;
    id?: string;
}

const ExampleModuleContext = createContext<IExampleModuleContext>({});

export default ExampleModuleContext;
export type { IExampleModuleContext };