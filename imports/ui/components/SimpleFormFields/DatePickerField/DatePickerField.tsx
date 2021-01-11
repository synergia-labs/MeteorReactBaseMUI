import React from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {hasValue} from "/imports/libs/hasValue";
import {datePickerStyle} from "/imports/ui/components/SimpleFormFields/DatePickerField/DatePickerFieldStyles";
import {Typography} from "@material-ui/core";

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent)=>{
    if(!!readOnly) {
        return (<div key={name}>
            <SimpleLabelView  value={hasValue(value)?value.toLocaleDateString():undefined} label={label}/>
        </div>)
    }

    const handleChange = (date:Date) => {
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
