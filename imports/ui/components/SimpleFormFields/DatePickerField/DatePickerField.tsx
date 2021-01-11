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

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent)=>{
    if(!!readOnly) {
        return (<div key={name}>
            <SimpleLabelView label={label}/>
            <SimpleLabelView value={value}/>
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
