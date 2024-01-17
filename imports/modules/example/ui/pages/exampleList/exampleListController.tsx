import React, {useCallback, useContext} from "react";
import ExampleListView from "./exampleListView";
import { nanoid } from 'nanoid';
import { useNavigate } from "react-router-dom";

interface IExampleListContollerContext {
    onAddButtonClick: () => void;
}

export const ExampleListControllerContext = React.createContext<IExampleListContollerContext>({} as IExampleListContollerContext);

const ExampleListController = () => {
    const navigate = useNavigate();

    const onAddButtonClick = useCallback(() => {
        const newDocumentId = nanoid();
        navigate(`/example/create/${newDocumentId}`);
    }, []);


    return (
        <ExampleListControllerContext.Provider value={{
            onAddButtonClick
        }}>
            <ExampleListView />
        </ExampleListControllerContext.Provider>
    );
};

export default ExampleListController;