import React, {useCallback, useEffect} from "react";
import ExampleListView from "./exampleListView";
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { ISchema } from "/imports/typings/ISchema";
import { IExample } from "../../api/exampleSch";
import { exampleApi } from "../../api/exampleApi";

interface IInitialConfig {
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}

interface IExampleListContollerContext {
    onAddButtonClick: () => void;
    todoList: IExample[];
    schema: ISchema<any>;

}

export const ExampleListControllerContext = React.createContext<IExampleListContollerContext>({} as IExampleListContollerContext);

const initialConfig = {
    sortProperties: { field: 'createdat', sortAscending: true },
    filter: {},
    searchBy: null,
    viewComplexTable: false
};

const ExampleListController = () => {
    const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
    const {title, audio, image, description, type, typeMulti, createdby, ...resto} = exampleApi.getSchema();
    const exampleSchReduzido = { title, description, type, typeMulti, nomeUsuario: { type: String, label: 'Criado por' } };
    const navigate = useNavigate();
    const { sortProperties, filter } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};

    const { loading, examples } = useTracker(() => {
		const subHandle = exampleApi.subscribe('exampleList', filter, {
			sort,
		});
		const examples = subHandle?.ready() ? exampleApi.find(filter, { sort }).fetch() : [];
		return {
			examples,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : examples.length,

		};
	});

    const onAddButtonClick = useCallback(() => {
        const newDocumentId = nanoid();
        navigate(`/example/create/${newDocumentId}`);
    }, []);


    return (
        <ExampleListControllerContext.Provider value={{
            onAddButtonClick,
            todoList: examples,
            schema: exampleSchReduzido,

        }}>
            <ExampleListView />
        </ExampleListControllerContext.Provider>
    );
};

export default ExampleListController;