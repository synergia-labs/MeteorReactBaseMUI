import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import UserProfileListView from './userProfileListView';
import { IUserProfile } from '../../api/userProfileSch';
import { useTracker } from 'meteor/react-meteor-data';
import { userprofileApi } from '../../api/userProfileApi';
import { IMeteorError } from '../../../../typings/BoilerplateDefaultTypings';
import UserProfileDetailController from '../UserProfileDetail/userProfileDetailController';
import { sysSizing } from '../../../../ui/materialui/styles';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';

interface IInitialConfig {
	pageProperties: {
		currentPage: number;
		pageSize: number;
	};
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
}

interface IUserProfileListContollerContext {
	list: IUserProfile[];
	translateStatus: (status: string | undefined) => string;
	onChangeStatusClick: (id: string) => void;
	onSearch: (username: string | undefined) => void;
	onSetFilter: (field: string, value: string | null | undefined) => void;
	onAddButtonClick: () => void;
	onEdit: (id: string) => void;
}

export const UserProfileListControllerContext = createContext<IUserProfileListContollerContext>(
	{} as IUserProfileListContollerContext
);

const initialConfig = {
	pageProperties: {
		currentPage: 1,
		pageSize: 25
	},
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false
};

const UserProfileListController = () => {
	const [config, setConfig] = useState<IInitialConfig>(initialConfig);
	const { showNotification, showDialog } = useContext<IAppLayoutContext>(AppLayoutContext);

	const { sortProperties, filter, pageProperties } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};
	const limit = pageProperties.pageSize;
	const skip = (pageProperties.currentPage - 1) * pageProperties.pageSize;

	const {
		loading,
		userList,
		total
	}: {
		loading: boolean;
		userList: IUserProfile[];
		total: number;
	} = useTracker(() => {
		const searchFilter = config.searchBy ? { username: { $regex: config.searchBy, $options: 'i' } } : {};
		const subHandle = userprofileApi.subscribe(
			'userProfileList',
			{ ...filter, ...searchFilter },
			{
				sort,
				limit,
				skip
			}
		);
		const userList = subHandle?.ready() ? userprofileApi.find({ ...filter, ...searchFilter }, { sort }).fetch() : [];
		return {
			userList,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : userList.length
		};
	}, [config]);

	const translateStatus = useCallback((status = '') => {
		switch (status) {
			case 'active':
				return 'Ativo';
			case 'disabled':
				return 'Desativado';
			default:
				return 'Desativado';
		}
	}, []);

	const onChangeStatusClick = useCallback((id = '') => {
		userprofileApi.changeUserStatus(id, (e: IMeteorError, r: boolean) => {
			if (!e) {
				showNotification({
					type: 'success',
					title: 'Operação realizada!',
					message: `Status alterado com sucesso`
				});
			} else {
				console.error('Error:', e);
				showNotification({
					type: 'warning',
					title: 'Operação não realizada!',
					message: `Erro ao realizar a operação: ${e.reason}`
				});
			}
		});
	}, []);

	const onEdit = useCallback(
		(id: string) => {
			showDialog({
				sx: { borderRadius: sysSizing.radiusMd },
				children: <UserProfileDetailController id={id} mode="edit" />
			});
		},
		[userList]
	);

	const onAddButtonClick = useCallback(() => {
		showDialog({
			sx: { borderRadius: sysSizing.radiusMd },
			children: <UserProfileDetailController id={nanoid()} mode="create" />
		});
	}, [userList]);

	const onSearch = useCallback((username: string | undefined) => {
		const searchUsername = username !== undefined ? username.trim() : '';
		const delayedSearch = setTimeout(() => {
			setConfig((prevConfig) => ({
				...prevConfig,
				searchBy: searchUsername !== '' ? searchUsername : null
			}));
		}, 1000);
		return () => clearTimeout(delayedSearch);
	}, []);

	const onSetFilter = useCallback(
		(field: string, value: string | null | undefined) => {
			setConfig((prevConfig) => ({
				...prevConfig,
				filter: {
					...prevConfig.filter,
					...(value ? { [field]: value } : { [field]: { $ne: null } })
				}
			}));
		},
		[userList]
	);

	const providerValues = useMemo(
		() => ({
			list: userList,
			translateStatus,
			onChangeStatusClick,
			onSearch,
			onSetFilter,
			onAddButtonClick,
			onEdit
		}),
		[userList]
	);

	return (
		<UserProfileListControllerContext.Provider value={providerValues}>
			<UserProfileListView />
		</UserProfileListControllerContext.Provider>
	);
};

export default UserProfileListController;
