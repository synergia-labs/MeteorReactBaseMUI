import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Styles from "./exampleListStyles";
import SysTextField from "/imports/ui/components/sysFormFields/sysTextField/sysTextField";
import SysIcon from "/imports/ui/components/sysIcon/sysIcon";
import { SysSelectField } from "/imports/ui/components/sysFormFields/sysSelectField/sysSelectField";
import Context, { IExampleListContext } from "./exampleListContext";
import { ComplexTable } from "/imports/ui/components/ComplexTable/ComplexTable";
import EnumExampleScreenState from "../../../common/enums/enumScreenState";
import AppLayoutContext, { IAppLayoutContext } from "/imports/app/appLayoutProvider/appLayoutContext";
import ToolTip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { SysFab } from "/imports/ui/components/sysFab/sysFab";
import exampleApi from "../../api/api";

const ExampleListView: React.FC = () => {
	const { showDialog, closeDialog } = useContext<IAppLayoutContext>(AppLayoutContext);
	const context = useContext<IExampleListContext>(Context);

	const { title, type, typeMulti } = context.schema;
	const exampleSchReduzido = { title, type, typeMulti, createdat: { type: Date, label: "Criado em" } };

	return (
		<Styles.container>
			<Typography variant="h5">Lista de itens</Typography>
			<ToolTip title="Adicionar dados de exemplos" placement="right">
				<IconButton
					sx={{ mb: 1 }}
					onClick={() =>
						exampleApi.fillDatabaseWithFakeData(undefined, (error, result) => {
							console.log("error", error);
							console.log("result", result);
						})
					}>
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
				onRowClick={(row) => context.navigateToDetail(EnumExampleScreenState.VIEW, row?.id as string)}
				onEdit={(row: any ) => context.navigateToDetail(EnumExampleScreenState.EDIT, row?._id)}
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
				onClick={() => context.navigateToDetail(EnumExampleScreenState.CREATE)}
			/>
		</Styles.container>
	);
};

export default ExampleListView;
