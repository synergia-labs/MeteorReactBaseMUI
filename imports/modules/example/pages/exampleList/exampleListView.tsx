import React from "react";
import {Box, TablePagination, Typography} from "@mui/material";
import { ExampleListViewStyledContainer } from "./exampleListStyles";
import { SysFab } from "/imports/ui/components/sysFab/sysFab";
import AddIcon from '@mui/icons-material/Add';
import { ExampleListControllerContext } from "./exampleListController";
import { useNavigate } from "react-router-dom";
import { ComplexTable } from "/imports/ui/components/ComplexTable/ComplexTable";
import DeleteDialog from "/imports/ui/appComponents/SysDialog/custom/deleteDialog/deleteDialog";
import { SysAppLayoutContext } from "/imports/app/AppLayout";


const ExampleListView = () => {
    const exampleListViewContext = React.useContext(ExampleListControllerContext);
    const sysLayoutContext = React.useContext(SysAppLayoutContext);
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
                    onDelete={(row) => {
                        DeleteDialog({
                            showDialog: sysLayoutContext.showDialog,
                            closeDialog: sysLayoutContext.closeDialog,
                            title: `Excluir dado ${row.title}`,
                            message: `Tem certeza que deseja excluir o arquivo ${row.title}?`,
                            onDeleteConfirm: () => {
                                exampleListViewContext.onDeleteButtonClick(row);
                                sysLayoutContext.showNotification({
                                    message: 'Excluído com sucesso!',
                                });
                            }
                        });

                    }}
				/>

        </ExampleListViewStyledContainer>
    );
}

export default ExampleListView;