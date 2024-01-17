import React, {useCallback, useContext} from "react";
import ExampleDetailView from "./exampleDetailView";
import { useNavigate } from "react-router-dom";
import { ExampleModuleContext } from "../../exampleContainer";
import { useTracker } from "meteor/react-meteor-data";
import { exampleApi } from "../../../api/exampleApi";
import { IExample } from "../../../api/exampleSch";
import { ISchema } from "/imports/typings/ISchema";
import { IDoc } from "/imports/typings/IDoc";

interface IExampleDetailContollerContext {
    closePage: () => void;
    document: IExample;
    screenState?: string;
    loading: boolean;
    schema: ISchema<IExample>;
    onSubmit: (doc: IExample) => void;
}

export const ExampleDetailControllerContext = React.createContext<IExampleDetailContollerContext>({} as IExampleDetailContollerContext);

const ExampleDetailController = () => {
    const navigate = useNavigate();
    const exampleContext = useContext(ExampleModuleContext);

    const {document, loading}  = useTracker(() => {
        const {id} = exampleContext;
        const subHandle = !!id ? exampleApi.subscribe('exampleDetail', { _id: id }) : null;
	    const document = id && subHandle?.ready() ? exampleApi.findOne({ _id: id }) : {};
        return {
            document: document as IExample ?? {_id : id} as IExample,
            loading: !!subHandle && !subHandle?.ready()
        };
    }, []);
    

    const closePage = useCallback(() => {
        navigate(-1);
    }, []);

    const onSubmit = useCallback((doc: IExample) => {
        console.log(doc);
    }, []);
    
    return (
        <ExampleDetailControllerContext.Provider value={{
            closePage,
            document,
            screenState: exampleContext.state,
            loading,
            schema: exampleApi.getSchema(),
            onSubmit
        }}>
            {loading ? <h1>Carregando...</h1> : <ExampleDetailView />}
        </ExampleDetailControllerContext.Provider>
    );
};

export default ExampleDetailController;