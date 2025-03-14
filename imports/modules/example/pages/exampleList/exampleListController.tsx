import React, { useCallback, useContext, useMemo } from 'react';
import ExampleListView from './exampleListView';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ISchema } from '../../../../typings/ISchema';
import { IExample } from '../../api/exampleSch';
import { exampleApi } from '../../api/exampleApi';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IExampleListContollerContext {
	onAddButtonClick: () => void;
	onDeleteButtonClick: (row: any) => void;
	todoList: IExample[];
	schema: ISchema<any>;
	loading: boolean;
	onChangeTextField: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onChangeCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onAddItemClick: () => void;
	onEditTasksClick: () => void;
}

export const ExampleListControllerContext = React.createContext<IExampleListContollerContext>(
	{} as IExampleListContollerContext
);

const initialConfig = {
	sortProperties: { field: 'title', sortAscending: true },
	filter: {},
	searchBy: null,
	viewComplexTable: false
};

const ExampleListController = () => {
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { showNotification } = useContext(AppLayoutContext);

	const { title, type, typeMulti } = exampleApi.getSchema();
	const exampleSchReduzido = { title, type, typeMulti, createdat: { type: Date, label: 'Criado em' } };
	const navigate = useNavigate();

	const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

	const { loading, examples } = useTracker(() => {
		const subHandle = exampleApi.subscribe('exampleList', filter, {
			sort
		});

		const examples = subHandle?.ready() ? exampleApi.find(filter, { sort }).fetch() : [];
		return {
			examples,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : examples.length
		};
	}, [config]);

	const onAddButtonClick = useCallback(() => {
		const newDocumentId = nanoid();
		navigate(`/example/create/${newDocumentId}`);
	}, []);

	const onDeleteButtonClick = useCallback((row: any) => {
		exampleApi.remove(row);
	}, []);

	const onChangeTextField = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const delayedSearch = setTimeout(() => {
			setConfig((prev) => ({
				...prev,
				filter: { ...prev.filter, title: { $regex: value.trim(), $options: 'i' } }
			}));
		}, 1000);
		return () => clearTimeout(delayedSearch);
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

	const onAddItemClick = () => {
		exampleApi.fillDatabae(10, (error, result) => {
			if(error) return showNotification({
				type: 'error',
				title: "Não foi possível adicionar os itens",
				message: `Erro: ${error}` 
			});
			showNotification({
				type: 'success',
				title: "Itens adicionados com sucesso",
				message: `Foram adicionados os seguintes itens: ${result.map(item => item).join(', ')}`
			})
		});
	};

	const onEditTasksClick = () => {
		exampleApi.editTasks("Teste", (error) => {
			if(error) return showNotification({
				type: 'error',
				title: "Não foi possível editar as tarefas",
				message: `Erro: ${error}`
			});
			showNotification({
				type: 'success',
				title: "Tarefas editadas com sucesso",
				message: "Todas as tarefas foram editadas com sucesso"
			})
		})
	};

	const providerValues: IExampleListContollerContext = useMemo(
		() => ({
			onAddButtonClick,
			onDeleteButtonClick,
			todoList: examples,
			schema: exampleSchReduzido,
			loading,
			onChangeTextField,
			onChangeCategory: onSelectedCategory,
			onAddItemClick,
			onEditTasksClick
		}),
		[examples, loading]
	);

	return (
		<ExampleListControllerContext.Provider value={providerValues}>
			<ExampleListView />
		</ExampleListControllerContext.Provider>
	);
};

export default ExampleListController;
