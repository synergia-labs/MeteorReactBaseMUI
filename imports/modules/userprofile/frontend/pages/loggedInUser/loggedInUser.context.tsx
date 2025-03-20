import React, { createContext } from "react";

interface ILoggedInUserContext {}

const loggedInUserContext = createContext<ILoggedInUserContext>({} as ILoggedInUserContext);
export default loggedInUserContext;
export type { ILoggedInUserContext };
