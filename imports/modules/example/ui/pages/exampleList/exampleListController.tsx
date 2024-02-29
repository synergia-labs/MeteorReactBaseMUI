import React, {useCallback, useEffect} from "react";
import ExampleListView from "./exampleListView";
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { exampleApi } from "../../../api/exampleApi";
import { IExample } from "../../../api/exampleSch";

interface IInitialConfig {
	pageProperties: {
		currentPage: number;
		pageSize: number;
	};
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IExampleListContollerContext {
    onAddButtonClick: () => void;
    todoList: IExample[];
}

export const ExampleListControllerContext = React.createContext<IExampleListContollerContext>({} as IExampleListContollerContext);

const initialConfig = {
    pageProperties: {
        currentPage: 1,
        pageSize: 25
    },
    sortProperties: { field: 'createdat', sortAscending: true },
    filter: {title: 'Teste 02'},
    searchBy: null,
    viewComplexTable: false
};

const ExampleListController = () => {
    const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);

    const navigate = useNavigate();
    const { sortProperties, filter, pageProperties } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};
	const limit = pageProperties.pageSize;
	const skip = (pageProperties.currentPage - 1) * pageProperties.pageSize;

    const { loading, examples, total } = useTracker(() => {
		const subHandle = exampleApi.subscribe('exampleList', filter, {
			sort,
			limit,
			skip
		});
		const examples = subHandle?.ready() ? exampleApi.find(filter, { sort }).fetch() : [];
		return {
			examples,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : examples.length
		};
	});

    const onAddButtonClick = useCallback(() => {
        const newDocumentId = nanoid();
        navigate(`/example/create/${newDocumentId}`);
    }, []);


    return (
        <ExampleListControllerContext.Provider value={{
            onAddButtonClick,
            todoList: examples
        }}>
            <ExampleListView />
        </ExampleListControllerContext.Provider>
    );
};

export default ExampleListController;