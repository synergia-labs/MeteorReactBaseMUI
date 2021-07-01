import React, { useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import { hasValue } from '/imports/libs/hasValue';
import * as appStyle from "/imports/materialui/styles";
import TextField from '@material-ui/core/TextField';

export default ({ name, label, value, onChange, readOnly, error, style, ...otherProps }: IBaseSimpleFormComponent) => {

  const [dateValue, setDateValue] = useState(hasValue(value) && typeof value == "object" ? value : new Date());

  useEffect(() => {
    if (hasValue(value) && typeof value == "object" && value !== dateValue) {
      setDateValue(hasValue(value) ? value : new Date());
      //console.log(dateValue.toLocaleDateString(), value.toLocaleDateString());
    }
  });

  const handleChange = (date: Date) => {
    onChange({name,target:{name,value: date}},{name,value: date});
  };

  if (readOnly) {
    return (<div key={name} style={appStyle.fieldContainer}>
      <label style={{
        color: 'rgba(0,0,0,0.54)',
        padding: 0,
        whiteSpace: 'break-spaces',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        //fontFamily: 'PTSans',
        fontSize: '14px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.68,
        letterSpacing: '0.5px',
        textAlign: 'left',
        textTransform: 'none'
      }}> {label} </label>
      <TextField variant={'outlined'} disabled={true} value={hasValue(dateValue) && typeof dateValue == "object" ? dateValue.toLocaleDateString() : new Date(dateValue).toLocaleDateString()}/>
    </div>);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 4px 0px' }}>
      <MuiPickersUtilsProvider
        style={appStyle}
        key={name}
        utils={DateFnsUtils}
      >
        {label?<SimpleLabelView label={label} />:null}
        <KeyboardDatePicker
          style={style ? style:{ backgroundColor: 'white'}}
          autoOk
          format="dd/MM/yyyy"
          margin="normal"
          key={name}
          inputVariant="outlined"
          variant={'inline'}
          minDate={'01/01/1600'}
          id={name}
          error={!!error}
          label={null}
          value={dateValue}
          helperText={error ? 'Data inválida' : undefined}
          disabled={!!readOnly}
          onChange={(date) => handleChange(date)}
          KeyboardButtonProps={{
            'aria-label': label,
          }}
          readOnly={readOnly}
          InputAdornmentProps={{ position: 'start' }}
          {...otherProps}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};
