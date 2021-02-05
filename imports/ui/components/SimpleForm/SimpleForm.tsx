import React, { Component } from 'react'
import {hasValue, isBoolean} from "../../../libs/hasValue";
import _ from "lodash";
import shortid from 'shortid';
import { ReactSortable } from "react-sortablejs";

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import Add from "@material-ui/icons/Add";
import Fab from '@material-ui/core/Fab';
import DragHandle from "@material-ui/icons/DragHandle";
import Delete from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import {simpleFormStyle} from "./SimpleFormStyle";
import {simpleLabelStyle} from "/imports/ui/components/SimpleLabelView/SimpleLabelViewStyle";

interface ISubFormArrayComponent {
    reactElement:any;
    childrensElements:any;
    name:string;
    mode:string;
    fieldSchema:object;
    initialValue?:any;
    setDoc: ({})=>void;
    setFieldMethods: ({})=>any;

}

const SubFormArrayComponent = ({reactElement,childrensElements,name,initialValue,...props}:ISubFormArrayComponent) => {

    const [error,setError] = React.useState(false)
    const [value,setValue] = React.useState(initialValue||[])
    //const [stringValue,setStringValue] = React.useState('')
    const [mode,setMode] = React.useState(props.mode||'edit')
    const [changeByUser,setChangeByUser] = React.useState(false)

    const formRefs = {};

    React.useEffect(() => {
        if(!changeByUser&&(!value||value.length===0 || !_.isEqual(value , initialValue))&&(initialValue||[]).length>0) {
            setValue(initialValue);
        }
        if(mode!==props.mode) {
            setMode(props.mode);
            if(props.mode==='view') {
                setChangeByUser(false);
            }

            if(props.mode==='view'&&error) {
                setError(false);
            }
        }
    });

    props.setFieldMethods({
        validateRequired: (hasError:boolean)=>{
            if(!hasValue(value)) {
                setError(true);
                return false;
            }
            return true;

        },
        validateRequiredSubForm:()=>{
            let result = true;
            Object.keys(formRefs).forEach(key=>{
                const subFormRef = formRefs[key];
                if(!subFormRef.validate()) {
                    setError(true);
                    result = false;
                }
            });

            return result;
        },
        setValue:(newValue:any)=>{
            if(hasValue(newValue)) {
                setValue(newValue);
                return true;
            }
            return false;

        },
        setMode:(newMode:string)=>{
            if(newMode!==mode) {
                setMode(newMode);
                return true;
            }
            return false;
        },
        setError:(value)=>{
            setError(value);
        },
    })



    const onChange = (e,fieldData={})=>{
        const field = {...(props.fieldSchema?props.fieldSchema:{}),...(e?e.target:{}),
            ...(fieldData&&fieldData.name?fieldData:{})};

        if(props.fieldSchema&&props.fieldSchema.type===Boolean&&isBoolean(field.checked)) {
            setValue(field.checked);
            props.setDoc({[name]:field.checked});
            if(!changeByUser&&(field.value||[]).length>0) {
                setChangeByUser(true);
            }
            if(reactElement.props.onChange) {
                reactElement.props.onChange(e,{...field,value:field.checked});
            }
        } else {
            setValue(field.value);
            props.setDoc({[name]:field.value});
            if(!changeByUser&&(field.value||[]).length>0) {
                setChangeByUser(true);
            }
            if(reactElement.props.onChange) {
                reactElement.props.onChange(e,field);
            }
        }

        if(hasValue(field.value)) {
            setError(false);
        }



    }

    const onSortDocs = (newList) => {

        const list = newList.map(l=>{
            delete l.chosen;
            return l;
        })
        setValue(list);
        onChange({target:{
                value:list,
            }})
    }

    const addSubForm = () => {
        const newValue = (value||[]).filter(subDoc=>subDoc.id);

        newValue.push({
            id:shortid.generate()
        })

        setValue(newValue);
        onChange({target:{
                value:newValue,
            }})
    }

    const onFormChangeHandle = formId => (doc) => {
        const newDoc = (value||[]).map(subDoc=>{
            if(subDoc.id===formId) {
                subDoc = {...subDoc,...doc}
            }

            delete subDoc.chosen;
            return subDoc;
        })

        onChange({target:{
                value:newDoc,
            }})
    }
    const onClickDelete = formId => doc =>{
        let newDoc = (value||[]).filter(subDoc=>subDoc.id!==formId)
        onChange({target:{
                value:newDoc,
            }})
    }

    const label = reactElement.props.label||(props.fieldSchema?props.fieldSchema.label:undefined);

    return (
        <div key={name} style={{backgroundColor:error?'#FFF6F6':undefined,...simpleFormStyle.containerLabel}}>
            <SimpleLabelView label={label}/>
            <div style={simpleFormStyle.containerForm}>

                <ReactSortable
                    disabled={mode==='view'}
                    list={value||[]}
                    setList={onSortDocs}
                    handle={'.dragButton'}
                >
                    {(value||[]).map((subForm,subFormIndex)=>{
                        if(subForm && subForm.id){
                            return (
                                <div key={subForm.id} style={simpleFormStyle.containerSubForm}>
                                    <SimpleForm
                                        isSubForm={true}
                                        ref={refForm=>formRefs[subForm.id]=refForm}
                                        key={subForm.id}
                                        mode={mode}
                                        schema={props.fieldSchema&&props.fieldSchema.subSchema?props.fieldSchema.subSchema:undefined}
                                        doc={subForm}
                                        onFormChange={onFormChangeHandle(subForm.id)}
                                    >
                                        {childrensElements}
                                    </SimpleForm>
                                    {mode!=='view'?(
                                        <div style={simpleFormStyle.buttonForm}>
                                            <IconButton onClick={onClickDelete(subForm.id)}><Delete /></IconButton>
                                        </div>
                                    ):null}
                                    {mode!=='view'?(
                                        <div className={'dragButton'} style={simpleFormStyle.buttonForm}>
                                            <IconButton onClick={onClickDelete(subForm.id)}><DragHandle /></IconButton>
                                        </div>
                                    ):null}

                                </div>
                            )
                        }else{
                            return <div key={'el'+subFormIndex} />
                        }
                    })}

                </ReactSortable>
            <div style={simpleFormStyle.containerItens}>
                {!value||value.length===0||Object.keys(value[0]).length===0?(
                    <div style={simpleFormStyle.containerEmptyItens}>{'Não há itens'}</div>
                ):null}
            </div>
            {mode!=='view'?(<div style={simpleFormStyle.containerAddSubForm}>
                <Fab color="secondary" style={{color:error?'#9F3A38':"#ffffff", ...simpleFormStyle.buttonAddSubForm}} onClick={addSubForm}>
                  <Add/>
                </Fab>
            </div>):null}
          </div>
        </div>
    );
}

interface ISubFormComponent {
    reactElement:any;
    childrensElements:any;
    name:string;
    mode:string;
    fieldSchema:object;
    initialValue?:any;
    setDoc: ({})=>void;
    setFieldMethods: ({})=>any;

}

const SubFormComponent = ({reactElement,childrensElements,name,...props}:ISubFormComponent) => {

    const [error,setError] = React.useState(false)
    const [value,setValue] = React.useState(props.initialValue||{})
    const [mode,setMode] = React.useState(props.mode||'edit')
    const [changeByUser,setChangeByUser] = React.useState(false)

    let formRef = {}

    React.useEffect(() => {

        if(!changeByUser&&(!hasValue(value) || value !== props.initialValue )&&!!hasValue(props.initialValue)) {
            setValue(props.initialValue);
        }


        if(mode!==props.mode) {
            setMode(props.mode);

            if(props.mode==='view') {
                setChangeByUser(false);
            }
            if(props.mode==='view'&&error) {
                setError(false);
            }
        }



    });

    props.setFieldMethods({
        validateRequired: ()=>{
            if(!hasValue(value)) {
                setError(true);
                return false;
            }
            return true;

        },
        validateRequiredSubForm:()=>{
            let result = true;

            if(!formRef.validate()) {
                setError(true);
                result = false;
            }

            return result;
        },
        setValue:(newValue:any)=>{
            if(hasValue(newValue)) {
                setValue(newValue);
                return true;
            }
            return false;

        },
        setMode:(newMode:string)=>{
            if(newMode!==mode) {
                setMode(newMode);
                return true;
            }
            return false;
        },
        setError:(value)=>{
            setError(value);
        },
    })



    const onChange = (e,fieldData={})=>{
        const field = {...(props.fieldSchema?props.fieldSchema:{}),...(e?e.target:{}),
            ...(fieldData&&fieldData.name?fieldData:{})};

        if(props.fieldSchema&&props.fieldSchema.type===Boolean&&isBoolean(field.checked)) {
            setValue(field.checked);
            props.setDoc({[name]:field.checked});
            if(!changeByUser) {
                setChangeByUser(true);
            }
            if(reactElement.props.onChange) {
                reactElement.props.onChange(e,{...field,value:field.checked});
            }
        } else {
            setValue(field.value);
            props.setDoc({[name]:field.value});
            if(!changeByUser) {
                setChangeByUser(true);
            }
            if(reactElement.props.onChange) {
                reactElement.props.onChange(e,field);
            }
        }

        if(hasValue(field.value)) {
            setError(false);
        }



    }

    const onFormChangeHandle = (doc) => {
        onChange({target:{
                value:doc,
            }})
    }

    const label = reactElement.props.label||(props.fieldSchema?props.fieldSchema.label:undefined);
    return (
        <div key={name} style={simpleFormStyle.containerLabel}>
            <SimpleLabelView label={label}/>
            <div style={simpleFormStyle.containerChildrenElements}>
                <SimpleForm
                    isSubForm={true}
                    ref={fRef=>formRef=fRef}
                    mode={mode}
                    schema={props.fieldSchema&&props.fieldSchema.subSchema?props.fieldSchema.subSchema:undefined}
                    doc={value}
                    onFormChange={onFormChangeHandle}
                >
                    {childrensElements}
                </SimpleForm>
            </div>

        </div>
    );
}



interface IFieldComponent {
    reactElement:any;
    name:string;
    mode:string;
    fieldSchema:object;
    initialValue?:any;
    setDoc: ({})=>void;
    setFieldMethods: ({})=>any;

}
const FieldComponent = ({reactElement,name,...props}:IFieldComponent) => {

    const [error,setError] = React.useState(false)
    const [value,setValue] = React.useState(props.initialValue||'')
    const [mode,setMode] = React.useState(props.mode||'edit')
    const [changeByUser,setChangeByUser] = React.useState(false)

    React.useEffect(() => {

        if(!changeByUser&&(!hasValue(value) || value !== props.initialValue )&&!!hasValue(props.initialValue)) {
            setValue(props.initialValue);
        }

        if(mode!==props.mode) {
            setMode(props.mode);
            if(props.mode==='view') {
                setChangeByUser(false);
            }

            if(props.mode==='view'&&error) {
                setError(false);
            }
        }
    }, [props.mode,props.initialValue]);

    props.setFieldMethods({
        validateRequired: ()=>{
            if(!hasValue(value)) {
                setError(true);
                return false;
            }
            return true;

        },
        setValue:(newValue:any)=>{
            if(hasValue(newValue)) {
                setValue(newValue);
                return true;
            }
            return false;

        },
        setMode:(newMode:string)=>{
            if(newMode!==mode) {
                setMode(newMode);
                return true;
            }
            return false;
        },
        setError:(value)=>{
            setError(value);
        },
    })



    const onChange = (e,fieldData={}) =>{

        const field = {...(props.fieldSchema?props.fieldSchema:{}),...(e?e.target:{}),
            ...(fieldData&&fieldData.name?fieldData:{})};

        if(props.fieldSchema&&props.fieldSchema.type===Boolean&&isBoolean(field.checked)) {
            setValue(field.checked);
            props.setDoc({[name]:field.checked});
            if(!changeByUser) {
                setChangeByUser(true);
            }
            if(reactElement.props.onChange) {
                reactElement.props.onChange(e,{...field,value:field.checked});
            }
        } else {
            setValue(field.value);
            props.setDoc({[name]:field.value});
            if(!changeByUser) {
                setChangeByUser(true);
            }
            if(reactElement.props.onChange) {
                reactElement.props.onChange(e,field);
            }
        }

        if(hasValue(field.value)) {
            setError(false);
        }

    }

    return (React.cloneElement(reactElement, { value, onChange,
        error:error&&(!value||value.length===0)?true:undefined,
        label:reactElement.props.label||(props.fieldSchema?props.fieldSchema.label:undefined),
        disabled:mode==='view',
        readOnly:mode==='view',
        schema: props.fieldSchema,
        checked:(props.fieldSchema&&props.fieldSchema.type===Boolean?value:undefined)
    }))
}

interface ISimpleFormProps {
    schema: [] | {};
    onSubmit?:(submit:()=>void)=> void;
    isSubForm?:boolean;
    mode?:string;
    children?:object[];
    doc?:object;
    loading?:boolean;
    styles?:object;
    onFormChange:(onChange:()=>void)=> void;
}

class SimpleForm extends Component<ISimpleFormProps> {

    docValue = {};
    fields = {};
    state = {error:null,
        mode:this.props.mode||'edit',
        formElements:null,
    };

    setDoc = (newDoc) => {
        this.docValue = {...this.docValue,...newDoc};
        if(this.props.onFormChange) {
            this.props.onFormChange(this.docValue)
        }
    }

    getDoc = () => {
        return this.docValue;
    }


    wrapElement = (element,index) => {
        const self=this;



        if(!element.type) {
            return element;
        }

        if(element.props.submit) {
            return React.cloneElement(element, {
                onClick:this.onSubmitForm
            })
        } else if(element.type&&element.type.displayName&&element.type.displayName.indexOf('Button')!==-1) {
            return element;
        }
        self.fields[element.props.name]={type:element.type.name,};
        if(element.props.formType==='subform'&&!!element.props.name) {
            return <SubFormComponent
                name={element.props.name}
                childrensElements={element.props.children}
                key={element.props.name?element.props.name:('el'+index)}
                fieldSchema={self.props.schema?self.props.schema[element.props.name]:undefined}
                initialValue={self.props.doc?self.props.doc[element.props.name]:''}
                reactElement={element}
                setDoc={this.setDoc}
                mode={self.props.mode}
                setFieldMethods={(methods)=>self.fields[element.props.name]={...self.fields[element.props.name],...methods}}
            />

        } else if(element.props.formType==='subformArray'&&!!element.props.name) {
            return <SubFormArrayComponent
                name={element.props.name}
                childrensElements={element.props.children}
                key={element.props.name?element.props.name:('el'+index)}
                fieldSchema={self.props.schema?self.props.schema[element.props.name]:undefined}
                initialValue={self.props.doc?self.props.doc[element.props.name]:''}
                reactElement={element}
                setDoc={this.setDoc}
                mode={self.props.mode}
                setFieldMethods={(methods)=>self.fields[element.props.name]={...self.fields[element.props.name],...methods}}
            />

        } else if(element.type.name==='FormGroup'||element.type.name==='Segment'||React.Children.toArray(element.props.children).length>0) {
            const subElements = React.Children.toArray(element.props.children).map((element,index)=>{
                return self.wrapElement(element,index)
            });
            const newElement = React.cloneElement(element, { key:'el'+index, children: subElements })
            return newElement;
        } else {
            return <FieldComponent
                name={element.props.name}
                key={element.props.name?element.props.name:('el'+index)}
                fieldSchema={self.props.schema?self.props.schema[element.props.name]:undefined}
                initialValue={self.props.doc?self.props.doc[element.props.name]:''}
                reactElement={element}
                setDoc={this.setDoc}
                mode={self.props.mode}
                setFieldMethods={(methods)=>self.fields[element.props.name]={...self.fields[element.props.name],...methods}}
            />
        }

    }

    initFormElements = (update=false) => {
        const self = this;

        let elements = React.Children.toArray(this.props.children);
        const ListaOfElements = elements.map((element,index)=>{
            return this.wrapElement(element,index)
        })

        return ListaOfElements;

    }

    validate = () => {
        const fielsWithError:any = [];

        if(this.props.schema) {
            Object.keys(this.fields).forEach(field=>{

                if(this.props.schema[field]&&this.props.schema[field].subSchema){
                    if(this.props.schema[field]&&!this.props.schema[field].optional&&!this.fields[field].validateRequired()
                        &&fielsWithError.indexOf(this.props.schema[field].label)===-1){
                        fielsWithError.push(this.props.schema[field].label);
                    }
                    if(this.fields[field].validateRequiredSubForm&&!this.fields[field].validateRequiredSubForm()
                        &&fielsWithError.indexOf(this.props.schema[field].label)===-1){
                        fielsWithError.push(this.props.schema[field].label);
                    }


                } else if(this.props.schema[field]&&!this.props.schema[field].optional&&!this.fields[field].validateRequired()
                    &&fielsWithError.indexOf(this.props.schema[field].label)===-1){
                    fielsWithError.push(this.props.schema[field].label);
                }

                //Validate Schema
                if(this.props.schema[field]&&this.props.schema[field].validate&&!this.props.schema[field].validate(this.docValue[field] ,this.docValue)){
                    fielsWithError.push(this.props.schema[field].label);
                }
                //Validate Date Format
                if(this.props.schema[field]&&this.props.schema[field].type===Date&&!(this.getDoc()[field] instanceof Date && !isNaN(this.getDoc()[field].valueOf()))) {
                    fielsWithError.push(this.props.schema[field].label)
                    this.fields[field]&&this.fields[field].setError&&this.fields[field].setError(true);
                }

            })
        }

        if(fielsWithError.length>0) {
            this.setState({error:fielsWithError});
        } else if(!!this.state.error) {
            this.setState({error:null});
        }

        return fielsWithError.length===0;
    }

    onSubmitForm = (event,...others) => {
        if(this.props.onSubmit&&this.validate()) {
            this.props.onSubmit(this.docValue)
        } else {
            console.log('Erro no formulário')
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if((!_.isEqual(this.props.doc,prevProps.doc))||(this.props.mode!==prevProps.mode)) {
            const update=true;
            this.docValue = {...this.docValue,...(this.props.doc||{})};
            this.setState({formElements:this.initFormElements(update)});
            this.setState({mode:this.props.mode});
        }

        if((this.props.mode!==prevProps.mode)&&!!this.state.error) {
            this.setState({error:null});
        }

    }

    render() {

        this.formElements = this.initFormElements();

        return (
            <div style={this.props.style||{width:'100%'}}>
                {this.state.error?(
                    <Alert key={'ErrorMSG'} severity="warning">
                        {'Há erros nos seguintes campos: '+this.state.error.join(', ')}
                    </Alert>
                ):null}
                {this.formElements}
            </div>
        )
    }
}
export default SimpleForm
