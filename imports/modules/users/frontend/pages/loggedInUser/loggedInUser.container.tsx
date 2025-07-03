import React, { ReactNode } from "react";
import Context, { ILoggedInUserContext } from "./loggedInUser.context";
import enumUsersRegisterMethods from "../../../common/enums/enumRegisterMethods";
import { SecurityProvider } from "/imports/services/security/frontend/security.provider";

interface ILoggedInUserContainerProps {
	children?: ReactNode;
}

const LoggedInUserContainer: React.FC<ILoggedInUserContainerProps> = ({ children }) => {
	const contextValues: ILoggedInUserContext = {};

	const functionalities: Array<string> = [
		enumUsersRegisterMethods.createUser,
		enumUsersRegisterMethods.getUserBySimilarity
	];

	return (
		<SecurityProvider functionality={functionalities} module={"users"}>
			<Context.Provider value={contextValues}>{children}</Context.Provider>
		</SecurityProvider>
	);
};

export default LoggedInUserContainer;
