import React from "react";
import {hasValue, isBoolean} from "/imports/libs/hasValue";

interface IFieldComponent {
  reactElement: any;
  name: string;
  mode: string;
  fieldSchema: object;
  initialValue?: any;
  setDoc: ({}) => void;
  setFieldMethods: ({}) => any;
}

export const FieldComponent = ({reactElement, name, ...props}: IFieldComponent) => {
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
        setValue(props.initialValue);
      }

      if (props.mode === 'view' && error) {
        setError(false);
      }
    }
  }, [props.mode, props.initialValue]);

  props.setFieldMethods({
    validateRequired: () => {
      if (!hasValue(value) && (!props.fieldSchema || !props.fieldSchema.visibilityFunction ||
        (!!props.fieldSchema.visibilityFunction && props.fieldSchema.visibilityFunction(props.getDoc()))
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
    label: reactElement.props.label || (props.fieldSchema ? props.fieldSchema.label : undefined),
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
