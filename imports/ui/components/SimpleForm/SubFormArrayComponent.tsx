import React from 'react';
import Fab from '@mui/material/Fab';
import { simpleFormStyle } from '/imports/ui/components/SimpleForm/SimpleFormStyle';
import _ from 'lodash';
import { hasValue, isBoolean } from '/imports/libs/hasValue';
import { nanoid } from 'nanoid';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { ReactSortable } from 'react-sortablejs';
import IconButton from '@mui/material/IconButton';
import SimpleForm, { IElementProps } from '/imports/ui/components/SimpleForm/SimpleForm';
import Tooltip from '@mui/material/Tooltip';
import { ISxStyleObject } from '/imports/typings/ISxStyleObject';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

interface ISubFormArrayComponent {
	reactElement: (React.ComponentType | React.ReactElement<any>) & {
		props: { [key: string]: any };
	};
	childrensElements: React.ReactNode | React.ReactNode[];
	name: string;
	mode: string;
	fieldSchema: { type?: BooleanConstructor; label: string; subSchema: Object };
	initialValue?: any;
	setDoc: ({}) => void;
	setFieldMethods: ({}) => any;
	addElement?: React.Component | JSX.Element;
	disableSort?: boolean;
	removeIcon?: React.ReactNode;
	noItensText?: string;
	removeIconButtonSx?: ISxStyleObject;
	iconButtonContainerStyle?: ISxStyleObject;
}

function createAddElementSubArrayButtom(addElement: any, addSubForm: () => void, error: boolean) {
	if (!!addElement) {
		return React.cloneElement(addElement, { onClick: addSubForm });
	} else {
		return (
			<Fab
				id={'addSubForm'}
				color="secondary"
				style={{
					color: error ? '#9F3A38' : '#ffffff',
					...simpleFormStyle.buttonAddSubForm
				}}
				onClick={addSubForm}>
				<SysIcon name={'add'} />
			</Fab>
		);
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
	const [error, setError] = React.useState(false);
	const [value, setValue] = React.useState(initialValue || []);
	const [mode, setMode] = React.useState(props.mode || 'edit');
	const [changeByUser, setChangeByUser] = React.useState(false);
	const formRefs: { [key: string]: any } = {};

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
		validateRequired: (_hasError: boolean) => {
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
		}
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>, fieldData: { name?: string } = {}) => {
		const field = {
			...(props.fieldSchema ? props.fieldSchema : {}),
			...(e ? e.target : {}),
			...(fieldData && fieldData.name ? fieldData : {})
		};

		if (props.fieldSchema && props.fieldSchema.type === Boolean && isBoolean(field.checked)) {
			setValue(field.checked);
			props.setDoc({ [name]: field.checked });
			if (!changeByUser && (field.value || []).length > 0) {
				setChangeByUser(true);
			}
			if (reactElement.props.onChange) {
				reactElement.props.onChange(e, { ...field, value: field.checked });
			}
		} else {
			setValue(field.value);
			props.setDoc({ [name]: field.value });
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

	const onSortDocs = (newList: any[]) => {
		const list = newList.map((l) => {
			delete l.chosen;
			return l;
		});
		setValue(list);
		onChange({
			target: {
				//@ts-ignore
				value: list
			}
		});
	};

	const addSubForm = () => {
		const newValue = (value || []).filter((subDoc: { id: any }) => subDoc.id);

		newValue.push({
			id: nanoid()
		});

		setValue(newValue);
		onChange({
			//@ts-ignore
			target: {
				value: newValue
			}
		});
	};

	const onFormChangeHandle = (formId: string) => (doc: { id: any; chosen: any }) => {
		const newDoc = (value || []).map((subDoc: { id: any; chosen: any }) => {
			if (subDoc.id === formId) {
				subDoc = { ...subDoc, ...doc };
			}

			delete subDoc.chosen;

			return subDoc;
		});

		onChange({
			//@ts-ignore
			target: {
				value: newDoc
			}
		});
	};

	const onClickDelete = (formId: string) => (_doc: any) => {
		const newDoc = (value || []).filter((subDoc: { id: string }) => subDoc.id !== formId);
		onChange({
			//@ts-ignore
			target: {
				value: newDoc
			}
		});
	};

	const label = reactElement.props.label || (props.fieldSchema ? props.fieldSchema.label : undefined);

	let AddElement = createAddElementSubArrayButtom(addElement, addSubForm, error);
	return (
		<div
			key={name}
			style={{
				backgroundColor: error ? '#FFF6F6' : undefined,
				...simpleFormStyle.containerLabel
			}}>
			<SimpleLabelView label={label} />
			<div style={simpleFormStyle.containerForm}>
				<ReactSortable disabled={mode === 'view'} list={value || []} setList={onSortDocs} handle={'.dragButton'}>
					{(value || []).map((subForm: (IElementProps & { _id?: string }) | undefined, subFormIndex: any) => {
						if (subForm && (subForm.id || subForm._id)) {
							return (
								<div key={subForm.id || subForm._id} style={simpleFormStyle.containerSubForm}>
									<SimpleForm
										isSubForm
										ref={(refForm) => (formRefs[subForm.id || subForm._id] = refForm)}
										key={subForm.id || subForm._id}
										mode={mode}
										schema={props.fieldSchema && props.fieldSchema.subSchema ? props.fieldSchema.subSchema : undefined}
										doc={subForm}
										onFormChange={onFormChangeHandle(subForm.id || subForm._id)}>
										{childrensElements}
									</SimpleForm>

									{mode !== 'view' ? (
										<div style={iconButtonContainerStyle ? iconButtonContainerStyle : simpleFormStyle.buttonForm}>
											<Tooltip title={'Remover'}>
												<IconButton sx={removeIconButtonSx} onClick={onClickDelete(subForm.id || subForm._id)}>
													{removeIcon || <SysIcon name={'delete'} />}
												</IconButton>
											</Tooltip>
										</div>
									) : null}
									{mode !== 'view' && !disableSort ? (
										<div className={'dragButton'} style={simpleFormStyle.buttonForm}>
											<Tooltip title={'Clique e arraste para ordenar'}>
												<IconButton>
													<SysIcon name={'dragIndicator'} />
												</IconButton>
											</Tooltip>
										</div>
									) : null}
								</div>
							);
						}
						return <div key={`el${subFormIndex}`} />;
					})}
				</ReactSortable>

				<div style={simpleFormStyle.containerItens}>
					{!value || value.length === 0 || Object.keys(value[0]).length === 0 ? (
						<div style={simpleFormStyle.containerEmptyItens}>{noItensText}</div>
					) : null}
				</div>

				{mode !== 'view' ? <div style={simpleFormStyle.containerAddSubForm}>{AddElement}</div> : null}
			</div>
		</div>
	);
};
