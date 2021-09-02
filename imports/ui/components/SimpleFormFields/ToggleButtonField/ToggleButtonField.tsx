import React from 'react';

import SimpleLabelView
  from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import {hasValue} from '/imports/libs/hasValue';

import FormControl from '@mui/material/FormControl';
import Check from '@material-ui/icons/Check';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {toggleButtonStyle} from './ToggleButtonFieldStyle';

import * as appStyle from '/imports/materialui/styles';
import {isMobile} from '/imports/libs/deviceVerify';

export default ({
  name,
  label,
  value,
  onChange,
  readOnly,
  schema,
  error,
  ...otherProps
}: IBaseSimpleFormComponent) => {
  const list = otherProps.options && hasValue(otherProps.options)
      ? otherProps.options
      : (schema && hasValue(schema.options) ? schema.options : null);

  const handleChangeCheck = (
      event: React.BaseSyntheticEvent, itemCheck: string) => {
    onChange({name, target: {name, value: itemCheck}}, {name, value: itemCheck});
  };

  return (
      <FormControl component="fieldset" style={{
        ...(error
            ? toggleButtonStyle.fieldError
            : undefined), ...appStyle.fieldContainer,
      }}>
        <SimpleLabelView label={label}/>
        {!readOnly && list ? (
            <ToggleButtonGroup id="radioGroup" value={value} exclusive
                               color={'secondary'} onChange={handleChangeCheck}
                               style={toggleButtonStyle.radio}>
              {list.map((itemCheck) => {
                return <ToggleButton
                    style={{
                      boxShadow: '0px 8px 15px rgb(0 0 0 / 10%)',
                      flex: 1,
                      margin: 3,
                      borderRadius: 15,
                      minWidth: isMobile ? '45%' : '25%',
                      maxWidth: isMobile ? '95%' : '30%',
                      backgroundColor: (typeof itemCheck === 'object' &&
                          itemCheck.value === value || itemCheck === value)
                          ? appStyle.primaryColor
                          : '#dedede',
                      color: (typeof itemCheck === 'object' &&
                          itemCheck.value === value || itemCheck === value)
                          ? '#FFF'
                          : appStyle.secondaryColor,
                    }}
                    key={typeof itemCheck === 'object'
                        ? itemCheck.label
                        : itemCheck}
                    value={typeof itemCheck === 'object'
                        ? itemCheck.value
                        : itemCheck}
                    id={typeof itemCheck === 'object'
                        ? itemCheck.label
                        : itemCheck}
                    label={typeof itemCheck === 'object'
                        ? itemCheck.label
                        : itemCheck}

                >
                  {itemCheck.label || itemCheck}
                </ToggleButton>;
              })}
            </ToggleButtonGroup>) : (
            list ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  width: '100%',
                }}>
                  {list.map((itemCheck) => {
                    return <div style={{
                      marginLeft: 20,
                      color: value !== (itemCheck.value || itemCheck)
                          ? '#999'
                          : undefined,
                    }}>{value === (itemCheck.value || itemCheck) ? <Check
                        style={{fontSize: 15}}/> : ''}{(itemCheck.label ||
                        itemCheck)}</div>;

                  })}
                </div>
            ) : null
        )}
      </FormControl>
  );
}
