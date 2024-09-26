import React from 'react';
import {
	DataGrid,
	GRID_CHECKBOX_SELECTION_COL_DEF,
	GridActionsCellItem,
	GridColumnGroupHeaderParams,
	GridColumnHeaderParams,
	GridFilterModel,
	GridRenderCellParams,
	GridRowId,
	GridRowIdGetter,
	GridRowParams,
	MuiEvent
} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { Variant } from '@mui/material/styles/createTypography';
import { ComplexTableContainer, ComplexTableRenderImg, ComplexTableRowText } from './ComplexTableStyle';
import { Toolbar } from './Toolbar';
import { GridColumnGroupingModel } from '@mui/x-data-grid/models/gridColumnGrouping';
import { IconButton, Tooltip } from '@mui/material';
import { ptBR } from '@mui/x-data-grid/locales';
import SysIcon from '../../../../imports/ui/components/sysIcon/sysIcon';
import { hasValue } from '../../../libs/hasValue';

interface ISchema {
	[key: string]: any;
}

type onClickFunction = (row: any) => void;

interface IAction {
	icon: JSX.Element | ((doc: any) => JSX.Element);
	label: string;
	disabled?: boolean;
	onClick: onClickFunction;
}

interface IConditionalAction {
	condition: (row: any) => boolean;
	if: {
		icon: JSX.Element;
		label: string;
		onClick: onClickFunction;
	};
	else?: {
		icon: JSX.Element;
		label: string;
		onClick: onClickFunction;
	};
}

export interface IToolbarOptions {
	searchFilter?: boolean;
	density?: boolean;
	selectColumns?: boolean;
	exportTable?: {
		print?: boolean;
		csv?: boolean;
	};
}

interface IComplexTableProps {
	/**
	 * Dados que compõem as linhas da tabela.
	 */
	data: any[];
	/**
	 * Schema dos dados na tabela. Indica quais colunas estarão presentes.
	 */
	schema: ISchema;
	/**
	 * Função callback ativada quando se clica em uma linha
	 * @param {GridRowParams} row Linha que foi clicada. É do tipo [[GridRowParams]].
	 */
	onRowClick?: (row: GridRowParams) => void;
	/**
	 * Variante do texto da header de cada coluna.
	 */
	headerVariant?: Variant;
	/**
	 * Variante do texto das linhas.
	 */
	rowVariant?: Variant;
	/**
	 * Placeholder do campo de pesquisa na tabela, caso exista.
	 */
	searchPlaceholder?: string;
	/**
	 * Função callback ativada para deletar uma linha. Se é especificada, então há uma action de deleção.
	 * @param {any} row Linha que está sendo deletada.
	 */
	onDelete?: onClickFunction;
	/**
	 * Função callback ativada para editar uma linha. Se é especificada, então há uma action de edição.
	 * @param {any} row Linha que está sendo editada.
	 */
	onEdit?: onClickFunction;
	/**
	 * Array com as actions que devem ter na tabela, exceto deleção e edição que são especificadas pelas
	 * callbacks onDelete e onEdit. Deve especificar um ícone, uma label e uma callback para cada action.
	 */
	actions?: IAction[];
	/**
	 * Array com actions que devem ter na tabela e cuja renderização depende de uma condição. Deve especificar
	 * um ícone, uma label e uma callback para cada action e para cada condição. Se não é espeficicada uma action
	 * para o caso de "else", então não é renderizada.
	 */
	conditionalActions?: IConditionalAction[];
	/**
	 * Variante dos botões presentes na tabela.
	 */
	buttonVariant?: 'text' | 'outlined' | 'contained';
	/**
	 * Objeto com especificações de quais componentes da toolbar devem ser renderizados. Se não é definido,
	 * então a toolbar não é renderizada.
	 */
	toolbar?: IToolbarOptions;
	/**
	 * Função callback que define o comportamento do campo de pesquisa, caso exista. Se não é definida e há
	 * o campo de pesquisa, então a pesquisa é feita usando a implementação padrão do Datagrid.
	 * @param {string} nextText Novo texto inserido na pesquisa.
	 */
	onFilterChange?: (newText: string) => void;
	/**
	 * Quando é passado, indica se os dados na tabela ainda estão sendo carregados para que seja carregado um
	 * componente visual de carregamento.
	 */
	loading?: boolean;
	/**
	 * Função callback que é usada para abrir o modal de filtros na visualização mobile. Se não é definido, então
	 * não há a opção de abrir o modal.
	 */
	openFilterModal?: () => void;
	/**
	 * Largura (em px) na qual o ícone do modal de filtro deve começar a ser exibido.
	 * @default 600
	 */
	filterIconWidth?: number;
	/**
	 * Função usada para obter o identificador em uma linha na tabela. Por padrão, o ComplexTable busca o atributo _id,
	 * mas caso esse atributo não esteja definido, é possível usar outro atributo como identificador a partir dessa função.
	 * @param {any} row Linha onde está sendo buscado o identificador.
	 * @returns {GridRowId} O atributo na linha que é usado como identificador.
	 */
	getId?: GridRowIdGetter<any>;
	/**
	 * Identificador que tem como objetivo se comunicar com o SimpleForm, só é necessário quando utilizando como child do SimpleForm.
	 */
	id?: 'complexTable';
	/**
	 * Prop que define o valor inicial da seleção de linhas na tabela. É um array com IDs de elementos na tabela.
	 */
	selectionModel?: GridRowId[];
	/**
	 * Função usada para atualizar o valor da prop selectionModel.
	 */
	setSelectionModel?: (selection: GridRowId[]) => void;
	/**
	 * Prop que controla os grupos de colunas. É necessario passar um objeto com o seguinte esquema para essa prop
	 * obj:{
	 *    groupId: <id_do_grupo>
	 *    headerName: <nome_da_coluna_do_grupo>
	 *    children:[{field: <campo_no_esquema_para_agrupar>}]
	 *  }
	 */
	groupColumns?: GridColumnGroupingModel;

	/**
	 *  Determina se mantem a altura padrão
	 * @default true
	 */
	autoHeight?: boolean;

	/**
	 *  Função que renderiza as células específicas determinadas no parâmetro fieldsRenderCellModified
	 * @param {GridRenderCellParams} params
	 */
	renderCellModified?: (params: GridRenderCellParams) => JSX.Element;

	/**
	 *  Objeto contendo os campos a serem renderizados pela função renderCellModified
	 */
	fieldsRenderCellModified?: { [key: string]: any };

	/**
	 * flag usada para desabilidar a ordenação das colunas
	 */
	disableSorting?: boolean;

	/**
	 * flag usada para desabilidar a CheckboxSelection
	 */
	disableCheckboxSelection?: boolean;

	/**
	 *  Objeto contendo um campo como chave e uma largura específica em px para a coluna do campo em questão
	 */
	fieldsMinWidthColumnModified?: { [key: string]: number };

	/**
	 *  Objeto contendo um campo como chave e uma largura específica em px para a coluna do campo em questão
	 */
	fieldsMaxWidthColumnModified?: { [key: string]: number };
}

export const locale = {
	...ptBR.components.MuiDataGrid.defaultProps.localeText,
	toolbarExportPrint: 'Imprimir',
	noRowsLabel: 'Nenhum resultado encontrado.',
	toolbarColumns: 'Exibir colunas'
};

export const ComplexTable = (props: IComplexTableProps) => {
	const {
		data,
		schema,
		headerVariant,
		rowVariant,
		searchPlaceholder,
		actions,
		conditionalActions,
		buttonVariant,
		toolbar,
		loading,
		filterIconWidth,
		onFilterChange,
		onRowClick,
		onDelete,
		onEdit,
		openFilterModal,
		getId,
		selectionModel,
		setSelectionModel,
		groupColumns,
		autoHeight,
		renderCellModified,
		fieldsRenderCellModified,
		disableSorting,
		disableCheckboxSelection = true,
		fieldsMinWidthColumnModified,
		fieldsMaxWidthColumnModified
	} = props;

	locale.toolbarQuickFilterPlaceholder = searchPlaceholder ?? 'Pesquisar';

	const transformData = (
		value: any,
		type: Function,
		renderKey?: string,
		arrayOptions?: Array<{ label: string; value: any }>
	) => {
		if (hasValue(arrayOptions) && Array.isArray(arrayOptions))
			value = arrayOptions.find((option) => option.value === value)?.label;
		if (!hasValue(value)) return '-';
		else if (Array.isArray(value)) return value.join();
		else if (type === Object) {
			const data = Object.keys(value).reduce((prev: string, curr: string) => {
				if (!!renderKey) return value[renderKey];
				return !!value[curr] ? `${prev}\n` + `${curr}: ${value[curr]}\n` : prev + '\n';
			}, '');
			return data;
		} else if (type === Date) return value.toLocaleDateString();
		else return value;
	};
	const renderHeader = (params: GridColumnHeaderParams) => (
		<Tooltip title={params.colDef.headerName} arrow={true}>
			<Typography
				sx={{
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap'
				}}
				variant="subtitle2">
				{params.colDef.headerName}
			</Typography>
		</Tooltip>
	);

	const renderHeaderGroup = (params: GridColumnGroupHeaderParams) => (
		<Typography variant="subtitle2">{params.headerName}</Typography>
	);

	const transformGroup = (params: GridColumnGroupingModel) => {
		return params.map((value) => {
			return !value.renderHeaderGroup ? { ...value, renderHeaderGroup } : value;
		});
	};

	const groupIds = (value: GridColumnGroupingModel) => {
		return value.map((group) => group);
	};

	const groupColumsTransform = groupColumns ? transformGroup(groupColumns) : undefined;

	const columns: any = Object.keys(schema).map((key: string) => {
		return {
			field: key,
			headerName: schema[key]?.label || '',
			flex: 1,
			align: 'left',
			headerAlign: 'left',
			sortable: disableSorting ? false : true,
			minWidth: fieldsMinWidthColumnModified?.hasOwnProperty(key) ? fieldsMinWidthColumnModified[key] : 150,
			maxWidth: fieldsMaxWidthColumnModified?.hasOwnProperty(key) ? fieldsMaxWidthColumnModified[key] : 'auto',
			renderHeader,
			renderHeaderGroup,
			groupPath: groupColumsTransform ? groupIds(groupColumsTransform) : [],
			renderCell: !fieldsRenderCellModified?.hasOwnProperty(key)
				? (params: GridRenderCellParams) => {
						if (schema[key].isImage || schema[key].isAvatar) {
							return (
								<ComplexTableRenderImg
									src={params.value}
									onError={(e: React.BaseSyntheticEvent) => {
										e.target.onerror = null;
										e.target.src = '/images/wireframe/imagem_default.png';
									}}
								/>
							);
						} else {
							const paramsValue = !params.value || params.value === 'undefined - undefined' ? '-' : params.value;
							const value = transformData(
								paramsValue,
								schema[key].type,
								schema[key].renderKey,
								schema[key]?.options?.(params.row)
							);
							const variant = params.field === 'atividade' ? 'labelMedium' : 'bodyMedium';
							return (
								<ComplexTableRowText variant="body2" sx={{ textAlign: 'left' }}>
									<Tooltip title={value} arrow={true}>
										{value}
									</Tooltip>
								</ComplexTableRowText>
							);
						}
					}
				: renderCellModified
		};
	});

	columns.unshift({
		...GRID_CHECKBOX_SELECTION_COL_DEF,
		hideable: false
	});

	if (
		!!onDelete ||
		!!onEdit ||
		(!!actions && actions.length > 0) ||
		(!!conditionalActions && conditionalActions.length > 0)
	) {
		columns.push({
			field: 'actions',
			type: 'actions',
			headerName: 'Ações',
			headerAlign: 'left',
			hideable: false,
			renderHeader,
			getActions: (params: GridRowParams) => {
				const renderActions = !!actions ? [...actions] : [];
				if (!!onDelete)
					renderActions.unshift({
						icon: <SysIcon name={'delete'} />,
						label: 'Deletar',
						onClick: onDelete
					});

				if (!!onEdit) renderActions.unshift({ icon: <SysIcon name={'edit'} />, label: 'Editar', onClick: onEdit });

				if (!!conditionalActions) {
					conditionalActions.forEach((action: IConditionalAction) => {
						if (action.condition(params.row)) {
							renderActions.push({
								icon: <IconButton> {action.if.icon} </IconButton>,
								label: action.if.label,
								onClick: action.if.onClick
							});
						} else if (!!action.else) {
							renderActions.push({
								icon: <IconButton>{action.else.icon}</IconButton>,
								label: action.else.label,
								onClick: action.else.onClick
							});
						}
					});
				}

				return renderActions.map((action: IAction) => {
					return (
						<GridActionsCellItem
							label={action.label}
							icon={typeof action.icon === 'function' ? action.icon(params.row) : action.icon}
							disabled={!!action.disabled}
							onClick={(evt: React.SyntheticEvent) => {
								evt.stopPropagation();
								action.onClick(params.row);
							}}
							showInMenu={renderActions.length > 3}
						/>
					);
				});
			}
		});
	}

	const [selection, setSelection] = React.useState<GridRowId[]>([]);

	React.useEffect(() => {
		if (setSelectionModel !== undefined && selectionModel !== undefined) setSelectionModel(selection);
	}, [selection]);

	React.useEffect(() => {
		if (selection?.length === 0 && selectionModel && selectionModel.length > 0) setSelection(selectionModel);
	}, [selectionModel]);

	return (
		<ComplexTableContainer>
			<DataGrid
				rows={data}
				columns={columns}
				rowCount={data?.length}
				paginationMode={'server'}
				autoHeight={autoHeight ?? true}
				localeText={locale}
				getRowId={!!getId ? getId : (row) => row._id}
				onRowSelectionModelChange={(newSelection) => setSelection(newSelection)}
				rowSelectionModel={selection}
				onRowClick={
					!!onRowClick
						? (params: GridRowParams, event: MuiEvent<React.MouseEvent>) => {
								event.stopPropagation();
								onRowClick(params);
							}
						: undefined
				}
				getRowHeight={() => 'auto'}
				slots={{
					toolbar: Toolbar,
					baseSwitch: Checkbox
				}}
				slotProps={{
					toolbar: {
						buttonVariant,
						toolbarOptions: toolbar,
						openFilterModal,
						filterIconWidth
					},
					columnsPanel: {
						sx: {
							'& .MuiInputBase-root': {
								border: 'none'
							},
							'& .MuiDataGrid-panelHeader': {
								margin: '0.5rem 0.5rem 0.25rem 0.5rem'
							},
							'& .MuiDataGrid-columnsPanel ': {
								margin: '0 0.25rem 0 0.25rem'
							},
							'& .MuiDataGrid-panelFooter': {
								margin: '0.75rem'
							}
						}
					},
					baseButton: {
						sx: {
							pb: '0.3em',
							pt: '0.3em'
						}
					},
					pagination: {
						labelRowsPerPage: 'Itens por página'
					}
				}}
				filterMode={!!onFilterChange ? 'server' : 'client'}
				onFilterModelChange={
					!!onFilterChange
						? (model: GridFilterModel) => {
								const search = model.quickFilterValues![0] ? model.quickFilterValues![0] : '';
								onFilterChange(search);
							}
						: undefined
				}
				loading={loading ?? undefined}
				checkboxSelection={disableCheckboxSelection ? false : true}
				disableColumnFilter
				disableColumnMenu
				initialState={{
					pagination: { paginationModel: { pageSize: 15 } }
				}}
				pageSizeOptions={[15, 20, 25]}
			/>
		</ComplexTableContainer>
	);
};
