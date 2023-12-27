import React from 'react';
import { ExampleListContainer } from './pages/exampleList';
import { ExampleDetailContainer } from './pages/exampleDetail';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { useParams } from 'react-router-dom';

export interface IExampleModuleContext {
    state?: string;
    id?: string;
}

export const ExampleModuleContext = React.createContext<IExampleModuleContext>({});

export default (props: IDefaultContainerProps) => {
    let { screenState, exampleId } = useParams();
    const state = screenState ?? props.screenState;
    const id = exampleId ?? props.id;

    const validState = ['view', 'edit', 'create'];


    const renderPage = () => {
        if(!!!state || !validState.includes(state)) {
            return <ExampleListContainer />;
        }
        if(!!!id) {
            return <ExampleDetailContainer
                {...props}
                screenState={state}
                id={id}
                {...{ create: true }}
            />
        }
        if(state === 'view') {
            return <ExampleDetailContainer {...props} screenState={state} id={id} />;
        }
        if(state === 'edit') {
            return <ExampleDetailContainer
                {...props}
                screenState={state}
                id={id}
                {...{ edit: true }}
            />;
        }
    }

    const providerValue = {
        state,
        id
    }
    return (
        <ExampleModuleContext.Provider value={providerValue}>
            {renderPage()}
        </ExampleModuleContext.Provider>
    );

};
