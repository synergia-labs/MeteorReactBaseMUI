import React, { createContext } from "react";
import { IOption } from "/imports/ui/components/InterfaceBaseSimpleFormComponent";

interface IUsersDetailContext {
	state: "create" | "edit";
	userRoles?: Array<IOption>;
	loadingData: boolean;
}

const usersDetailContext = createContext<IUsersDetailContext>({} as IUsersDetailContext);

export default usersDetailContext;
export type { IUsersDetailContext };
