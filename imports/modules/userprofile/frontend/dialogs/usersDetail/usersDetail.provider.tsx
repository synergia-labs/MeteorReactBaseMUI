import React, { useCallback, useContext, useEffect, useState } from "react";
import Context, { IUsersDetailContext } from "./usersDetail.context";
import UserDetailView from "./usersDetail.view";
import { IOption } from "/imports/ui/components/InterfaceBaseSimpleFormComponent";
import securityApi from "../../../../../services/security/security.api";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { IUserDetailFrontSchema } from "./usersDetail.schema";
import usersApi from "../../api/api";

interface IUserDetailModalProps {
	userId?: string;
	userRoles?: Array<IOption>;
}

const UserDetailModal: React.FC<IUserDetailModalProps> = ({ userId, userRoles }) => {
	const { showNotification, closeModal } = useContext(AppLayoutContext);
	const [roles, setRoles] = useState<Array<IOption> | undefined>(userRoles);
	const [loadingData, setLoadingData] = useState<boolean>(false);
	const [loadingRequest, setLoadingRequest] = useState<boolean>(false);

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

	const handleSubmit = useCallback((doc: IUserDetailFrontSchema) => {
		setLoadingRequest(true);
		usersApi.create({ ...doc, roles: [doc.roles] }, (error, _) => {
			setLoadingRequest(false);
			if (error)
				return showNotification({
					type: "error",
					title: "Erro ao salvar usuário",
					message: `Um erro ocorreu ao salvar o usuário: ${error}`
				});
			showNotification({
				type: "success",
				title: "Usuário salvo",
				message: `O usuário ${doc.name} foi salvo com sucesso.`
			});
			closeModal();
		});
	}, []);

	const handleCloseModal = useCallback(() => closeModal(), [closeModal]);

	const contextValues: IUsersDetailContext = {
		state: userId ? "edit" : "create",
		userRoles: roles,
		loadingData: loadingData,
		loadingRequest: loadingRequest,
		onSubmit: handleSubmit,
		closeModal: handleCloseModal
	};

	return (
		<Context.Provider value={contextValues}>
			<UserDetailView />
		</Context.Provider>
	);
};

export default UserDetailModal;
