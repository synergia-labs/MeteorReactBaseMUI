import React from "react";
import {hasValue} from "../../../../libs/hasValue";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

import {simpleFormFieldsStyles} from "../simpleFormFieldsStyle";

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{
    if(!!readOnly) {
        return (<div key={name}>
            <SimpleLabelView label={label} styles={simpleFormFieldsStyles.displayLabelViewMode}/>
            <div style={simpleFormFieldsStyle.displayValueViewMode}>
                {hasValue(value)?value.toLocaleDateString():null}
            </div>
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
