import React, { useCallback, useContext, useEffect, useState } from "react";
import UserListView from "./usersList.view";
import Context, { IUsersListContext } from "./usersList.context";
import usersApi from "../../../api/api";
import securityApi from "/imports/base/services/security/security.api";
import { IOption } from "/imports/ui/components/InterfaceBaseSimpleFormComponent";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { GetUsersListReturnType } from "/imports/modules/userprofile/common/types/getUsersList";
import useSubscribe from "/imports/hooks/usePublication";
import UserDetailModal from "../../../dialogs/usersDetail/usersDetail.provider";

const UsersListProvider: React.FC = () => {
	const { showNotification, showModal } = useContext(AppLayoutContext);
	const [roles, setRoles] = useState<Array<IOption>>([]);

	useEffect(() => {
		securityApi.getRolesListNames(undefined, (error, result) => {
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

	const {
		data: usersList,
		loading,
		error
	} = useSubscribe<typeof usersApi.getUsersListPublication, Array<GetUsersListReturnType>>({
		method: usersApi.getUsersListPublication,
		findFunction: () => usersApi.mongoInstance.find({}).fetch() as Array<GetUsersListReturnType>
	});

	if (error)
		showNotification({
			type: "error",
			title: "Erro ao buscar usuários",
			message: `Um erro ocorreu ao buscar os usuários: ${error.reason}`
		});

	const openDetail = useCallback(
		(_userId?: string) => {
			showModal({
				children: <UserDetailModal userRoles={roles} />
			});
		},
		[roles]
	);

	const contextValues: IUsersListContext = {
		userRoles: roles,
		userList: usersList || [],
		loading: loading,
		openDetail: openDetail
	};

	return (
		<Context.Provider value={contextValues}>
			<UserListView />
		</Context.Provider>
	);
};

export default UsersListProvider;
