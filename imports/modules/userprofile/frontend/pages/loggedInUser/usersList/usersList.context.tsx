import React, { createContext } from "react";
import { IOption } from "/imports/ui/components/InterfaceBaseSimpleFormComponent";
import { GetUsersListReturnType } from "/imports/modules/userprofile/common/types/getUsersList";

interface IUsersListContext {
	userRoles: Array<IOption>;
	userList: Array<GetUsersListReturnType>;
	loading: boolean;

	openDetail: (_userId?: string) => void;
}

const usersListContext = createContext<IUsersListContext>({} as IUsersListContext);
export default usersListContext;
export type { IUsersListContext };
