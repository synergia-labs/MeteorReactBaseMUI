import React, {useEffect, useState} from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {hasValue} from "/imports/libs/hasValue";

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent)=>{
    const[dateValue, setDateValue] = useState(hasValue(value) ? value : new Date());

    useEffect(() => {
        if(hasValue(value) && value !== dateValue){
            setDateValue(hasValue(value)? value : new Date())
        }
    })

    const handleChange = (date:Date) => {
        onChange({target:{value:date}});
    }

    useEffect(() => {
        if(!hasValue(value) && value == ''){
          onChange({},{name, value: dateValue});
        }
    })
    if(!!readOnly) {
        return (<div key={name}>
            <SimpleLabelView  value={hasValue(dateValue)?dateValue.toLocaleDateString():null} label={label}/>
        </div>)
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
                error={!!error}
                label={label}
                value={dateValue}
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
