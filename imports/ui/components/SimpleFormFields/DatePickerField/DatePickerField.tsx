import React from "react";
import {hasValue} from "../../../../libs/hasValue";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import SimpleValueView from "/imports/ui/components/SimpleValueView/SimpleValueView";

import {simpleLabelStyle} from "/imports/ui/components/SimpleLabelView/SimpleLabelViewStyle";
import {simpleValueStyle} from "/imports/ui/components/SimpleValueView/SimpleValueViewStyle";

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent)=>{
    if(!!readOnly) {
        return (<div key={name}>
            <SimpleLabelView label={label}/>
            <MuiPickersUtilsProvider key={name} utils={DateFnsUtils}>
              <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  key={name}
                  id={name}
                  value={value}
                  disabled={!!readOnly}
                  KeyboardButtonProps={{
                      'aria-label': label,
                  }}
                  InputAdornmentProps={{ position: "start", ...simpleValueStyle.displayValue }}

                  {...otherProps}

              />
            </MuiPickersUtilsProvider>
        </div>)
    }

    const handleChange = (date,other) => {
        onChange({target:{value:date}});
    }

    return (
        <MuiPickersUtilsProvider key={name} utils={DateFnsUtils}>
            <KeyboardDatePicker
                autoOk
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                key={name}
                id={name}
                label={label}
                value={value}
                helperText={!!error?'Data inválida':undefined}
                disabled={!!readOnly}
                onChange={handleChange}
                KeyboardButtonProps={{
                    'aria-label': label,
                }}
                InputAdornmentProps={{ position: "start" }}

                {...otherProps}

            />
        </MuiPickersUtilsProvider>
    );

}
