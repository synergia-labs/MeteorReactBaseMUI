import React, { createContext } from "react";
import enumExampleScreenState from "../common/enums/enumScreenState";

interface IExampleModuleContext {
	state?: enumExampleScreenState;
	id?: string;
}

const ExampleModuleContext = createContext<IExampleModuleContext>({});

export default ExampleModuleContext;
export type { IExampleModuleContext };
