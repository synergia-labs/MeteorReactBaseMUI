import React, { createContext } from "react";

interface IInternationalizationContext {}

const InternationalizationContext = createContext<IInternationalizationContext>({} as IInternationalizationContext);
export default InternationalizationContext;
export type { IInternationalizationContext };
