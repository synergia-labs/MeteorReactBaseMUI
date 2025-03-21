import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Styles from "./exampleListStyles";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import Context, { IExampleListContext } from "./exampleListContext";
import enumExampleScreenState from "../../../common/enums/enumScreenState";
import ToolTip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { SysFab } from "/imports/ui/components/sysFab/sysFab";
import exampleApi from "../../api/api";

const ExampleListView: React.FC = () => {
	const context = useContext<IExampleListContext>(Context);

	return (
		<Styles.container>
			<Typography variant="h5">Lista de itens</Typography>
			<ToolTip title="Adicionar dados de exemplos" placement="right">
				<IconButton sx={{ mb: 1 }} onClick={() => exampleApi.fillDatabaseWithFakeData(undefined, (_, __) => {})}>
					<SysIcon name="contract" />
				</IconButton>
			</ToolTip>
			{/* <Styles.filterContainer>
				<SysTextField 
					name='filterTaskName'
					placeholder="Pesquisar por nome"
					startAdornment={<SysIcon name={'search'} />}
					sxMap={{ container: { width: '300px' }}}
					onChange={(e) => context.onChangeTextField(e.target.value)}
				/>
				<SysSelectField 
					name="Category"
					label="Filtrar por categoria"
					options={type?.options?.()}
					placeholder="Selecionar"
					sxMap={{ container: { width: '300px' } }}
					onChange={(e) => context.onChangeCategory(e.target.value)}
				/>
				
			</Styles.filterContainer>
			<ComplexTable
				data={context.todoList}
				schema={exampleSchReduzido}
				loading={context.loading}
				onRowClick={(row) => context.navigateToDetail(enumExampleScreenState.VIEW, row?.id as string)}
				onEdit={(row: any ) => context.navigateToDetail(enumExampleScreenState.EDIT, row?._id)}
				onDelete={(row: any) => {
					DeleteDialog({
						showDialog: showDialog,
						closeDialog: closeDialog,
						title: `Excluir dado ${row.title}`,
						message: `Tem certeza que deseja excluir o arquivo ${row.title}?`,
						onDeleteConfirm: () => context.deleteTask(row._id)
					});
				}}
				onPaginationModelChange={context.setPaginationProps}
				paginationModel={context.paginationProps}
				rowCount={context.totalDocuments}
			/> */}
			<SysFab
				variant="extended"
				text="Adicionar"
				startIcon={<SysIcon name={"add"} />}
				fixed={true}
				onClick={() => context.navigateToDetail(enumExampleScreenState.CREATE)}
			/>
		</Styles.container>
	);
};

export default ExampleListView;
