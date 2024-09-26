import React from 'react';

import _ from 'lodash';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { hasValue } from '/imports/libs/hasValue';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { checkBoxStyle } from './CheckBoxFieldStyle';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';


interface ICheckBoxSimpleFormComponent extends IBaseSimpleFormComponent {
  /**
   * transforma o dado do documento em boolean.
   */
  valueFormatter?: (value?: any) => boolean;
  /**
   * transforma o boolean em dado do documento.
   */
  valueTransformer: (value?: boolean) => any;
}

export default ({
                  name,
                  label,
                  value,
                  onChange,
                  readOnly,
                  schema,
                  error,
                  valueFormatter = (v) => v,
                  valueTransformer = (value) => value,
                  ...otherProps
                }: ICheckBoxSimpleFormComponent) => {
  const handleChangeCheck = (event: React.BaseSyntheticEvent, itemCheck: string) => {
    const newValue = typeof value === 'object' ? value : {};
    newValue[itemCheck] = valueTransformer(event.target.checked);
    onChange({ name, target: { name, value: newValue } }, { name, value: newValue });
  };

  const handleChange = (event: React.BaseSyntheticEvent) => {
    const newValue = valueTransformer(event?.target?.checked);
    onChange({ name, target: { name, value: newValue } }, { name, value: newValue });
  };
  const list =
    otherProps.checksList && hasValue(otherProps.checksList)
      ? otherProps.checksList
      : schema && hasValue(schema.checksList)
        ? schema.checksList
        : null;

  return (
    <div style={error ? checkBoxStyle.fieldError : undefined}>
      {list && <SimpleLabelView label={label} disabled={readOnly} />}

      {!readOnly && list ? (
        <div>
          {list.map((itemCheck) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!value[itemCheck]}
                  name={itemCheck}
                  onChange={(event) => handleChangeCheck(event, itemCheck)}
                />
              }
              key={itemCheck}
              value={valueFormatter(value)}
              id={itemCheck}
              label={itemCheck || ''}
              {..._.omit(otherProps, ['disabled', 'checked'])}
            />
          ))}
        </div>
      ) : list ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '100%'
          }}>
          {list.map((itemCheck) => (
            <div
              style={{
                marginLeft: 20,
                color: value[itemCheck] ? '#999' : undefined
              }}>
              {value[itemCheck] ? <SysIcon name={'check'} style={{ fontSize: 15 }} /> : ''}
              {itemCheck}
            </div>
          ))}
        </div>
      ) : (
        <div className="checkboxContainer" style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox checked={!!valueFormatter(value)} name={label} onChange={handleChange} disabled={readOnly} />

          <Typography variant="body1"> {label} </Typography>
        </div>
      )}
    </div>
  );
};
