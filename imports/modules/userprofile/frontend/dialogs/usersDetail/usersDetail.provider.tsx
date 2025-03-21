import React, { useContext, useEffect, useState } from "react";
import Context, { IUsersDetailContext } from "./usersDetail.context";
import UserDetailView from "./usersDetail.view";
import { IOption } from "/imports/ui/components/InterfaceBaseSimpleFormComponent";
import securityApi from "/imports/base/services/security/security.api";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";

interface IUserDetailModalProps {
	userId?: string;
	userRoles?: Array<IOption>;
}

const UserDetailModal: React.FC<IUserDetailModalProps> = ({ userId, userRoles }) => {
	const { showNotification } = useContext(AppLayoutContext);
	const [roles, setRoles] = useState<Array<IOption> | undefined>(userRoles);
	const [loadingData, setLoadingData] = useState<boolean>(false);

	useEffect(() => {
		if (!!userRoles && userRoles.length != 0) return;
		setLoadingData(true);
		securityApi.getRolesListNames(undefined, (error, result) => {
			setLoadingData(false);
			if (error)
				return showNotification({
					type: "error",
					title: "Erro ao buscar perfis de usuário",
					message: `Um erro ocorreu ao buscar os perfis de usuário: ${error}`
				});
			const roles = result.map((role) => ({ label: role, value: role }));
			setRoles(roles);
		});
	}, []);

	const contextValues: IUsersDetailContext = {
		state: userId ? "edit" : "create",
		userRoles: roles,
		loadingData: loadingData
	};

	return (
		<Context.Provider value={contextValues}>
			<UserDetailView />
		</Context.Provider>
	);
};

export default UserDetailModal;
