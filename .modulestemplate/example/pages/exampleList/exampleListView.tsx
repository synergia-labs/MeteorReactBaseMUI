import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import AddIcon from '@mui/icons-material/Add';
import { ExampleListControllerContext } from './exampleListController';
import { useNavigate } from 'react-router-dom';
import { ComplexTable } from '/imports/ui/components/ComplexTable/ComplexTable';
import DeleteDialog from '/imports/ui/appComponents/SysDialog/custom/deleteDialog/deleteDialog';
import { SysAppLayoutContext } from '/imports/app/AppLayout';
import ExampleListStyles from './exampleListStyles';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import { SysSelectField } from '/imports/ui/components/sysFormFields/sysSelectField/sysSelectField';
import SearchIcon from '@mui/icons-material/Search';

const ExampleListView = () => {
	const controller = React.useContext(ExampleListControllerContext);
	const sysLayoutContext = React.useContext(SysAppLayoutContext);
	const navigate = useNavigate();

	const options = [{ value: '', label: 'Nenhum' }, ...(controller.schema.type.options?.() ?? [])];

	return (
		<ExampleListStyles.container>
			<Typography variant="h5">Lista de Itens</Typography>
			<ExampleListStyles.searchContainer>
				<SysTextField
					name="search"
					placeholder="Pesquisar por nome"
					onChange={controller.onChangeTextField}
					startAdornment={<SearchIcon />}
				/>
				<SysSelectField
					name="Category"
					label="Categoria"
					options={options}
					placeholder="Selecionar"
					onChange={controller.onChangeCategory}
				/>
			</ExampleListStyles.searchContainer>
			{controller.loading ? (
				<ExampleListStyles.loadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</ExampleListStyles.loadingContainer>
			) : (
				<Box sx={{ width: '100%' }}>
					<ComplexTable
						data={controller.todoList}
						schema={controller.schema}
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
									controller.onDeleteButtonClick(row);
									sysLayoutContext.showNotification({
										message: 'Excluído com sucesso!'
									});
								}
							});
						}}
					/>
				</Box>
			)}

			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<AddIcon />}
				fixed={true}
				onClick={controller.onAddButtonClick}
			/>
		</ExampleListStyles.container>
	);
};

export default ExampleListView;
