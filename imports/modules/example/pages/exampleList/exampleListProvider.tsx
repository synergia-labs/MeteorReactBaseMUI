import React, { useCallback, useContext, useState } from 'react';
import Context, { IExampleListContext } from './exampleListContext';
import ExampleListView from './exampleListView';
import { useTracker } from 'meteor/react-meteor-data';
import { exampleApi } from '../../api/exampleApi';
import { hasValue } from '/imports/libs/hasValue';
import { IExample } from '../../api/exampleSch';
import { debounce } from 'lodash';
import { IFilterPublication, IOptionsPublication } from '/imports/typings/IFilterProperties';
import { useNavigate } from 'react-router-dom';
import EnumExampleScreenState from '../../config/enumExampleScreenState';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';
import { GridPaginationModel } from '@mui/x-data-grid';
import { nanoid } from 'nanoid';

const ExampleListProvider: React.FC = () => {
    const { showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);

    const [ filterByNameValue, setFilterByNameValue ] = useState<string>('');
    const [ filterByCategoryValue, setFilterByCategoryValue ] = useState<string>('');
    const [ paginationProps, setPaginationProps ] = useState<GridPaginationModel>({ page: 0, pageSize: 15 });
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ totalDocuments, setTotalDocuments ] = useState<number>(0);
    const [ todoList, setTodoList ] = useState<Array<IExample>>([]);

    const navigate = useNavigate();

    const handleTextFieldChange = useCallback(debounce((value: string) => {
        setFilterByNameValue(prev => {
            if(value.length < 3) 
                if(prev.length > 0) return '';
                else return prev;
            return value;
        });
    }, 500), []);

    const handleCategoryChange = useCallback((value: string) => setFilterByCategoryValue(value), []);

    const navigateToDetail = useCallback((state: EnumExampleScreenState, id?: string) => {
        if((state === EnumExampleScreenState.VIEW || state === EnumExampleScreenState.EDIT) && !hasValue(id)) 
            return showNotification({
                type: 'error',
                title: 'Não foi possível navegar até a página',
                message: 'O id do item não foi informado'
            });

        navigate(`/example/${state}/${id ?? nanoid()}`);
    }, [navigate]);

    const handleDeleteTask = useCallback((id?: string) => {
        exampleApi.remove({ _id: id }, (error) => {
            if(error) return showNotification({
                type: 'error',
                title: 'Erro ao excluir item',
                message: error.message
            });

            showNotification({
                type: 'success',
                title: 'Item excluído',
                message: 'Item excluído com sucesso'
            });
        });
    }, []);

    const fillWithFakeData = useCallback(() => {
        exampleApi.fillDatabaseWithFakeData((error) => {
            if(error) return showNotification({
                type: 'error',
                title: 'Erro ao preencher com dados falsos',
                message: error.message
            });

            showNotification({
                type: 'success',
                title: 'Dados preenchidos',
                message: 'Dados preenchidos com sucesso'
            });
        });
    }, []);

    useTracker(() => {
        const filter: IFilterPublication<IExample> = {
            ...( hasValue(filterByNameValue) && { title: { $regex: filterByNameValue, $options: 'i' } }),
            ...( hasValue(filterByCategoryValue) && { type: filterByCategoryValue })
        };

        const options: IOptionsPublication<IExample> = {
            skip: paginationProps.page * paginationProps.pageSize,
            limit: paginationProps.pageSize 
        };

        setLoading(true);
        const handleSubscribe = exampleApi.subscribe('exampleList', filter, options);
        if(!hasValue(handleSubscribe) || !handleSubscribe?.ready()) return;
        const todoList = exampleApi.find(filter).fetch();
        setLoading(false);
        setTotalDocuments(handleSubscribe.total);
        setTodoList(todoList);
    }, [filterByNameValue, filterByCategoryValue, paginationProps]);


    const contextValues: IExampleListContext = {
        todoList: todoList,
        loading: todoList.length === 0 && loading,
        schema: exampleApi.getSchema(),
        onChangeTextField: handleTextFieldChange,
        totalDocuments: totalDocuments || 100,
        paginationProps: paginationProps,
        onChangeCategory: handleCategoryChange,
        navigateToDetail: navigateToDetail,
        deleteTask: handleDeleteTask,
        fillWithFakeData: fillWithFakeData,
        setPaginationProps: setPaginationProps
    };

    return (
        <Context.Provider value={contextValues}>
            <ExampleListView  />
        </Context.Provider>
    );
}

export default ExampleListProvider;