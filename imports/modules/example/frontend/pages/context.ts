import React, { createContext } from "react";

interface IExampleModuleContext {}

const ExampleModuleContext = createContext<IExampleModuleContext>({});

export default ExampleModuleContext;
export type { IExampleModuleContext };
