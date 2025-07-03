import React, { useCallback, useContext, useEffect, useState } from "react";
import UserListView from "./usersList.view";
import Context, { IUsersListContext } from "./usersList.context";
import securityApi from "../../../../../../services/security/security.api";
import { IOption } from "../../../../../../components/InterfaceBaseSimpleFormComponent";
import AppLayoutContext from "/imports/app/appLayoutProvider/appLayoutContext";
import UserDetailModal from "../../../dialogs/usersDetail/usersDetail.provider";
import usersApi from "../../../api";
import useSubscribe from "/imports/hooks/usePublication";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";
import { debounce } from "lodash";
import { hasValue } from "/imports/libs/hasValue";
import AuthContext from "/imports/app/authProvider/authContext";
import { Meteor } from "meteor/meteor";

const UsersListProvider: React.FC = () => {
	const { showNotification, showModal } = useContext(AppLayoutContext);
	const { user } = useContext(AuthContext);
	const [searchText, setSearchText] = useState<string>("");
	const [selectedRole, setSelectedRole] = useState<enumUserRoles | undefined>();
	const [roles, setRoles] = useState<Array<IOption>>([]);
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);
	const [totalUsers, setTotalUsers] = useState<number>(0);
	const [usersList, setUsersList] = useState<Array<Partial<Meteor.User>>>([]);

	const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const openDetail = useCallback(
		(_userId?: string) => {
			showModal({
				children: <UserDetailModal userRoles={roles} />
			});
		},
		[roles]
	);
	const handleSearch = useCallback(
		debounce((text: string) => {
			setSearchText(text);
			if (page > 0) setPage(0);
		}, 500),
		[page]
	);

	const handleSetSelectedRole = useCallback(
		(role: enumUserRoles | undefined) => {
			setSelectedRole(role);
			if (page > 0) setPage(0);
		},
		[page]
	);

	useEffect(() => {
		securityApi.getRolesListNames(undefined, (error, result) => {
			if (error) return showNotification({ type: "error", error });
			const roles = result.map((role) => ({ label: role, value: role }));
			setRoles(roles);
		});
	}, []);

	useEffect(() => {
		usersApi.countUsers(
			{
				name: searchText,
				roles: hasValue(selectedRole) ? [selectedRole as string] : undefined
			},
			(error, result) => {
				if (error) return showNotification({ type: "error", error });
				setTotalUsers(result);
			}
		);
	}, [rowsPerPage, searchText, selectedRole]);

	const { loading, error } = useSubscribe<typeof usersApi.getUsersListPublication, Array<Partial<Meteor.User>>>({
		method: usersApi.getUsersListPublication,
		param: {
			name: searchText,
			role: hasValue(selectedRole) ? selectedRole : undefined
		},
		options: {
			limit: page == 0 ? rowsPerPage - 1 : rowsPerPage,
			skip: page * rowsPerPage
		},
		callBack: (_, result) => {
			if (!result) return;
			const userIndex = result.findIndex((item) => item._id === user?._id);
			if (userIndex > -1) {
				const userItem = result[userIndex];
				result.splice(userIndex, 1);
				result.unshift(userItem);
			}

			setUsersList(result);
		},
		findFunction: () =>
			usersApi.mongoInstance.find(page == 0 ? {} : { _id: { $ne: user?._id } }, { sort: { "profile.name": 1 } }).fetch()
	});

	if (error) showNotification({ type: "error", error });

	const contextValues: IUsersListContext = {
		userRoles: roles,
		userList: usersList || [],
		loading: loading,
		page: page,
		rowsPerPage: rowsPerPage,
		setSearchText: handleSearch,
		totalUsers: totalUsers,
		openDetail: openDetail,
		changePage: handleChangePage,
		changeRowsPerPage: handleChangeRowsPerPage,
		setSelectedRole: handleSetSelectedRole
	};

	return (
		<Context.Provider value={contextValues}>
			<UserListView />
		</Context.Provider>
	);
};

export default UsersListProvider;
