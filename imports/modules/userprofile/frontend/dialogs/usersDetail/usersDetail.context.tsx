import React, { createContext } from "react";
import { IOption } from "../../../../../components/InterfaceBaseSimpleFormComponent";
import { IUserDetailFrontSchema } from "./usersDetail.schema";

interface IUsersDetailContext {
	state: "create" | "edit";
	userRoles?: Array<IOption>;
	loadingData: boolean;
	loadingRequest: boolean;
	onSubmit?: (doc: IUserDetailFrontSchema) => void;
	closeModal?: () => void;
}

const usersDetailContext = createContext<IUsersDetailContext>({} as IUsersDetailContext);

export default usersDetailContext;
export type { IUsersDetailContext };
