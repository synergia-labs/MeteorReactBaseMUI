import React, { createContext } from "react";

interface IModuleContext {}

const ModuleContext = createContext<IModuleContext>({});

export default ModuleContext;
export type { IModuleContext };
