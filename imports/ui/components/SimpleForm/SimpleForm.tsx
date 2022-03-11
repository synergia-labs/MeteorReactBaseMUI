import React, { Component, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';

import _ from 'lodash';
import shortid from 'shortid';

import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';

import Add from '@mui/icons-material/Add';
import DragHandle from '@mui/icons-material/DragHandle';
import Delete from '@mui/icons-material/Delete';

import { hasValue, isBoolean } from '../../../libs/hasValue';

import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';

import { simpleFormStyle } from './SimpleFormStyle';



interface ISubFormArrayComponent {
    reactElement: any;
    childrensElements: any;
    name: string;
    mode: string;
    fieldSchema: object;
    initialValue?: any;
    setDoc: ({}) => void;
    setFieldMethods: ({}) => any;
}

const SubFormArrayComponent = ({ reactElement, childrensElements, name, initialValue, ...props }: ISubFormArrayComponent) => {
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState(initialValue || []);
    // const [stringValue,setStringValue] = React.useState('')
    const [mode, setMode] = React.useState(props.mode || 'edit');
    const [changeByUser, setChangeByUser] = React.useState(false);

    const formRefs = {};

    React.useEffect(() => {
        if (
            !changeByUser &&
            (!value || value.length === 0 || !_.isEqual(value, initialValue)) &&
            (initialValue || []).length > 0
        ) {
            setValue(initialValue);
        }
        if (mode !== props.mode) {
            setMode(props.mode);
            if (props.mode === 'view') {
                setChangeByUser(false);
            }

            if (props.mode === 'view' && error) {
                setError(false);
            }
        }
    });

    props.setFieldMethods({
        validateRequired: (hasError: boolean) => {
            if (!hasValue(value)) {
                setError(true);
                return false;
            }
            return true;
        },
        validateRequiredSubForm: () => {
            let result = true;
            Object.keys(formRefs).forEach((key) => {
                const subFormRef = formRefs[key];
                if (!subFormRef.validate()) {
                    setError(true);
                    result = false;
                }
            });

            return result;
        },
        setValue: (newValue: any) => {
            if (hasValue(newValue)) {
                setValue(newValue);
                return true;
            }
            return false;
        },
        clear: () => {
            setValue(undefined);
            return true;
        },
        setMode: (newMode: string) => {
            if (newMode !== mode) {
                setMode(newMode);
                return true;
            }
            return false;
        },
        setError: (valueErr: boolean) => {
            setError(valueErr);
        },
    });

    const onChange = (e, fieldData = {}) => {
        const field = {
            ...(props.fieldSchema ? props.fieldSchema : {}),
            ...(e ? e.target : {}),
            ...(fieldData && fieldData.name ? fieldData : {}),
        };

        if (props.fieldSchema && props.fieldSchema.type === Boolean &&
            isBoolean(field.checked)) {
            setValue(field.checked);
            props.setDoc({[name]: field.checked});
            if (!changeByUser && (field.value || []).length > 0) {
                setChangeByUser(true);
            }
            if (reactElement.props.onChange) {
                reactElement.props.onChange(e, {...field, value: field.checked});
            }
        } else {
            setValue(field.value);
            props.setDoc({[name]: field.value});
            if (!changeByUser && (field.value || []).length > 0) {
                setChangeByUser(true);
            }
            if (reactElement.props.onChange) {
                reactElement.props.onChange(e, field);
            }
        }

        if (hasValue(field.value)) {
            setError(false);
        }
    };

    const onSortDocs = (newList) => {
        const list = newList.map((l) => {
            delete l.chosen;
            return l;
        });
        setValue(list);
        onChange({
            target: {
                value: list,
            },
        });
    };

    const addSubForm = () => {
        const newValue = (value || []).filter(subDoc => subDoc.id);

        newValue.push({
            id: shortid.generate(),
        });

        setValue(newValue);
        onChange({
            target: {
                value: newValue,
            },
        });
    };

    const onFormChangeHandle = formId => (doc) => {
        const newDoc = (value || []).map((subDoc) => {
            if (subDoc.id === formId) {
                subDoc = {...subDoc, ...doc};
            }

            delete subDoc.chosen;

            return subDoc;
        });

        onChange({
            target: {
                value: newDoc,
            },
        });
    };

    const onClickDelete = formId => (doc) => {
        const newDoc = (value || []).filter(subDoc => subDoc.id !== formId);
        onChange({
            target: {
                value: newDoc,
            },
        });
    };

    const label = props.label;

    return (
        <div
            key={ name }
            style={{
                backgroundColor: error
                    ? '#FFF6F6'
                    : undefined, ...simpleFormStyle.containerLabel,
            }}
        >
            <SimpleLabelView label={ label }/>
            <div style={ simpleFormStyle.containerForm }>
                <ReactSortable
                    disabled={ mode === 'view' }
                    list={ value || [] }
                    setList={ onSortDocs }
                    handle={ '.dragButton' }
                >
                    { (value || []).map((subForm, subFormIndex) => {
                        if (subForm && subForm.id) {
                            return (
                                <div key={ subForm.id } style={ simpleFormStyle.containerSubForm }>
                                    <SimpleForm
                                        isSubForm
                                        ref={ refForm => formRefs[subForm.id] = refForm }
                                        key={ subForm.id }
                                        mode={ mode }
                                        schema={
                                            props.fieldSchema &&
                                            props.fieldSchema.subSchema
                                                ? props.fieldSchema.subSchema
                                                : undefined
                                        }
                                        doc={ subForm }
                                        onFormChange={ onFormChangeHandle(subForm.id) }
                                    >
                                        { childrensElements }
                                    </SimpleForm>

                                    { mode !== 'view' ? (
                                        <div style={ simpleFormStyle.buttonForm }>
                                            <IconButton onClick={ onClickDelete(subForm.id) }><Delete/></IconButton>
                                        </div>
                                    ) : null }
                                    { mode !== 'view' ? (
                                        <div className={ 'dragButton' } style={ simpleFormStyle.buttonForm }>
                                            <IconButton onClick={ onClickDelete(subForm.id) }><DragHandle/></IconButton>
                                        </div>
                                    ) : null }
                                </div>
                            );
                        }
                        return <div key={ `el${ subFormIndex }` }/>;
                    })}
                </ReactSortable>

                <div style={ simpleFormStyle.containerItens }>
                    { !value || value.length === 0 || Object.keys(value[0]).length === 0 ? (
                        <div style={ simpleFormStyle.containerEmptyItens }>{'Não há itens'}</div>
                    ) : null }
                </div>

                { mode !== 'view' ? (
                    <div style={ simpleFormStyle.containerAddSubForm }>
                        <Fab
                            id={ 'addSubForm' }
                            color="secondary"
                            style={{
                                color: error
                                    ? '#9F3A38'
                                    : '#ffffff', ...simpleFormStyle.buttonAddSubForm,
                            }}
                            onClick={ addSubForm }
                        >
                            <Add/>
                        </Fab>
                    </div>
                ) : null }
            </div>
        </div>
    );
};


interface ISubFormComponent {
    reactElement: any;
    childrensElements: any;
    name: string;
    mode: string;
    fieldSchema: object;
    initialValue?: any;
    setDoc: ({}) => void;
    setFieldMethods: ({}) => any;
}

const SubFormComponent = ({ reactElement, childrensElements, name, ...props }: ISubFormComponent) => {
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState(props.initialValue || {});
    const [mode, setMode] = React.useState(props.mode || 'edit');
    const [changeByUser, setChangeByUser] = React.useState(false);

    let formRef = {};

    React.useEffect(() => {
        if (
            !changeByUser &&
            (!hasValue(value) || value !== props.initialValue) &&
            !!hasValue(props.initialValue)
        ) {
            setValue(props.initialValue);
        }

        if (mode !== props.mode) {
            setMode(props.mode);

            if (props.mode === 'view') {
                setChangeByUser(false);
            }
            if (props.mode === 'view' && error) {
                setError(false);
            }
        }
    });

    props.setFieldMethods({
        validateRequired: () => {
            if (!hasValue(value)) {
                setError(true);
                return false;
            }
            return true;
        },
        validateRequiredSubForm: () => {
            let result = true;

            if (!formRef.validate()) {
                setError(true);
                result = false;
            }

            return result;
        },
        setValue: (newValue: any) => {
            if (hasValue(newValue)) {
                setValue(newValue);
                return true;
            }
            return false;
        },
        setMode: (newMode: string) => {
            if (newMode !== mode) {
                setMode(newMode);
                return true;
            }
            return false;
        },
        setError: (value) => {
            setError(value);
        },
    });

    const onChange = (e, fieldData = {}) => {
        const field = {
            ...(props.fieldSchema ? props.fieldSchema : {}),
            ...(e ? e.target : {}),
            ...(fieldData && fieldData.name ? fieldData : {}),
        };

        if (props.fieldSchema && props.fieldSchema.type === Boolean &&
            isBoolean(field.checked)) {
            setValue(field.checked);
            props.setDoc({[name]: field.checked});
            if (!changeByUser) {
                setChangeByUser(true);
            }
            if (reactElement.props.onChange) {
                reactElement.props.onChange(e, {...field, value: field.checked});
            }
        } else {
            setValue(field.value);
            props.setDoc({[name]: field.value});
            if (!changeByUser) {
                setChangeByUser(true);
            }
            if (reactElement.props.onChange) {
                reactElement.props.onChange(e, field);
            }
        }

        if (hasValue(field.value)) {
            setError(false);
        }
    };

    const onFormChangeHandle = (doc) => {
        onChange({
            target: {
                value: doc,
            },
        });
    };

    const label = props.label;

    return (
        <div key={ name } style={ simpleFormStyle.containerLabel }>
            <SimpleLabelView label={ label }/>
            <div style={ simpleFormStyle.containerChildrenElements }>
                <SimpleForm
                    isSubForm
                    ref={ fRef => formRef = fRef }
                    mode={ mode }
                    schema={
                        props.fieldSchema &&
                        props.fieldSchema.subSchema
                            ? props.fieldSchema.subSchema
                            : undefined
                    }
                    doc={ value }
                    onFormChange={ onFormChangeHandle }
                >
                    { childrensElements }
                </SimpleForm>
            </div>
        </div>
    );
};


interface IFieldComponent {
    reactElement: any;
    name: string;
    mode: string;
    fieldSchema: object;
    initialValue?: any;
    setDoc: ({}) => void;
    setFieldMethods: ({}) => any;
}

const FieldComponent = ({reactElement, name, ...props}: IFieldComponent) => {
    const [error, setError] = React.useState(false);
    const [value, setValue] = React.useState(hasValue(props.initialValue) ? props.initialValue : '');
    const [mode, setMode] = React.useState(props.mode || 'edit');
    const [changeByUser, setChangeByUser] = React.useState(false);

    React.useEffect(() => {
        if (
            !changeByUser && (!hasValue(value) ||
                value !== props.initialValue) &&
            hasValue(props.initialValue)
        ) {
            setValue(props.initialValue);
        }

        if (mode !== props.mode) {
            setMode(props.mode);
            if (props.mode === 'view') {
                setChangeByUser(false);
            }

            if (props.mode === 'view' && error) {
                setError(false);
            }
        }
    }, [props.mode, props.initialValue]);

    props.setFieldMethods({
        validateRequired: () => {
            if (!hasValue(value) && (!props.fieldSchema||!props.fieldSchema.visibilityFunction||
                (!!props.fieldSchema.visibilityFunction&&props.fieldSchema.visibilityFunction(props.getDoc()))
            )) {
                setError(true);
                return false;
            }
            return true;
        },
        setValue: (newValue: any) => {
            try {
                setValue(newValue);
                return true;
            } catch (e) {
                console.log('Error', e);
                return false;
            }
        },
        clear: () => {
            setChangeByUser(true);
            setValue('');
            return true;
        },
        setMode: (newMode: string) => {
            if (newMode !== mode) {
                setMode(newMode);
                return true;
            }
            return false;
        },
        setError: (value) => {
            setError(value);
        },
    });

    const onChange = (e, fieldData = {}) => {
        const field = {
            ...(props.fieldSchema ? props.fieldSchema : {}),
            ...(e ? e.target : {}),
            ...(fieldData && fieldData.name ? fieldData : {}),
        };

        if (props.fieldSchema && props.fieldSchema.type === Boolean && isBoolean(field.checked)) {
            setValue(field.checked);
            props.setDoc({[name]: field.checked});
            if (!changeByUser) {
                setChangeByUser(true);
            }
            if (reactElement.props.onChange) {
                reactElement.props.onChange(e, {...field, value: field.checked});
            }
        } else {
            setValue(field.value);
            props.setDoc({[name]: field.value});
            if (!changeByUser) {
                setChangeByUser(true);
            }
            if (reactElement.props.onChange) {
                reactElement.props.onChange(e, field);
            }
        }

        if (hasValue(field.value)) {
            setError(false);
        }
    };

    return (React.cloneElement(reactElement, {
        value,
        onChange,
        error: error && (!value || value.length === 0) ? true : undefined,
        label: props.label,
        disabled: mode === 'view',
        readOnly: mode === 'view' || !!reactElement.props &&
            !!reactElement.props.readOnly || !!props.fieldSchema &&
            !!props.fieldSchema.readOnly,
        schema: props.fieldSchema,
        checked: (props.fieldSchema && props.fieldSchema.type === Boolean
            ? value
            : undefined),
    }));
};


interface ISimpleFormProps {
    schema: [] | {};
    onSubmit?: (submit: () => void) => void;
    isSubForm?: boolean;
    mode?: string;
    children?: object[];
    doc?: object;
    loading?: boolean;
    styles?: object;
    errorStyles?: object;
    onFormChange: (onChange: () => void) => void;
    showNotification: (data: {
        type: string;
        title: string;
        description: string;
    }) => void;
}


class SimpleForm extends Component<ISimpleFormProps> {
    docValue = {...(this.props.doc || {})};
    fields = {};
    hiddenFields = {};
    state = {
        error: null,
        mode: this.props.mode || 'edit',
        open: true,
        fieldsRequired: true,
    };

    clearForm = () => {
        const self = this;
        this.docValue = {};
        Object.keys(this.fields).forEach(field => {
            if (this.fields[field].clear) {
                const clear = this.fields[field].clear();
            }
        });
        this.initFormElements(true);
    };

    setDoc = (newDoc) => {

        const self = this;
        this.docValue = {...this.docValue, ...newDoc};
        let hasVisibilityUpdate = false;
        Object.keys(this.hiddenFields).forEach(field => {
            if (this.props.schema[field] &&
                this.props.schema[field].visibilityFunction(this.docValue)) {
                hasVisibilityUpdate = true;
                this.fields[field] = this.hiddenFields[field];
                delete this.hiddenFields[field];

            }
        });
        Object.keys(this.fields).forEach(field => {
            if (this.props.schema[field] &&
                this.props.schema[field].visibilityFunction &&
                !this.props.schema[field].visibilityFunction(this.docValue)) {
                hasVisibilityUpdate = true;
                this.hiddenFields[field] = this.fields[field];
                delete this.fields[field];
            }
        });
        if (hasVisibilityUpdate) {
            this.formElements = this.initFormElements(true);
            if (self.props.onFormChange) {
                const newDoc = {...self.docValue};
                if (self.props.submitVisibleFields) {
                    const visibleFiedls = Object.keys(self.fields);
                    Object.keys(newDoc).forEach(field => {
                        if (visibleFiedls.indexOf(field) === -1) {
                            delete newDoc[field];
                        }
                    });
                }

                this.docValue = {...newDoc};
                self.props.onFormChange(newDoc);
            }
        } else {
            if (this.props.onFormChange) {

                this.props.onFormChange(this.docValue);
            }
        }


        let change = !!this.fieldsRequired ;
        this.fieldsRequired = true;
        Object.keys(this.fields).forEach(field => {
            if (this.props.schema[field] &&
                !this.props.schema[field].optional &&
                !hasValue(this.docValue[field])) {
                    this.fieldsRequired = false;

            }
        });

        if(this.fieldsRequired !== change){
            this.initFormElements(true);
        }
    };

    getDoc = () => this.docValue;

    initialValueDefault = (schema) => {
        if (schema && schema.defaultValue) {
            return schema.defaultValue;
        }
        if (schema && schema.type === Date) {
            return undefined;
        }
        return '';
    };



    wrapElement = (element, index) => {
        const self = this;

        if (!element.type &&
            (!self.props.schema || !element.props || !element.props.name || !self.props.schema[element.props.name])) {
            return element;
        }

        if (element.props.submit) {
            return React.cloneElement(element, {
                onClick: this.onSubmitForm,
                disabled: !this.fieldsRequired,
            });
        } else if (
            element.type &&
            element.type.displayName &&
            element.type.displayName.indexOf('Button') !== -1
        ) {
            return element;
        }

        if (self.props.schema && self.props.schema[element.props.name] &&
            self.props.schema[element.props.name].visibilityFunction) {
            if (!self.props.schema[element.props.name].visibilityFunction(
                self.getDoc())) {
                delete self.fields[element.props.name];
                self.hiddenFields[element.props.name] = {
                    name: element.props.name,
                    type: element.type && element.type.name,
                    element: element,
                    index: index,
                };
                return null;
            } else {
                delete self.hiddenFields[element.props.name];
            }
        }

        const optional = !!(self.props.schema&&self.props.schema[element.props.name]&&self.props.schema[element.props.name].optional||element.props.optional);
        const label = element.props.label?element.props.label:(self.props.schema&&self.props.schema[element.props.name]?self.props.schema[element.props.name].label:undefined);

        if (element.props.formType === 'subform' && !!element.props.name) {
            return (<SubFormComponent
                name={element.props.name}
                label={!!label?(!!optional?label:`${label} *`):undefined}
                childrensElements={element.props.children}
                id={element.props.name ? element.props.name : (`el${index}`)}
                key={element.props.name ? element.props.name : (`el${index}`)}
                fieldSchema={self.props.schema
                    ? self.props.schema[element.props.name]
                    : undefined}
                initialValue={self.docValue && self.docValue[element.props.name]
                    ? self.docValue[element.props.name]
                    : this.initialValueDefault(self.props.schema[element.props.name])}
                reactElement={element}
                setDoc={this.setDoc}
                getDoc={this.getDoc}
                mode={self.props.mode}
                setFieldMethods={methods => self.fields[element.props.name] = {...methods}}
            />);
        } else if (element.props.formType === 'subformArray' &&
            !!element.props.name) {
            return (<SubFormArrayComponent
                name={element.props.name}
                label={!!label?(!!optional?label:`${label} *`):undefined}

                childrensElements={element.props.children}
                id={element.props.name ? element.props.name : (`el${index}`)}

                key={element.props.name ? element.props.name : (`el${index}`)}
                fieldSchema={self.props.schema
                    ? self.props.schema[element.props.name]
                    : undefined}
                initialValue={self.docValue && self.docValue[element.props.name]
                    ? self.docValue[element.props.name]
                    : this.initialValueDefault(self.props.schema[element.props.name])}
                reactElement={element}
                setDoc={this.setDoc}
                getDoc={this.getDoc}
                mode={self.props.mode}
                setFieldMethods={methods => self.fields[element.props.name] = {...self.fields[element.props.name], ...methods}}
            />);
        } else if (
            element.type.name === 'FormGroup' ||
            element.type.name === 'Segment' ||
            React.Children.toArray(element.props.children).length > 0
        ) {
            const subElements = React.Children.toArray(element.props.children).
            map((element, index) => self.wrapElement(element, index));
            const newElement = React.cloneElement(element,
                {key: `el${index}`, children: subElements});
            return newElement;
        }

        return (<FieldComponent
            name={element.props.name}
            label={!!label?(!!optional?label:`${label} *`):undefined}
            id={element.props.name ? element.props.name : (`el${index}`)}
            key={element.props.name ? element.props.name : (`el${index}`)}
            fieldSchema={self.props.schema
                ? self.props.schema[element.props.name]
                : undefined}
            initialValue={self.docValue && self.docValue[element.props.name]
                ? self.docValue[element.props.name]
                : (self.props.schema ? self.initialValueDefault(
                    self.props.schema[element.props.name]) : undefined)}
            reactElement={element}
            setDoc={self.setDoc}
            getDoc={this.getDoc}
            mode={self.props.mode}
            setFieldMethods={methods => {
                self.fields[element.props.name] = {...self.fields[element.props.name], ...methods};
            }}
        />);
    };

    initFormElements = (update = false) => {
        const self = this;

        if (!update && this.formElements) {
            return this.formElements;
        }

        this.formElements = null;

        const elements = React.Children.toArray(this.props.children);
        const ListaOfElements = elements.map((element, index) => this.wrapElement(element, index));
        setTimeout(()=>{
            update && self.setState({lastUpdate: new Date()});
        },0)
        return ListaOfElements;
    };

    validate = () => {
        const fielsWithError: any = [];

        if (this.props.schema) {
            Object.keys(this.fields).forEach((field) => {
                if (field === 'undefined') return;

                if (this.props.schema[field] && this.props.schema[field].subSchema) {
                    if (
                        this.props.schema[field] &&
                        !this.props.schema[field].optional &&
                        !this.fields[field].validateRequired() &&
                        fielsWithError.indexOf(this.props.schema[field].label) === -1
                    ) {
                        fielsWithError.push(this.props.schema[field].label);
                    }
                    if (
                        this.fields[field].validateRequiredSubForm &&
                        !this.fields[field].validateRequiredSubForm() &&
                        fielsWithError.indexOf(this.props.schema[field].label) === -1
                    ) {
                        fielsWithError.push(this.props.schema[field].label);
                    }
                } else if (
                    this.props.schema[field] &&
                    !this.props.schema[field].optional &&
                    !this.fields[field].validateRequired() &&
                    fielsWithError.indexOf(this.props.schema[field].label) === -1
                ) {
                    console.log('Error')
                    fielsWithError.push(this.props.schema[field].label);
                }

                // Validate Schema
                if (
                    this.props.schema[field] &&
                    this.props.schema[field].validate &&
                    !this.props.schema[field].validate(this.docValue[field],
                        this.docValue)
                ) {

                    fielsWithError.push(this.props.schema[field].label);
                }

                // Validate Date Format
                if (
                    this.props.schema[field] &&
                    this.props.schema[field].type === Date &&
                    hasValue(this.getDoc()[field]) &&
                    !(this.getDoc()[field] instanceof Date &&
                        !isNaN(this.getDoc()[field].valueOf()))
                ) {
                    fielsWithError.push(this.props.schema[field].label);
                    this.fields[field] && this.fields[field].setError &&
                    this.fields[field].setError(true);
                }
            });
        }

        if (fielsWithError.length > 0) {
            this.setState({error: fielsWithError});
        } else if (this.state.error) {
            this.setState({error: null});
        }

        return fielsWithError.length === 0;
    };

    onSubmitForm = (event, ...others) => {
        const docResult = this.docValue;
        if (this.props.submitVisibleFields) {
            const visibleFiedls = Object.keys(this.fields);
            Object.keys(docResult).forEach(field => {
                if (visibleFiedls.indexOf(field) === -1) {
                    delete docResult[field];
                }
            });
        }
        if (this.props.onSubmit && this.validate()) {
            this.props.onSubmit(docResult);
        } else {
            this.setState({ open: true });
            console.log('Erro no formulário');
        }
    };

    componentDidMount() {
        this.docValue = { ...this.docValue, ...(this.props.doc || {}) };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((!_.isEqual(this.props.doc, prevProps.doc)) ||
            (this.props.mode !== prevProps.mode) ||
            (!_.isEqual(this.props.children, prevProps.children))) {

            const update = true;

            (!_.isEqual(this.props.doc, prevProps.doc)) && this.setDoc({...this.docValue, ...(this.props.doc || {})});

            this.formElements = this.initFormElements(update);
            (this.props.mode !== prevProps.mode) &&
            this.setState({mode: this.props.mode});
        }

        if ((this.props.mode !== prevProps.mode) && !!this.state.error) {
            this.setState({error: null});
        }
    }

    render() {
        this.formElements = this.initFormElements();

        return (
            <div style={ this.props.style || { width: '100%' } }>
                { this.formElements }

                { this.state.error && (
                    this.props.showNotification ? (
                        this.props.showNotification({
                            type: 'warning',
                            title: 'Problema encontrado!',
                            description: 'Há campos obrigatórios não preenchidos!',
                        })
                    ) : (
                        <div style={ this.props.errorStyles || {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            width: '100%',
                            color: '#FF1010',
                        }}>
                            * Há campos obrigatórios não preenchidos
                        </div>
                    )
                )}
            </div>
        );
    }
}

export default SimpleForm;
