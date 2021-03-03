import React from 'react'
import './simpletableCSS.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Chip from "@material-ui/core/Chip";
import {simpleTableStyle} from "./SimpleTableStyle";
import {Typography} from "@material-ui/core";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import {selectRowBackground, textColorGray} from "/imports/materialui/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";


const descendingComparator = (a, b, orderBy) => {
    if(b.noOrder || a.noOrder){
        return 0
    }
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const EnhancedTableHead = (props) => {
    const { headCells, order, orderBy,onRequestSort, disabledOrder} = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={(headCell.sortField || headCell.field)}
                        style={{...simpleTableStyle.tableHeadCell,...headCell.styles}}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === (headCell.sortField || headCell.field) ? order : false}
                    >
                        {disabledOrder ?
                            headCell.label
                            :
                            <TableSortLabel
                            active={orderBy === (headCell.sortField || headCell.field)}
                            direction={orderBy === (headCell.sortField || headCell.field) ? order : 'asc'}
                            onClick={createSortHandler((headCell.sortField || headCell.field))}

                            >
                            {headCell.label}
                            {orderBy === (headCell.sortField || headCell.field) ? (
                                <span style={simpleTableStyle.spanHead}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                            ) : null}
                            </TableSortLabel>
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface ISimpleTable {
    schema:object;
    data:object[];
    onClick:(event: React.SyntheticEvent,id:string,doc:object)=>void;
    actions:object[];
}

export default function SimpleTable({schema,data,onClick,actions,initialSort,initialOrder,disabledOrder,filterByField, styles}:ISimpleTable) {
    const [filter, setFilter] = React.useState(null);
    const [order, setOrder] = React.useState(initialOrder||'asc');
    const [orderBy, setOrderBy] = React.useState(initialSort);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const hasOnClick = !!onClick;
    const handleRowClick = (id:string,doc:object) => (event:React.SyntheticEvent) =>{
        if(onClick) {
            onClick(event,id,doc);
        }
    }

    const getType = (field: { type:any }) => {
        if(field.isImage||field.isAvatar) {
            return 'image'
        } else if(field.type===Number) {
            return 'number'
        } else if(field.options) {
            return 'select'
        } else if(field.type===Date) {
            return 'date'
        } else if(field.type===Boolean) {
            return 'boolean'
        }else if(Array.isArray(field.type) ) {
            return 'list'
        } else if(field.type===String) {
            return 'text'
        } else if(field.isHTML) {
            return 'html'
        } else if(field.isStatus) {
            return 'status'
        } else {
            return 'undefined';
        }
    }

    const renderType = (type:string,data:any, colName: string) => {
        if(type==='image') {
            return <img src={data} size='tiny' style={simpleTableStyle.containerRenderType} />
        } else if(type==='text'||type==='number') {
            return data;
        }else if(type==='date'&&data&&data.toLocaleDateString) {
            return data.toLocaleDateString();
        }else if(type==='list') {
            return <Typography style={{wordBreak:'break-word'}}>{
                !data?null:data.map((item, index, array) => {
                    if (typeof (item) === 'string') {
                        return <Chip
                            variant="outlined"
                            label={item}
                            color={'primary'}
                        />
                        //return index===array.length-1 ? item + '.': item + ', '
                    } else {
                        return <i>{'**Não é possível exibir o conteúdo**'}</i>
                    }
                })
            }</Typography>
        }else if(type==='boolean') {
            return data?<CheckIcon style={{width: '15px'}}/>:<CloseIcon style={{width: '15px'}}/>;
        }else if(type==='html') {
            return Array.isArray(data)?data.map(d=><div dangerouslySetInnerHTML={{__html: d}} />):<div dangerouslySetInnerHTML={{__html: data}} />;
        }else if(type==='status') {
            return <div style={{
                width: '10px',
                height: '10px',
                borderRadius:'10px',
                background: `radial-gradient(${data}, gray)`
            }}/>;
        } else if(type==='select') {
            const schemaData = data&&schema[colName]&&schema[colName].options&&schema[colName].options.find((object)=>(object.value===data||object===data) );
            return (schemaData &&(schemaData.label || schemaData.value) || data)
        } else {
            return null;
        }
    }

    const cols =  Array.isArray(schema) ? schema.map(col=>({...col,type:getType(col)}))
        : Object.keys(schema).map(field=>({sortField:schema[field].sortField,field,label:schema[field].label,type:getType(schema[field])}));

    const newDate = !data?null:stableSort(data, getComparator(order, orderBy))

    const filterList = {};
    const tableBody = ((filter?(newDate.filter(d=>d[filterByField]===filter)):newDate).map((row,index) => {
        if(filterByField) {
            filterList[row[filterByField]]=true;
        }
        return (
            <TableRow
                onClick={handleRowClick(row._id? row._id: row.id, row)}
                style={{...(row.rowStyle?row.rowStyle:{}),cursor:hasOnClick?'pointer':undefined} }
                key={row._id+index ||row.key||row.name||'row'+index}
            >
                {cols.map((col)=>{
                    return <TableCell
                        scope="row"
                        {...{"data-label":col.label}}
                        key={col.name+col.label}
                        style={{...simpleTableStyle.tableCell, backgroundColor: col.colBold? selectRowBackground : undefined,textAlign:col.type==='image'?'center':undefined}}>
                        {renderType(col.type,row[col.field],col.field)}
                    </TableCell>
                })}
                {actions?(
                    <TableCell style={simpleTableStyle.tableCell}>
                        {actions.map(act=>(
                            <IconButton key={act.icon+act.text} onClick={(evt)=>{
                                evt.preventDefault();
                                evt.stopPropagation();
                                act.onClick(row)}
                            } {...(act.buttonProps||{})}>
                                {!!act.icon?(act.icon):null}
                                {!!act.text?(act.text):null}
                            </IconButton>
                        ))}
                    </TableCell>
                ):null}
            </TableRow>
        )
    }))



    return (
        <div style={{display: 'flex', overflow:'auto'}}>
            {filterByField?(
                <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'flex-end', alignItems:'center'}}>
                    {'Filtro: '}{filter?(<span style={{fontWeight:'bold'}}>{filter} <Button style={{color:'#F00'}} onClick={()=>setFilter(null)}>{'X'}</Button></span>):(
                    <Select value={filter} onChange={(evt)=>!evt.target.value?setFilter(null):setFilter(evt.target.value)}>
                        <MenuItem key={'NoFilter'} value={null}>{'Sem Filtro'}</MenuItem>
                        {Object.keys(filterList).map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
                    </Select>
                )}

                </div>
            ):null}

        <Table className={'mobileTable'} style={{...simpleTableStyle.tableBox, ...styles}}>
                {/*<TableHead>*/}
                {/*    <TableRow >*/}
                {/*        {cols.map(col=>{*/}
                {/*            return <TableCell scope="col" {...{"data-label":col.label}} style={simpleTableStyle.tableCell} key={col.name+col.label}>{col.label}</TableCell>*/}
                {/*        })}*/}
                {/*        {actions?(*/}
                {/*            <TableCell  style={simpleTableStyle.tableCell}>{'Ações'}</TableCell>*/}
                {/*        ):null}*/}
                {/*    </TableRow>*/}
                {/*</TableHead>*/}
                <EnhancedTableHead
                    headCells={cols}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={disabledOrder? undefined: handleRequestSort}
                    disabledOrder={disabledOrder}
                />
                <TableBody>
                    {tableBody}
                </TableBody>
            </Table>
        </div>
    );
}
