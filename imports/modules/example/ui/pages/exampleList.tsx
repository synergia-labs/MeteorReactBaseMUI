import React from 'react';
import {withTracker} from "meteor/react-meteor-data";
import {exampleApi} from "../../api/exampleApi";
import SimpleTable from "../../../../ui/components/SimpleTable/SimpleTable";
import _ from 'lodash';

import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

import {ReactiveVar} from "meteor/reactive-var";
import {initSearch} from '../../../../libs/searchUtils';
import {isMobile} from "/imports/libs/deviceVerify";

import {appStyles} from "/imports/ui/theme/styles";

import Typography from '@material-ui/core/Typography';

interface IExampleList {
    examples:object[];
    history:object;
    remove:(doc:object)=>void;
    showDialog:(dialog:object)=>void;
    onSearch:(text?:string)=>void;
    total:number;
    loading:boolean;
    setPage:(page:number)=>void;
    setPageSize:(pageSize:number)=>void;
    searchBy?:any;
    pageProperties:object;
}

const ExampleList = ({examples,history,remove,showDialog,onSearch,total,loading,setPage,setPageSize,searchBy,pageProperties}:IExampleList) => {

    const onClick = (event,id,doc,showDialog) => {
        history.push('/example/view/'+id);
    }

    const callRemove=(doc)=>{
        const dialogOptions = {
            icon:<Delete />,
            title:'Remover exemplo',
            content:()=><p>{`Deseja remover o exemplo "${doc.title}"?`}</p>,
            actions:({closeDialog})=>[
                <Button
                    color={'secondary'}
                    onClick={closeDialog}
                >{'Não'}</Button>,
                <Button
                    onClick={()=>{
                            remove(doc);
                            closeDialog();

                    }}
                    color={'primary'}>{'Sim'}</Button>,
            ]
        };
        showDialog(dialogOptions)
    }


    const [text,setText] = React.useState(searchBy||'')
    const change = (e) => {
        if(text.length!==0&&e.target.value.length===0) {
            onSearch();
        }
        setText(e.target.value);
    }
    const keyPress = (e, a) => {

        if (e.key === 'Enter') {
            if (text && text.trim().length > 0) {
                onSearch(text.trim());
            } else {
                onSearch();
            }
        }
    };

    const click = (...e) => {
        if (text && text.trim().length > 0) {
            onSearch(text.trim());
        } else {
            onSearch();
        }

    }

    return (
        <Container>
            <Typography style={appStyles.title}>{'Lista de Exemplos'}</Typography>
            <TextField value={text} onChange={change} onKeyPress={keyPress}  placeholder='Pesquisar...'
                   action={{ icon: 'search',onClick:click }}
            />
            <SimpleTable
                schema={_.pick(exampleApi.schema,['image','title','description'])}
                data={examples}
                onClick={onClick}
                actions={[{icon:<Delete color={'primary'} />,onClick:callRemove}]}
            />
            <div style={appStyles.containerList}>
                <Fab
                    onClick={()=>history.push('/example/create')}
                    color={'primary'}>
                    <Add />
                </Fab>
            </div>
        </Container>
        )

}



export const subscribeConfig = new ReactiveVar({
    pageProperties: {
        currentPage: 1,
        pageSize: 25,
    },
    sortProperties: { field: 'createdat', sortAscending: true },
    filter: {},
    searchBy:null,
});

const exampleSearch = initSearch(
    exampleApi, // API
    subscribeConfig, // ReactiveVar subscribe configurations
    ['title','description'], // list of fields
);


export const ExampleListContainer = withTracker((props) => {

    //Reactive Search/Filter
    const config = subscribeConfig.get();
    const sort = {
        [ config.sortProperties.field ]:
            config.sortProperties.sortAscending ? 1 : -1,
    };
    exampleSearch.setActualConfig(config);

    //Subscribe parameters
    const filter = {
        ...config.filter,
    };
    const limit = config.pageProperties.pageSize*config.pageProperties.currentPage;
    const skip = (config.pageProperties.currentPage-1)*config.pageProperties.pageSize;

    //Reactive Counter
    const subHandleCounter = exampleApi.subscribe('defaultCounter',filter);
    const examplesCount = subHandleCounter?(subHandleCounter.ready()?exampleApi.counts.findOne():null):0;

    //Collection Subscribe
    const subHandle = exampleApi.subscribe('default',filter,{sort,limit,skip});
    const examples = subHandle.ready()?exampleApi.find(filter,{sort}).fetch():[]


    return ({
        examples,
        loading:!!subHandle&&!subHandle.ready(),
        remove:(doc)=>{
            exampleApi.remove(doc,(e,r)=>{
                if(!e) {
                    props.showSnackBar({
                        type:'success',
                        title:'Operação realizada!',
                        message: `O exemplo foi removido com sucesso!`,
                    })
                } else {
                    console.log('Error:',e);
                    props.showSnackBar({
                        type:'error',
                        title:'Operação não realizada!',
                        message: `Erro ao realizar a operação: ${e.message}`,
                    })
                }

            })
        }
        searchBy:config.searchBy,
        onSearch: exampleSearch.onSearch,
        total:examplesCount?examplesCount.count:examples.length,
        pageProperties:config.pageProperties,
        setPage: (page=1) => {
            config.pageProperties.currentPage = page;
            subscribeConfig.set(config);
        },
        setPageSize: (size=25) => {
            config.pageProperties.pageSize = size;
            subscribeConfig.set(config);
        },
    })
})(ExampleList)
