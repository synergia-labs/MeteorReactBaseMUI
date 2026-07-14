import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import AniversarioListView from './aniversarioListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '/imports/typings/ISchema';
import { IAniversario } from '../../api/aniversarioSch';
import { aniversarioApi } from '../../api/aniversarioApi';
import { escapeRegExp } from '/imports/libs/escapeRegExp';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IAniversarioListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	aniversarioList: IAniversario[];
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AniversarioListControllerContext = React.createContext<IAniversarioListContollerContext>(
	{} as IAniversarioListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'createdat', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false
};

const AniversarioListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	useEffect(
		() => () => {
			if (searchTimer.current) clearTimeout(searchTimer.current);
		},
		[]
	);

	const { name, birthday, delivery } = aniversarioApi.getSchema();
	const aniversarioSchReduzido = { birthday, name, delivery };
	const navigate = useNavigate();

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const { loading, aniversarios } = useTracker(() => {
		const subHandle = aniversarioApi.subscribe('aniversarioList', filter, {
			sort
		});
		const aniversarios = subHandle?.ready() ? aniversarioApi.find(filter, { sort }).fetch() : [];
		return {
			aniversarios,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : aniversarios.length
		};
	}, [config]);

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/aniversario/create/${newDocumentId}`);
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		aniversarioApi.remove(row);
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (searchTimer.current) clearTimeout(searchTimer.current);
		searchTimer.current = setTimeout(() => {
			const search = value.trim().slice(0, 100);
			setConfig((prev) => ({
				...prev,
				filter: search ? { ...prev.filter, name: { $regex: escapeRegExp(search), $options: 'i' } } : {}
			}));
		}, 400);
	}, []);

	const onSelectedCategory = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (!value) {
			setConfig((prev) => ({
				...prev,
				filter: {
					...prev.filter,
					type: { $ne: null }
				}
			}));
			return;
		}
		setConfig((prev) => ({ ...prev, filter: { ...prev.filter, type: value } }));
	}, []);

	const providerValues: IAniversarioListContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onDeleteButtonClick,
			aniversarioList: aniversarios,
			schema: aniversarioSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory
		}),
		[aniversarios, loading]
	);

	return (
		<AniversarioListControllerContext.Provider value={providerValues}>
			<AniversarioListView />
		</AniversarioListControllerContext.Provider>
	);
};

export default AniversarioListController;
