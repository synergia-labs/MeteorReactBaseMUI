import React, { CSSProperties } from 'react'
import { SxProps } from '@mui/system'
import Fab from '@mui/material/Fab'
import { simpleFormStyle } from '/imports/ui/components/SimpleForm/SimpleFormStyle'
import Add from '@mui/icons-material/Add'
import _ from 'lodash'
import { hasValue, isBoolean } from '/imports/libs/hasValue'
import shortid from 'shortid'
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView'
import { ReactSortable } from 'react-sortablejs'
import IconButton from '@mui/material/IconButton'
import Delete from '@mui/icons-material/Delete'
import DragHandle from '@mui/icons-material/DragHandle'
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm'

interface ISubFormArrayComponent {
    reactElement: any
    childrensElements: any
    name: string
    mode: string
    fieldSchema: object
    initialValue?: any
    setDoc: ({}) => void
    setFieldMethods: ({}) => any
    addElement?: React.Component | JSX.Element
    disableSort?: boolean
    removeIcon?: any
    noItensText?: string
    removeIconButtonSx?: SxProps
    iconButtonContainerStyle?: CSSProperties
}

function createAddElementSubArrayButtom(addElement: any, addSubForm: () => void, error: boolean) {
    if (!!addElement) {
        return React.cloneElement(addElement, { onClick: addSubForm })
    } else {
        return (
            <Fab
                id={'addSubForm'}
                color="secondary"
                style={{
                    color: error ? '#9F3A38' : '#ffffff',
                    ...simpleFormStyle.buttonAddSubForm,
                }}
                onClick={addSubForm}
            >
                <Add />
            </Fab>
        )
    }
}

export const SubFormArrayComponent = ({
    reactElement,
    childrensElements,
    name,
    initialValue,
    addElement,
    disableSort,
    removeIcon,
    removeIconButtonSx,
    iconButtonContainerStyle,
    noItensText = 'Não há itens',
    ...props
}: ISubFormArrayComponent) => {
    const [error, setError] = React.useState(false)
    const [value, setValue] = React.useState(initialValue || [])
    const [mode, setMode] = React.useState(props.mode || 'edit')
    const [changeByUser, setChangeByUser] = React.useState(false)
    const formRefs = {}

    React.useEffect(() => {
        if (
            !changeByUser &&
            (!value || value.length === 0 || !_.isEqual(value, initialValue)) &&
            (initialValue || []).length > 0
        ) {
            setValue(initialValue)
        }
        if (mode !== props.mode) {
            setMode(props.mode)
            if (props.mode === 'view') {
                setChangeByUser(false)
            }

            if (props.mode === 'view' && error) {
                setError(false)
            }
        }
    })

    props.setFieldMethods({
        validateRequired: (_hasError: boolean) => {
            if (!hasValue(value)) {
                setError(true)
                return false
            }
            return true
        },
        validateRequiredSubForm: () => {
            let result = true
            Object.keys(formRefs).forEach((key) => {
                const subFormRef = formRefs[key]
                if (!subFormRef.validate()) {
                    setError(true)
                    result = false
                }
            })

            return result
        },
        setValue: (newValue: any) => {
            if (hasValue(newValue)) {
                setValue(newValue)
                return true
            }
            return false
        },
        clear: () => {
            setValue(undefined)
            return true
        },
        setMode: (newMode: string) => {
            if (newMode !== mode) {
                setMode(newMode)
                return true
            }
            return false
        },
        setError: (valueErr: boolean) => {
            setError(valueErr)
        },
    })

    const onChange = (e, fieldData = {}) => {
        const field = {
            ...(props.fieldSchema ? props.fieldSchema : {}),
            ...(e ? e.target : {}),
            ...(fieldData && fieldData.name ? fieldData : {}),
        }

        if (props.fieldSchema && props.fieldSchema.type === Boolean && isBoolean(field.checked)) {
            setValue(field.checked)
            props.setDoc({ [name]: field.checked })
            if (!changeByUser && (field.value || []).length > 0) {
                setChangeByUser(true)
            }
            if (reactElement.props.onChange) {
                reactElement.props.onChange(e, { ...field, value: field.checked })
            }
        } else {
            setValue(field.value)
            props.setDoc({ [name]: field.value })
            if (!changeByUser && (field.value || []).length > 0) {
                setChangeByUser(true)
            }
            if (reactElement.props.onChange) {
                reactElement.props.onChange(e, field)
            }
        }

        if (hasValue(field.value)) {
            setError(false)
        }
    }

    const onSortDocs = (newList) => {
        const list = newList.map((l) => {
            delete l.chosen
            return l
        })
        setValue(list)
        onChange({
            target: {
                value: list,
            },
        })
    }

    const addSubForm = () => {
        const newValue = (value || []).filter((subDoc) => subDoc.id)

        newValue.push({
            id: shortid.generate(),
        })

        setValue(newValue)
        onChange({
            target: {
                value: newValue,
            },
        })
    }

    const onFormChangeHandle = (formId) => (doc) => {
        const newDoc = (value || []).map((subDoc) => {
            if (subDoc.id === formId) {
                subDoc = { ...subDoc, ...doc }
            }

            delete subDoc.chosen

            return subDoc
        })

        onChange({
            target: {
                value: newDoc,
            },
        })
    }

    const onClickDelete = (formId) => (doc) => {
        const newDoc = (value || []).filter((subDoc) => subDoc.id !== formId)
        onChange({
            target: {
                value: newDoc,
            },
        })
    }

    const label =
        reactElement.props.label || (props.fieldSchema ? props.fieldSchema.label : undefined)

    let AddElement = createAddElementSubArrayButtom(addElement, addSubForm, error)
    return (
        <div
            key={name}
            style={{
                backgroundColor: error ? '#FFF6F6' : undefined,
                ...simpleFormStyle.containerLabel,
            }}
        >
            <SimpleLabelView label={label} />
            <div style={simpleFormStyle.containerForm}>
                <ReactSortable
                    disabled={mode === 'view'}
                    list={value || []}
                    setList={onSortDocs}
                    handle={'.dragButton'}
                >
                    {(value || []).map((subForm, subFormIndex) => {
                        if (subForm && subForm.id) {
                            return (
                                <div key={subForm.id} style={simpleFormStyle.containerSubForm}>
                                    <SimpleForm
                                        isSubForm
                                        ref={(refForm) => (formRefs[subForm.id] = refForm)}
                                        key={subForm.id}
                                        mode={mode}
                                        schema={
                                            props.fieldSchema && props.fieldSchema.subSchema
                                                ? props.fieldSchema.subSchema
                                                : undefined
                                        }
                                        doc={subForm}
                                        onFormChange={onFormChangeHandle(subForm.id)}
                                    >
                                        {childrensElements}
                                    </SimpleForm>

                                    {mode !== 'view' ? (
                                        <div
                                            style={
                                                iconButtonContainerStyle
                                                    ? iconButtonContainerStyle
                                                    : simpleFormStyle.buttonForm
                                            }
                                        >
                                            <IconButton
                                                sx={removeIconButtonSx}
                                                onClick={onClickDelete(subForm.id)}
                                            >
                                                {removeIcon || <Delete />}
                                            </IconButton>
                                        </div>
                                    ) : null}
                                    {mode !== 'view' && !disableSort ? (
                                        <div
                                            className={'dragButton'}
                                            style={simpleFormStyle.buttonForm}
                                        >
                                            <IconButton onClick={onClickDelete(subForm.id)}>
                                                <DragHandle />
                                            </IconButton>
                                        </div>
                                    ) : null}
                                </div>
                            )
                        }
                        return <div key={`el${subFormIndex}`} />
                    })}
                </ReactSortable>

                <div style={simpleFormStyle.containerItens}>
                    {!value || value.length === 0 || Object.keys(value[0]).length === 0 ? (
                        <div style={simpleFormStyle.containerEmptyItens}>{noItensText}</div>
                    ) : null}
                </div>

                {mode !== 'view' ? (
                    <div style={simpleFormStyle.containerAddSubForm}>{AddElement}</div>
                ) : null}
            </div>
        </div>
    )
}
