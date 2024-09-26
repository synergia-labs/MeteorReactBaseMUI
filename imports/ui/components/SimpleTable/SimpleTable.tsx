import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import TableSortLabel from '@mui/material/TableSortLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { simpleTableStyle } from './SimpleTableStyle';
import './simpletableCSS.css';
import { useTheme } from '@mui/material/styles';
import SysIcon from '../sysIcon/sysIcon';

interface ISimpleTable {
	schema: ISchema;
	data: any[];
	onClick: (event: React.SyntheticEvent, id: string, doc: object) => void;
	actions?: any[];
	initialSort?: any;
	initialOrder?: any;
	disabledOrder?: boolean;
	filterByField?: string;
	sort?: any | Object[];
	onSort?: (param: Object) => void;
	styles?: Object;
}

interface IEnhancedTableHead {
	headCells: any;
	order: false | 'asc' | 'desc';
	orderBy: string;
	onRequestSort: ((par1: React.SyntheticEvent, pa2: any) => void) | undefined;
	hasActions: boolean;
	disabledOrder?: boolean;
}

interface IField {
	type: any;
	isImage: boolean;
	isAvatar: boolean;
	options: Object;
	isHTML: boolean;
	isStatus: boolean;
}

interface ISchema {
	[key: string]: any;
}

interface IRow {
	_id: number;
	name: string;

	[key: string]: any;
}

interface IAct {
	icon: boolean;
	text: string;
	buttonProps: any;
	onClick: (row: any) => void;
}

type SchemaKey = keyof ISchema;

const descendingComparator = (a: any, b: any, orderBy: string) => {
	if (b.noOrder || a.noOrder) return 0;
	if (b[orderBy] < a[orderBy]) return -1;
	if (b[orderBy] > a[orderBy]) return 1;
	return 0;
};

const getComparator = (order: any, orderBy: string) =>
	order === 'desc'
		? (a: any, b: any) => descendingComparator(a, b, orderBy)
		: (a: any, b: any) => -descendingComparator(a, b, orderBy);

const stableSort = (array: [], comparator: any) => {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
};

const EnhancedTableHead = (props: IEnhancedTableHead) => {
	const { headCells, order, orderBy, onRequestSort, disabledOrder, hasActions } = props;

	const createSortHandler = (property: any) => (event: React.SyntheticEvent) => {
		onRequestSort && onRequestSort(event, property);
	};
	const theme = useTheme();

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell: any) => (
					<TableCell
						key={headCell.sortField || headCell.field}
						style={{ ...simpleTableStyle.tableHeadCell, ...headCell.styles }}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === (headCell.sortField || headCell.field) ? order : false}>
						{disabledOrder ? (
							headCell.label
						) : (
							<TableSortLabel
								active={orderBy === (headCell.sortField || headCell.field)}
								direction={orderBy === (headCell.sortField || headCell.field) ? order : 'asc'}
								onClick={createSortHandler(headCell.sortField || headCell.field)}>
								{headCell.label}
								{orderBy === (headCell.sortField || headCell.field) ? (
									<span style={simpleTableStyle.spanHead}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</span>
								) : null}
							</TableSortLabel>
						)}
					</TableCell>
				))}
				{hasActions ? (
					<TableCell
						key={'actions'}
						sx={{
							...simpleTableStyle.tableHeadCell,
							...simpleTableStyle.tableCellActions
						}}
					/>
				) : null}
			</TableRow>
		</TableHead>
	);
};

export const SimpleTable = React.memo((props: ISimpleTable) => {
	const {
		schema,
		data,
		onClick,
		actions,
		initialSort,
		initialOrder,
		disabledOrder,
		filterByField,
		sort,
		onSort,
		styles
	} = props;
	const [filter, setFilter] = React.useState(null);
	const [order, setOrder] = React.useState(initialOrder || 'asc');
	const [orderBy, setOrderBy] = React.useState(initialSort);

	React.useEffect(() => {
		if (sort) {
			const fields = Object.keys(sort);
			if (fields.length === 0) return;
			if (!sort.field) {
				setOrderBy(sort.field);
				setOrder(sort.sortAscending ? 'asc' : 'desc');
			} else {
				setOrderBy(fields[0]);
				setOrder(sort[fields[0]] === 1 ? 'asc' : 'desc');
			}
		}
	}, [sort]);

	const handleRequestSort = (event: React.SyntheticEvent, property: any) => {
		if (onSort) {
			onSort({
				field: property,
				sortAscending:
					sort && sort.field === property
						? !sort.sortAscending
						: sort && sort[property]
							? sort[property] === 1
								? false
								: true
							: sort
								? true
								: orderBy === property
									? order === 'asc'
										? false
										: true
									: true
			});
			setOrderBy(property);
			setOrder(
				sort && sort.field === property
					? sort.sortAscending
						? 'desc'
						: 'asc'
					: sort && sort[property]
						? sort[property] === 1
							? 'desc'
							: 'asc'
						: sort
							? 'asc'
							: orderBy === property
								? order === 'asc'
									? 'desc'
									: 'asc'
								: 'asc'
			);
			return;
		}
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const hasOnClick = !!onClick;
	const handleRowClick = (id: string, doc: object) => (event: React.SyntheticEvent) => {
		if (onClick) {
			onClick(event, id, doc);
		}
	};

	const getType = (field: IField) => {
		if (field.type === 'DOM') {
			return 'dom';
		}

		if (field.isImage || field.isAvatar) return 'image';
		else if (field.type === Number) return 'number';
		else if (field.type === Date) return 'date';
		else if (field.type === Boolean) return 'boolean';
		else if (Array.isArray(field.type)) return 'list';
		else if ((field.type === String || field.type === Number) && field.options) return 'select';
		else if (field.type === String) return 'text';
		else if (field.type === Object) return 'object';
		else if (field.isHTML) return 'html';
		else if (field.isStatus) return 'status';

		return 'undefined';
	};

	const renderType = (type: string, data: any, colName: SchemaKey) => {
		if (type === 'dom') return data;

		if (type === 'select') {
			const value =
				schema && schema[colName] && schema[colName].options
					? schema[colName].options.find((d: any) => d.value === data || d === data)
					: data;
			return value && value.label ? value.label : value;
		}

		if (type === 'image') {
			return (
				<img
					src={data}
					onError={(e: React.BaseSyntheticEvent) => {
						e.target.onerror = null;
						e.target.src = '/images/wireframe/imagem_default.png';
					}}
					style={simpleTableStyle.containerRenderType}
				/>
			);
		} else if (type === 'text' || type === 'number') return data;
		else if (type === 'date' && data && data.toLocaleDateString) return data.toLocaleDateString();
		else if (type === 'list') {
			return (
				<Typography style={{ wordBreak: 'break-word' }}>
					{!data
						? null
						: data.map((item: any, idx: number) => {
								if (typeof item === 'string') {
									return <Chip key={item + idx} variant="outlined" label={item} color={'primary'} />;
								}
								return <>**Não é possível exibir o conteúdo**</>;
							})}
				</Typography>
			);
		} else if (type === 'object') {
			if (!data) return '';

			return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					{Object.keys(data).map((key, idx: number) => (
						<div key={key + idx} style={{ lineHeight: 0.8, marginBottom: 10 }}>
							{data[key]}
							<br />
							<span style={{ fontSize: 9, color: '#777' }}>{key}</span>
						</div>
					))}
				</div>
			);
		} else if (type === 'boolean')
			return data ? (
				<SysIcon name={'check'} style={{ width: '15px' }} />
			) : (
				<SysIcon name={'close'} style={{ width: '15px' }} />
			);
		else if (type === 'html') {
			return Array.isArray(data) ? (
				data.map((d, idx) => <div key={'dgrs' + idx} dangerouslySetInnerHTML={{ __html: d }} />)
			) : (
				<div key={'dgrs'} dangerouslySetInnerHTML={{ __html: data }} />
			);
		} else if (type === 'status') {
			return (
				<div
					style={{
						width: '10px',
						height: '10px',
						borderRadius: '10px',
						background: `radial-gradient(${data}, gray)`
					}}
				/>
			);
		} else if (type === 'select') {
			const schemaData =
				data &&
				schema[colName] &&
				schema[colName].options &&
				schema[colName].options.find((object: any) => object.value === data || object === data);
			return (schemaData && (schemaData.label || schemaData.value)) || data;
		}
		return null;
	};

	const cols = Array.isArray(schema)
		? schema.map((col) => ({ ...col, type: getType(col) }))
		: Object.keys(schema).map((field) => ({
				sortField: schema[field].sortField,
				field,
				label: schema[field].label,
				type: getType(schema[field])
			}));

	//@ts-ignore
	const newDate = onSort ? data : !data ? null : stableSort(data, getComparator(order, orderBy));

	const filterList: { [key: string]: any } = {};
	const tableBody = (
		filter ? newDate?.filter((d: { [key: string]: any }) => d[filterByField!] === filter) : newDate
	)?.map((row: IRow, index: number) => {
		if (filterByField)
			//@ts-ignore
			filterList[row[filterByField]] = true;

		return (
			<TableRow
				onClick={handleRowClick(row._id ? row._id : row.id, row)}
				style={{
					...(row.rowStyle ? row.rowStyle : {}),
					cursor: hasOnClick ? 'pointer' : undefined
				}}
				key={row._id + index || row.key || row.name || `row${index}`}>
				{cols.map((col) => (
					<TableCell
						scope="row"
						{...{ 'data-label': col.label }}
						key={col.name + col.label}
						style={{
							...simpleTableStyle.tableCell,
							textAlign: col.type === 'image' || col.type === 'dom' ? 'flex-start' : undefined,
							// display: col.type === 'dom' ? 'flex' : undefined,
							justifyContent: col.type === 'dom' ? 'flex-start' : undefined,
							flexDirection: col.type === 'dom' ? 'row' : undefined
						}}>
						{renderType(col.type, row[col.field], col.field)}
					</TableCell>
				))}
				{actions ? (
					<TableCell style={simpleTableStyle.tableCellActions}>
						{actions.map((act: IAct) => (
							<IconButton
								key={act.icon + act.text}
								onClick={(evt) => {
									evt.preventDefault();
									evt.stopPropagation();
									act.onClick(row);
								}}
								{...(act.buttonProps || {})}>
								{act.icon ? act.icon : null}
								{act.text ? act.text : null}
							</IconButton>
						))}
					</TableCell>
				) : null}
			</TableRow>
		);
	});

	return (
		<div style={{ display: 'flex' }}>
			{filterByField ? (
				<div
					style={{
						width: '100%',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'flex-end',
						alignItems: 'flex-start'
					}}>
					{'Filtro: '}
					{filter ? (
						<span style={{ fontWeight: 'bold' }}>
							{filter}{' '}
							<Button style={{ color: '#F00' }} onClick={() => setFilter(null)}>
								X
							</Button>
						</span>
					) : (
						<Select
							value={filter}
							onChange={(evt: SelectChangeEvent<any>) =>
								!evt.target.value ? setFilter(null) : setFilter(evt.target.value)
							}>
							<MenuItem key={'NoFilter'} value={undefined}>
								Sem Filtro
							</MenuItem>
							{Object.keys(filterList).map((item) => (
								<MenuItem key={item} value={item}>
									{item}
								</MenuItem>
							))}
						</Select>
					)}
				</div>
			) : null}

			<Table className={'mobileTable'} style={{ ...simpleTableStyle.tableBox, ...styles }}>
				{/* <TableHead> */}
				{/*    <TableRow > */}
				{/*        {cols.map(col=>{ */}
				{/*            return <TableCell scope="col" {...{"data-label":col.label}} style={simpleTableStyle.tableCell} key={col.name+col.label}>{col.label}</TableCell> */}
				{/*        })} */}
				{/*        {actions?( */}
				{/*            <TableCell  style={simpleTableStyle.tableCell}>{'Ações'}</TableCell> */}
				{/*        ):null} */}
				{/*    </TableRow> */}
				{/* </TableHead> */}
				<EnhancedTableHead
					headCells={cols}
					hasActions={!!actions && actions.length > 0}
					order={order}
					orderBy={orderBy}
					onRequestSort={disabledOrder ? undefined : handleRequestSort}
					disabledOrder={disabledOrder}
				/>
				<TableBody>{tableBody}</TableBody>
				{/* }
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={row}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />{ */}
			</Table>
		</div>
	);
});
