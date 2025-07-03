import React, { useCallback, useContext, useEffect, useState } from "react";
import Context, { IUsersDetailContext } from "./usersDetail.context";
import UserDetailView from "./usersDetail.view";
import { IOption } from "../../../../../components/InterfaceBaseSimpleFormComponent";
import securityApi from "../../../../../services/security/security.api";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import { IUserDetailFrontSchema } from "./usersDetail.schema";
import usersApi from "../../api";
import { CreateUserType } from "../../../common/types/createUser";

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
			if (error) return showNotification({ type: "error", error });
			const roles = result.map((role) => ({ label: role, value: role }));
			setRoles(roles);
		});
	}, []);

	const handleSubmit = useCallback((doc: IUserDetailFrontSchema) => {
		setLoadingRequest(true);
		const user: CreateUserType = {
			email: doc.email,
			password: doc.password,
			profile: {
				name: doc.name,
				roles: [doc.roles]
			}
		};
		usersApi.createUser(user, (error, _) => {
			setLoadingRequest(false);
			if (error) return showNotification({ type: "error", error });
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
