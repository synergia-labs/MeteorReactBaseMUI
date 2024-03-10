import React from "react";
import {Box, Typography} from "@mui/material";
import { ExampleListViewStyledContainer } from "./exampleListStyles";
import { SysFab } from "/imports/ui/components/sysFab/sysFab";
import AddIcon from '@mui/icons-material/Add';
import { ExampleListControllerContext } from "./exampleListController";

const ExampleListView = () => {
    const exampleListViewContext = React.useContext(ExampleListControllerContext);
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

            {JSON.stringify(exampleListViewContext.todoList)}
        </ExampleListViewStyledContainer>
    );
}

export default ExampleListView;