import React from 'react';
import { useTracker} from 'meteor/react-meteor-data';
import { exampleApi } from '../../api/exampleApi';
import { userprofileApi } from '../../../../userprofile/api/UserProfileApi';
import { SimpleTable } from '/imports/ui/components/SimpleTable/SimpleTable';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import TablePagination from '@mui/material/TablePagination';
import { nanoid } from 'nanoid';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import SearchDocField from '/imports/ui/components/SimpleFormFields/SearchDocField/SearchDocField';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';
import { IExample } from '../../api/exampleSch';
import { Recurso } from '../../config/Recursos';
import { RenderComPermissao } from '/imports/seguranca/ui/components/RenderComPermisao';
import { ComplexTable } from '/imports/ui/components/ComplexTable/ComplexTable';
import ToggleField from '/imports/ui/components/SimpleFormFields/ToggleField/ToggleField';
import { useMediaQuery} from "@mui/material";
import { useNavigate} from 'react-router-dom';

interface IExampleList {
	setPage : (page: number) => void;
	setPageSize : (pageSize: number) => void;
	clearFilter : () => void;
	searchBy? : string | null;
	onSearch : (text?: string) => void;
	remove : (doc: IExample) => void;
	setFilter : (filter: Object) => void;
	viewComplexTable: boolean;
	setViewComplexTable: (_enable: boolean) => void;
	examples: IExample[];
	loading?: boolean;
	total?: number;
	pageProperties: {
		currentPage: number;
		pageSize: number;
	};
}

const ExampleList = ({
	setPage,
	setPageSize,
	clearFilter,
	searchBy,
	onSearch,
	remove,
	setFilter,
	viewComplexTable = false,
	setViewComplexTable = (_enable: boolean) => {},
	examples,
	loading,
	total,
	pageProperties
} : IExampleList) => {

	const navigate = useNavigate();
    const idExample = nanoid();
	const { showDeleteDialog } = React.useContext(AppContext);
	const isMobile = useMediaQuery('(max-width:600px)');

	const onClick = (_event: React.SyntheticEvent, id: string) => {
		navigate('/example/view/' + id);
	};

	const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
		setPage(newPage + 1);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPageSize(parseInt(event.target.value, 10));
		setPage(1);
	};

	const [text, setText] = React.useState(searchBy || '');

	const change = (e: React.ChangeEvent<HTMLInputElement>) => {
		clearFilter();
		if (text.length !== 0 && e.target.value.length === 0) {
			onSearch();
		}
		setText(e.target.value);
	};
	const keyPress = (_e: React.SyntheticEvent) => {
		// if (e.key === 'Enter') {
		if (text && text.trim().length > 0) {
			onSearch(text.trim());
		} else {
			onSearch();
		}
		// }
	};

	const click = (_e: React.SyntheticEvent) => {
		if (text && text.trim().length > 0) {
			onSearch(text.trim());
		} else {
			onSearch();
		}
	};

	const callRemove = (doc: IExample) => {
		const title = 'Remover exemplo';
		const message = `Deseja remover o exemplo "${doc.title}"?`;
		showDeleteDialog?.(title, message, doc, remove);
	};

	const handleSearchDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		!!e.target.value ? setFilter({ createdby: e.target.value }) : clearFilter();
	};

	const { image, title, description, nomeUsuario } = exampleApi.getSchema();
	const schemaReduzido = { image, title, description, nomeUsuario: { type: String, label: 'Criado por' } };

	return (
		<PageLayout title={'Lista de Exemplos'} actions={[]}>
			<SearchDocField
				api={userprofileApi}
				subscribe={'getListOfusers'}
				getOptionLabel={(doc) => doc.username || 'error'}
				sort={{ username: 1 }}
				textToQueryFilter={(textoPesquisa) => {
					textoPesquisa = textoPesquisa.replace(/[+[\\?()*]/g, '\\$&');
					return { username: new RegExp(textoPesquisa, 'i') };
				}}
				autocompleteOptions={{ noOptionsText: 'Não encontrado' }}
				name={'userId'}
				label={'Pesquisar com SearchDocField'}
				onChange={handleSearchDocChange}
				placeholder={'Todos'}
				showAll={false}
				key={'SearchDocKey'}
			/>

			{!isMobile && (
				<ToggleField
					label={'Habilitar ComplexTable'}
					value={viewComplexTable}
					onChange={(evt: { target: { value: boolean } }) => {
						setViewComplexTable(evt.target.value);
					}}
				/>
			)}
			{(!viewComplexTable || isMobile) && (
				<>
					<TextField
						name={'pesquisar'}
						label={'Pesquisar'}
						value={text}
						onChange={change}
						onKeyPress={keyPress}
						placeholder="Digite aqui o que deseja pesquisa..."
						action={{ icon: 'search', onClick: click }}
					/>

					<SimpleTable
						schema={schemaReduzido}
						data={examples}
						onClick={onClick}
						actions={[{ icon: <Delete />, id: 'delete', onClick: callRemove }]}
					/>
				</>
			)}

			{!isMobile && viewComplexTable && (
				<ComplexTable
					data={examples}
					schema={schemaReduzido}
					onRowClick={(row) => navigate('/example/view/' + row.id)}
					searchPlaceholder={'Pesquisar exemplo'}
					onDelete={callRemove}
					onEdit={(row) => navigate('/example/edit/' + row._id)}
					toolbar={{
						selectColumns: true,
						exportTable: { csv: true, print: true },
						searchFilter: true
					}}
					onFilterChange={onSearch}
					loading={loading}
				/>
			)}

			<div
				style={{
					width: '100%',
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center'
				}}>
				<TablePagination
					style={{ width: 'fit-content', overflow: 'unset' }}
					rowsPerPageOptions={[10, 25, 50, 100]}
					labelRowsPerPage={''}
					component="div"
					count={total || 0}
					rowsPerPage={pageProperties.pageSize}
					page={pageProperties.currentPage - 1}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
					SelectProps={{
						inputProps: { 'aria-label': 'rows per page' }
					}}
				/>
			</div>

			<RenderComPermissao recursos={[Recurso.EXAMPLE_CREATE]}>
				<div
					style={{
						position: 'fixed',
						bottom: isMobile ? 80 : 30,
						right: 30
					}}>
					<Fab id={'add'} onClick={() => navigate(`/example/create/${idExample}`)} color={'primary'}>
						<Add />
					</Fab>
				</div>
			</RenderComPermissao>
		</PageLayout>
	);
};

interface IInitialConfig {
	pageProperties: {
		currentPage: number;
		pageSize: number;
	};
	sortProperties: { field: string; sortAscending: boolean };
	filter: Object;
	searchBy: string | null;
	viewComplexTable: boolean;
}
let onSearchExampleTyping: NodeJS.Timeout;

export const ExampleListContainer = () => {
	const initialConfig = {
		pageProperties: {
			currentPage: 1,
			pageSize: 25
		},
		sortProperties: { field: 'createdat', sortAscending: true },
		filter: {title: 'Teste 02'},
		searchBy: null,
		viewComplexTable: false
	};
	const [config, setConfig] = React.useState<IInitialConfig>(initialConfig);
	const { showNotification } = React.useContext(AppContext);

	const setPageProperties = (properties : {currentPage?: number, pageSize?: number}) => {
		setConfig({...config, pageProperties: {...config.pageProperties, ...properties}});
	};
	const changePage = (page: number) => {
		setConfig({...config, pageProperties: {...config.pageProperties, currentPage: page}});
	};
	const changePageSize = (pageSize: number) => {
		setConfig({...config, pageProperties: {...config.pageProperties, pageSize: pageSize}});
	};

	const setSortProperties = (properties : {field: string, sortAscending: boolean}) => {
		setConfig({...config, sortProperties: properties});
	};

	const setFilter = (filter : Object) => {
		setConfig({...config, filter: filter});
	}

	const clearFilter = () => {
		setConfig({...config, filter: {}});
	}

	const setSearchBy = (searchBy : string) => {
		setConfig({...config, searchBy: searchBy});
	}

	const setViewComplexTable = (viewComplexTable : boolean) => {
		setConfig({...config, viewComplexTable: viewComplexTable});
	}

	const onSearch = (text?: string) => {
		onSearchExampleTyping && clearTimeout(onSearchExampleTyping);
		onSearchExampleTyping = setTimeout(() => {
			setFilter({title: {$regex: `^${text}`, $options: 'i'}});
		}, 1000);
	};

	const remove = (doc: IExample) => {
		exampleApi.remove(doc, (e: IMeteorError) => {
			if (!e) {
				showNotification?.({
					type: 'success',
					title: 'Operação realizada!',
					description: `O exemplo foi removido com sucesso!`
				});
			} else {
				console.log('Error:', e);
				showNotification?.({
					type: 'warning',
					title: 'Operação não realizada!',
					description: `Erro ao realizar a operação: ${e.reason}`
				});
			}
		});
	};

	const { sortProperties, filter, pageProperties } = config;
	const sort = {
		[sortProperties.field]: sortProperties.sortAscending ? 1 : -1
	};
	const limit = pageProperties.pageSize;
	const skip = (pageProperties.currentPage - 1) * pageProperties.pageSize;

	const { loading, examples, total } = useTracker(() => {
		const subHandle = exampleApi.subscribe('exampleList', filter, {
			sort,
			limit,
			skip
		});
		const examples = subHandle?.ready() ? exampleApi.find(filter, { sort }).fetch() : [];
		return {
			examples,
			loading: !!subHandle && !subHandle.ready(),
			total: subHandle ? subHandle.total : examples.length
		};
	});

	return(
		<ExampleList 
			setPage={changePage}
			setPageSize={changePageSize}
			clearFilter={clearFilter}
			searchBy={config.searchBy}
			onSearch={onSearch}
			remove={remove}
			setFilter={setFilter}
			viewComplexTable={config.viewComplexTable}
			setViewComplexTable={setViewComplexTable}
			examples={examples}
			loading={loading}
			total={total}
			pageProperties={pageProperties}
		/>
	);
}
