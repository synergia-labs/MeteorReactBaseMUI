import React, {Component} from 'react';

import _ from 'lodash';
import Typography from '@mui/material/Typography';

import {hasValue, isBoolean} from '../../../libs/hasValue';

import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';

import {simpleFormStyle} from './SimpleFormStyle';
import {SubFormArrayComponent} from "/imports/ui/components/SimpleForm/SubFormArrayComponent";
import {FieldComponent} from "/imports/ui/components/SimpleForm/FieldComponent";


interface ISubFormComponent {
    reactElement: any;
    childrensElements: any;
    name: string;
    mode: string;
    fieldSchema: object;
    initialValue?: any;
    setDoc: ({ }) => void;
    setFieldMethods: ({ }) => any;
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
            props.setDoc({ [name]: field.checked });
            if (!changeByUser) {
                setChangeByUser(true);
            }
            if (reactElement.props.onChange) {
                reactElement.props.onChange(e, { ...field, value: field.checked });
            }
        } else {
            setValue(field.value);
            props.setDoc({ [name]: field.value });
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

    const label = reactElement.props.label || (props.fieldSchema ? props.fieldSchema.label : undefined);

    return (
        <div key={name} style={simpleFormStyle.containerLabel}>
            <SimpleLabelView label={label} />
            <div style={simpleFormStyle.containerChildrenElements}>
                <SimpleForm
                    isSubForm
                    ref={fRef => formRef = fRef}
                    mode={mode}
                    schema={
                        props.fieldSchema &&
                            props.fieldSchema.subSchema
                            ? props.fieldSchema.subSchema
                            : undefined
                    }
                    doc={value}
                    onFormChange={onFormChangeHandle}
                >
                    {childrensElements}
                </SimpleForm>
            </div>
        </div>
    );
};


interface ISimpleFormProps {
  /**
   * If true, dont reload(reset) form with props.doc values in view mode (except if props.doc change)
   */
    dontReloadOnView?:boolean,
    errorStyles?: object;
    children?: object[]|object;
    doc?: object;
    isSubForm?: boolean;
    loading?: boolean | null;
    mode?: string;
    schema: [] | {};
    styles?: object;
    onFormChange?: (onChange: () => void) => void;
    onSubmit?: (submit: any) => void;
    showNotification?: (data: {
        type: string;
        title: string;
        description: string;
    }) => void;
}

class SimpleForm extends Component<ISimpleFormProps> {
    docValue = { ...(this.props.doc || {}) };
    fields = {};
    hiddenFields = {};
    state = {
        error: null,
        mode: this.props.mode || 'edit',
        open: true
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
        this.docValue = { ...this.docValue, ...newDoc };
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
                const newDoc = { ...self.docValue };
                if (self.props.submitVisibleFields) {
                    const visibleFiedls = Object.keys(self.fields);
                    Object.keys(newDoc).forEach(field => {
                        if (visibleFiedls.indexOf(field) === -1) {
                            delete newDoc[field];
                        }
                    });
                }

                this.docValue = { ...newDoc };
                self.props.onFormChange(newDoc);
            }
        } else {
            if (this.props.onFormChange) {
                this.props.onFormChange(this.docValue);
            }
        }

        let change = !!this.fieldsRequired;
      this._computeRequiredFields();

      if(this.fieldsRequired !== change){
            this.initFormElements(true);
        }
    };

  private _computeRequiredFields() {
    let fieldsRequired = true;
    Object.keys(this.fields).forEach(field => {
      if (this.props.schema[field] && !this.props.schema[field].optional && !hasValue(this.docValue[field])) {
        fieldsRequired = false;
      }
    });
    this.fieldsRequired = fieldsRequired;
  }

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
                disabled: !this.fieldsRequired
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

        if (element.props.formType === 'subform' && !!element.props.name) {
            return (<SubFormComponent
                name={element.props.name}
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
                setFieldMethods={methods => self.fields[element.props.name] = { ...methods }}
            />);
        } else if (element.props.formType === 'subformArray' &&
            !!element.props.name) {
            return (<SubFormArrayComponent
                name={element.props.name}
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
                noItensText={element.props.noItensText}
                addElement={element.props.addElement}
                removeIcon={element.props.removeIcon}
                iconButtonContainerStyle={element.props.iconButtonContainerStyle}
                removeIconButtonSx={element.props.removeIconButtonSx}
                disableSort={element.props.disableSort}
                setDoc={this.setDoc}
                getDoc={this.getDoc}
                mode={self.props.mode}
                setFieldMethods={methods => self.fields[element.props.name] = { ...self.fields[element.props.name], ...methods }}
            />);
        } else if (
            element.type.name === 'FormGroup' ||
            element.type.name === 'Segment' ||
            React.Children.toArray(element.props.children).length > 0
        ) {
            const subElements = React.Children.toArray(element.props.children).
                map((element, index) => self.wrapElement(element, index));
            const newElement = React.cloneElement(element,
                { key: `el${index}`, children: subElements });
            return newElement;
        }

        return (<FieldComponent
            name={element.props.name}
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
                self.fields[element.props.name] = { ...self.fields[element.props.name], ...methods };
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
        setTimeout(() => {
            update && self.setState({ lastUpdate: new Date() });
        }, 0)

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
            this.setState({ error: fielsWithError });
        } else if (this.state.error) {
            this.setState({ error: null });
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
    const isDocDifferent = !_.isEqual(this.props.doc, prevProps.doc);
    const isModeDifferent = this.props.mode !== prevProps.mode;
    this._computeRequiredFields();
    if (isDocDifferent ||
        isModeDifferent ||
            (!_.isEqual(this.props.children, prevProps.children))) {

            const update = true;
            const reloadDocOnView = !this.props.dontReloadOnView &&
              (this.props.mode==='view' && isModeDifferent &&
                !this.props.dontReloadOnView);
            if(isDocDifferent || reloadDocOnView) {
              this.docValue ={};
              this.setDoc({...(this.props.doc || {})});
            }
            this.formElements = this.initFormElements(update);
            (this.props.mode !== prevProps.mode) &&
                this.setState({ mode: this.props.mode });
        }

        if ((this.props.mode !== prevProps.mode) && !!this.state.error) {
            this.setState({ error: null });
        }
    }

    render() {
        this.formElements = this.initFormElements();

        return (
            <div style={this.props.styles || { width: '100%' }}>
                {this.formElements}

                {this.state.error && !this.props.isSubForm && (
                    this.props.showNotification ? (
                        this.props.showNotification({
                            type: 'warning',
                            title: 'Problema encontrado!',
                            description: 'Há campos obrigatórios não preenchidos!',
                        })
                    ) : (
                        <div style={this.props.errorStyles || {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            width: '100%',
                            color: '#FF1010',
                            marginTop: '0.8rem',
                        }}>
                            <Typography color='#FF1010' variant="subtitle2">
                                {'Há campos obrigatórios não preenchidos'}
                            </Typography>
                        </div>
                    )
                )}
            </div>
        );
    }
}

export default SimpleForm;
