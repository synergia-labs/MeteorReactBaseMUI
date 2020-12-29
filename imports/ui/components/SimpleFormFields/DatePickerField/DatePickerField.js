import React from "react";
import {hasValue} from "../../../../libs/hasValue";
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import {simpleFormFieldsStyles} from "../simpleFormFieldsStyle";

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{
    if(!!readOnly) {
        return (<div key={name}>
            {hasValue(label)?(<label style={simpleFormFieldsStyles.displayLabelViewMode}>{label}</label>):null}
            <div style={simpleFormFieldsStyle.displayValueViewMode}> {hasValue(value)?value.toLocaleDateString():null}</div>
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
