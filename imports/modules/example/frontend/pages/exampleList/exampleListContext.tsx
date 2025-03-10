import React, { createContext } from 'react';
import { IExample } from '../../api/exampleSch';
import { ISchema } from '/imports/typings/ISchema';
import EnumExampleScreenState from '../../../common/enums/enumScreenState';
import { GridPaginationModel } from '@mui/x-data-grid';

interface IExampleListContext {
    todoList: Array<IExample>;
    loading: boolean;
    schema: ISchema<IExample>;
    totalDocuments: number;
    paginationProps: GridPaginationModel;   
    onChangeTextField: (value: string) => void;
    onChangeCategory: (value: string) => void;
    navigateToDetail: (state: EnumExampleScreenState, id?: string) => void;
    deleteTask: (id?: string) => void;
    fillWithFakeData: () => void;
    setPaginationProps: React.Dispatch<React.SetStateAction<GridPaginationModel>>;
};

const ExampleListContext = createContext<IExampleListContext>({} as IExampleListContext);
export default ExampleListContext;
export type { IExampleListContext };