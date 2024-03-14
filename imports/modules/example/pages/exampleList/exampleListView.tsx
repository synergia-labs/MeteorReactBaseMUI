import React from "react";
import {Box, TablePagination, Typography} from "@mui/material";
import { ExampleListViewStyledContainer } from "./exampleListStyles";
import { SysFab } from "/imports/ui/components/sysFab/sysFab";
import AddIcon from '@mui/icons-material/Add';
import { ExampleListControllerContext } from "./exampleListController";
import { useNavigate } from "react-router-dom";
import { ComplexTable } from "/imports/ui/components/ComplexTable/ComplexTable";


const ExampleListView = () => {
    const exampleListViewContext = React.useContext(ExampleListControllerContext);
    const navigate = useNavigate();

    return (
        <ExampleListViewStyledContainer>
            <SysFab 
                variant="extended" 
                text="Adicionar" 
                startIcon={<AddIcon />} 
                fixed={true}
                onClick={exampleListViewContext.onAddButtonClick}
            />
            <Typography variant="h5">Lista de Itens</Typography>

            <ComplexTable
					data={exampleListViewContext.todoList}
					schema={exampleListViewContext.schema}
					onRowClick={(row) => navigate('/example/view/' + row.id)}
					searchPlaceholder={'Pesquisar exemplo'}
                    onEdit={(row) => navigate('/example/edit/' + row._id)}
                    onDelete={() => {}}
				/>

        </ExampleListViewStyledContainer>
    );
}

export default ExampleListView;