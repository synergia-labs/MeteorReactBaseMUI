import React from 'react';
import { hasValue, isBoolean } from '/imports/libs/hasValue';

interface IFieldComponent {
	reactElement: any;
	name: string;
	mode: string;
	fieldSchema: {
		optional?: Boolean;
		type?: BooleanConstructor;
		visibilityFunction: (x: Object) => boolean;
		label: string;
		readOnly: boolean;
	};
	initialValue?: any;
	setDoc: ({}) => void;
	getDoc: () => object;
	setFieldMethods: ({}) => any;
}

export const FieldComponent = ({ reactElement, name, ...otherProps }: IFieldComponent) => {
	const [error, setError] = React.useState(false);
	const [value, setValue] = React.useState(hasValue(otherProps.initialValue) ? otherProps.initialValue : '');
	const [mode, setMode] = React.useState(otherProps.mode || 'edit');
	const [changeByUser, setChangeByUser] = React.useState(false);

	React.useEffect(() => {
		if (!changeByUser && (!hasValue(value) || value !== otherProps.initialValue) && hasValue(otherProps.initialValue)) {
			setValue(otherProps.initialValue);
		}

		if (mode !== otherProps.mode) {
			setMode(otherProps.mode);
			if (otherProps.mode === 'view') {
				setChangeByUser(false);
				setValue(otherProps.initialValue);
			}

			if (otherProps.mode === 'view' && error) {
				setError(false);
			}
		}
	}, [otherProps.mode, otherProps.initialValue]);

	otherProps.setFieldMethods({
		validateRequired: () => {
			if (
				!hasValue(value) &&
				(!otherProps.fieldSchema ||
					!otherProps.fieldSchema.visibilityFunction ||
					(!!otherProps.fieldSchema.visibilityFunction &&
						otherProps.fieldSchema.visibilityFunction(otherProps.getDoc())))
			) {
				setError(true);
				return false;
			}
			return true;
		},
		setValue: (newValue: any) => {
			try {
				setValue(newValue);
				otherProps.setDoc({ [name]: newValue });
				return true;
			} catch (e) {
				console.log('Error', e);
				return false;
			}
		},
		clear: () => {
			setChangeByUser(true);
			setValue('');
			otherProps.setDoc({ [name]: '' });

			return true;
		},
		setMode: (newMode: string) => {
			if (newMode !== mode) {
				setMode(newMode);
				return true;
			}
			return false;
		},
		setError: (value: any) => {
			setError(value);
		}
	});

	const onChange = (e: React.ChangeEvent<HTMLInputElement>, fieldData: { name?: string } = {}) => {
		const field = {
			...(otherProps.fieldSchema ? otherProps.fieldSchema : {}),
			...(e ? e.target : {}),
			...(fieldData && fieldData.name ? fieldData : {})
		};

		if (otherProps.fieldSchema && otherProps.fieldSchema.type === Boolean && isBoolean(field.checked)) {
			setValue(field.checked);
			otherProps.setDoc({ [name]: field.checked });
			if (!changeByUser) {
				setChangeByUser(true);
			}
			if (reactElement.props.onChange) {
				reactElement.props.onChange(e, { ...field, value: field.checked });
			}
		} else {
			setValue(field.value);
			otherProps.setDoc({ [name]: field.value });
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

	const hiddenOptionText = reactElement.props.hiddenOptionText;
	const optional = reactElement.props.optional || (!!otherProps.fieldSchema && !!otherProps.fieldSchema.optional);
	const label = reactElement.props.label || (otherProps.fieldSchema ? otherProps.fieldSchema.label : undefined);

	return React.cloneElement(reactElement, {
		value,
		onChange,
		error: error && (!value || value.length === 0) ? true : undefined,
		label: label ? (!optional || hiddenOptionText ? label : label + ' (opcional)') : undefined,
		disabled: mode === 'view',
		readOnly:
			mode === 'view' ||
			(!!reactElement.props && !!reactElement.props.readOnly) ||
			(!!otherProps.fieldSchema && !!otherProps.fieldSchema.readOnly),
		schema: otherProps.fieldSchema,
		checked: otherProps.fieldSchema && otherProps.fieldSchema.type === Boolean ? value : undefined
	});
};
