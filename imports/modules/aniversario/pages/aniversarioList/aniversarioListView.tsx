import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SysFab } from '/imports/ui/components/sysFab/sysFab';
import { AniversarioListControllerContext } from './aniversarioListController';
import { useNavigate } from 'react-router-dom';
import { ComplexTable } from '/imports/ui/components/ComplexTable/ComplexTable';
import DeleteDialog from '/imports/ui/appComponents/showDialog/custom/deleteDialog/deleteDialog';
import AniversarioListStyles from './aniversarioListStyles';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';


const AniversarioListView = () => {
	const controller = useContext(AniversarioListControllerContext);
	const sysLayoutContext = useContext<IAppLayoutContext>(AppLayoutContext);
	const navigate = useNavigate();
  const {
    Container,
    LoadingContainer,
    SearchContainer
  } = AniversarioListStyles;

	return (
		<Container>
			<Typography variant="h5">Lista de Aniversários</Typography>
			<SearchContainer>
				<SysTextField
					name="search"
					placeholder="Pesquisar por nome"
					onChange={controller.onChangeTextField}
					startAdornment={<SysIcon name={'search'} />}
				/>
			</SearchContainer>
			{controller.loading ? (
				<LoadingContainer>
					<CircularProgress />
					<Typography variant="body1">Aguarde, carregando informações...</Typography>
				</LoadingContainer>
			) : (
				<Box sx={{ width: '100%' }}>
					<ComplexTable
						data={controller.aniversarioList}
						schema={controller.schema}
						onRowClick={(row) => navigate('/aniversario/view/' + row.id)}
						searchPlaceholder={'Pesquisar aniversario'}
						onEdit={(row) => navigate('/aniversario/edit/' + row._id)}
						onDelete={(row) => {
							DeleteDialog({
								showDialog: sysLayoutContext.showDialog,
								closeDialog: sysLayoutContext.closeDialog,
								title: `Excluir dado ${row.title}`,
								message: `Tem certeza que deseja excluir o item ${row.title}?`,
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
				startIcon={<SysIcon name={'add'} />}
				fixed={true}
				onClick={controller.onAddButtonClick}
			/>
		</Container>
	);
};

export default AniversarioListView;
