import React from 'react';
import {
    DataGrid,
    GridActionsCellItem,
    GridColumnHeaderParams,
    GridColumns,
    GridFilterModel,
    GridRenderCellParams,
    GridRowClassNameParams,
    GridRowId,
    GridRowIdGetter,
    GridRowParams,
    MuiEvent,
    ptBR,
} from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Edit from '@mui/icons-material/Edit';
import { Variant } from '@mui/material/styles/createTypography';
import { complexTableStyle } from './ComplexTableStyle';
import { format } from 'date-fns';
import { useMediaQuery } from '@mui/material';
import { getTypeOf, hasValue } from '/imports/libs/hasValue';

interface ISchema {
    [key: string]: any;
}

type onClickFunction = (row: any) => void;
interface IAction {
    icon: JSX.Element;
    label: string;
    onClick: onClickFunction;
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
     * flag usada para desabilidar a ordenação das colunas
     */
    disableSorting?: boolean;

    /**
     * flag usada para mostrar data e hora das colunas de data
     */
    fulldate?: boolean;

    /**
     *
     * @param params  GridRowClassNameParams<any>
     * @returns função usada para aplicar uma classe em uma row que atenda uma condição específica
     */
    getRowClassName?: (params: GridRowClassNameParams<any>) => string;
}

const locale = {
    ...ptBR.components.MuiDataGrid.defaultProps.localeText,
    toolbarExportPrint: 'Imprimir',
    noRowsLabel: 'Nenhum resultado encontrado.',
    toolbarColumns: 'Exibir colunas',
};

export const ComplexTable = (props: IComplexTableProps) => {
    const {
        data,
        schema,
        headerVariant,
        rowVariant,
        searchPlaceholder,
        actions,
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
        disableSorting,
        fulldate,
        showActionsInMenu,
        getRowClassName,
    } = props;

    locale.toolbarQuickFilterPlaceholder = searchPlaceholder ?? 'Pesquisar';

    const transformData = (value: any, type: Function, completeDate = false) => {
        if (React.isValidElement(value)) {
            return value;
        }
        if (!value) return '-';
        if (Array.isArray(value)) return value.join();
        else if (type === Object && typeof value === 'object') {
            return Object.keys(value).reduce((prev: string, curr: string) => {
                return !!value[curr] ? (prev || '') + `${curr}: ${value[curr]}\n` : prev + '\n';
            }, '');
        } else if (!fulldate && !completeDate && type === Date) return format(value, 'dd/MM/yy');
        else if ((fulldate || !!completeDate) && type === Date)
            return format(value, 'dd/MM/yy') + ' ' + value.toLocaleTimeString();
        else return value;
    };

    const renderHeader = (params: GridColumnHeaderParams) => (
        <Box
            sx={{
                marginLeft: params.colDef.field === 'dataPublicacao' ? '0px' : '10px',
            }}
        >
            <Typography variant={headerVariant ?? 'caption2'} sx={{ color: '#808080' }}>
                {params.colDef.headerName}
            </Typography>
        </Box>
    );

    const MD1550 = useMediaQuery('(max-width:1550px)');

    const columns: GridColumns = Object.keys(schema).map((key: string) => {
        return {
            field: key,
            headerName: schema[key].label,
            flex: 1,
            sortable: disableSorting ? false : schema[key].label === 'Título' ? false : true,
            width: 'auto',
            height: '200px',
            maxWidth:
                schema[key].label === 'Título'
                    ? MD1550
                        ? 500
                        : 550
                    : schema[key].label === 'Criação'
                    ? 144
                    : schema[key].label === 'Tipo'
                    ? 250
                    : schema[key].label === 'Publicação'
                    ? 120
                    : schema[key].label === 'Situação'
                    ? 160
                    : schema[key].label === 'Tipo de evento'
                    ? 220
                    : schema[key].label === 'Publicador'
                    ? 200
                    : schema[key].label === 'Criado em'
                    ? 120
                    : schema[key].label === 'Comentários'
                    ? 120
                    : schema[key].label === 'Imagem desktop/mobile'
                    ? 260
                    : schema[key].label === 'Área de exibição'
                    ? 150
                    : schema[key].label === 'Expira em:'
                    ? 120
                    : schema[key].label === 'Data/Hora'
                    ? 130
                    : schema[key].label === 'Perfil/Gênero/Escola'
                    ? 280
                    : schema[key].label === 'Cidade/UF'
                    ? 270
                    : schema[key].label === 'Tipo/Conteúdo'
                    ? 390
                    : schema[key].label === 'Identificação do objeto'
                    ? 220
                    : schema[key].label === 'Data de inicio'
                    ? 130
                    : schema[key].label === 'Data de fim'
                    ? 130
                    : schema[key].label === 'Tipo de log'
                    ? 280
                    : schema[key].label === 'Dados do CSV'
                    ? 390
                    : 200,

            minWidth:
                schema[key].label === 'Imagem desktop/mobile'
                    ? 260
                    : schema[key].label === 'Área de exibição'
                    ? 150
                    : schema[key].label === 'Dados do CSV'
                    ? 350
                    : null,
            renderHeader,
            renderCell: (params: GridRenderCellParams) => {
                if (schema[key].isImage || schema[key].isAvatar) {
                    return (
                        <Box
                            component="img"
                            sx={complexTableStyle.renderImg}
                            src={params.value}
                            onError={(e: React.BaseSyntheticEvent) => {
                                e.target.onerror = null;
                                e.target.src = '/images/wireframe/imagem_default.png';
                            }}
                        />
                    );
                } else {
                    return (
                        <Box sx={{ margin: '20px 0px 20px 10px' }}>
                            <Typography
                                variant={rowVariant ?? 'body1'}
                                sx={complexTableStyle.rowText}
                            >
                                {schema[key].label === 'Situação'
                                    ? params.value === 'Rascunho'
                                        ? transformData('○ ' + params.value, schema[key].type)
                                        : transformData('● ' + params.value, schema[key].type)
                                    : transformData(
                                          params.value,
                                          schema[key].type,
                                          schema[key].fullDate
                                      )}
                            </Typography>
                        </Box>
                    );
                }
            },
        };
    });

    if (!!onDelete || !!onEdit || (!!actions && actions.length > 0)) {
        columns.push({
            field: 'actions',
            type: 'actions',
            headerName: '',
            flex: 1,
            minWidth:
                !showActionsInMenu && actions?.length && actions.length + 2 > 2
                    ? (actions.length + 2) * 65
                    : !!onDelete && !!onEdit
                    ? 150
                    : 70,
            maxWidth:
                !showActionsInMenu && actions?.length && actions.length + 2 > 2
                    ? (actions.length + 2) * 65
                    : !!onDelete && !!onEdit
                    ? 150
                    : 70,
            headerAlign: 'left',
            renderHeader,
            getActions: (params: GridRowParams) => {
                const renderActions = !!actions ? [...actions] : [];
                if (!!onDelete)
                    renderActions.push({
                        icon: <Box component={'img'} src={'/images/delete_black.png'} />,
                        label: 'Excluir',
                        onClick: onDelete,
                    });

                if (!!onEdit)
                    renderActions.unshift({
                        icon: <Edit />,
                        label: 'Editar',
                        onClick: onEdit,
                    });

                return renderActions.map((action: IAction) => {
                    return (
                        <GridActionsCellItem
                            label={action.label}
                            icon={action.icon}
                            sx={complexTableStyle.actionsMenu}
                            onClick={(evt: React.SyntheticEvent) => {
                                evt.stopPropagation();
                                action.onClick(params.row);
                            }}
                            showInMenu={showActionsInMenu || renderActions.length > 3}
                        />
                    );
                });
            },
        });
    }

    const [selection, setSelection] = React.useState<GridRowId[]>();

    return (
        <Box sx={complexTableStyle.container}>
            <DataGrid
                rows={data}
                columns={columns}
                // initialState={{
                //     sorting: {
                //         sortModel: [{ field: 'createdat', sort: 'desc' }],
                //     },
                // }}
                sx={{
                    borderRadius: '0px 15px 0 0',
                    width: '100%',
                }}
                rowCount={data.length}
                autoHeight
                localeText={locale}
                getRowId={!!getId ? getId : (row) => row._id}
                onSelectionModelChange={(newSelection) => setSelection(newSelection)}
                selectionModel={selection}
                onRowClick={
                    !!onRowClick
                        ? (params: GridRowParams, event: MuiEvent<React.MouseEvent>) => {
                              event.stopPropagation();
                              onRowClick(params);
                          }
                        : undefined
                }
                getRowHeight={() => 'auto'}
                components={{
                    // Toolbar: Toolbar,
                    BaseSwitch: Checkbox,
                }}
                componentsProps={{
                    toolbar: {
                        buttonVariant,
                        toolbarOptions: toolbar,
                        openFilterModal,
                        filterIconWidth,
                    },
                    columnsPanel: {
                        sx: {
                            '& .MuiInputBase-root': {
                                border: 'none',
                            },
                        },
                    },
                    baseButton: {
                        sx: {
                            pb: '0.3em',
                            pt: '0.3em',
                        },
                    },
                }}
                filterMode={!!onFilterChange ? 'server' : 'client'}
                onFilterModelChange={
                    !!onFilterChange
                        ? (model: GridFilterModel) => {
                              const search = model.quickFilterValues![0]
                                  ? model.quickFilterValues![0]
                                  : '';
                              onFilterChange(search);
                          }
                        : undefined
                }
                loading={loading ?? undefined}
                hideFooter
                // checkboxSelection
                disableColumnFilter
                disableColumnMenu
                getRowClassName={getRowClassName}
            />
        </Box>
    );
};
