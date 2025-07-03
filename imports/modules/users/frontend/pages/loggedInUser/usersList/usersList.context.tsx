import React, { createContext } from "react";
import { IOption } from "../../../../../../components/InterfaceBaseSimpleFormComponent";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";
import { Meteor } from "meteor/meteor";

interface IUsersListContext {
	userRoles: Array<IOption>;
	userList: Array<Partial<Meteor.User>>;
	loading: boolean;
	page: number;
	rowsPerPage: number;
	totalUsers: number;
	changePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
	changeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	setSearchText: (text: string) => void;
	setSelectedRole: (role: enumUserRoles | undefined) => void;
	openDetail: (_userId?: string) => void;
}

const usersListContext = createContext<IUsersListContext>({} as IUsersListContext);
export default usersListContext;
export type { IUsersListContext };
