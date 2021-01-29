import React, {useState} from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {hasValue} from "/imports/libs/hasValue";
import Checkbox from "@material-ui/core/Checkbox";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

import _ from "lodash";
import {radioButtonStyle} from './RadioButtonFieldStyle'

export default ({name,label,value,onChange,readOnly,schema,error,...otherProps}:IBaseSimpleFormComponent)=>{
    const [loadRender, setLoadRender] = useState(0);
    const [valueR, setValueR] = useState("");
    const list = otherProps.radiosList&&hasValue(otherProps.radiosList)?otherProps.radiosList:(schema&&hasValue(schema.radiosList)?schema.radiosList:null);
    const [selection, setSelection] = React.useState({ value: ""});

    const handleChangeCheck = (event:React.BaseSyntheticEvent, itemCheck:string) => {
      if(!readOnly){
        event.persist();
        const name = event.target.name;
        setSelection({ ...selection, [name]: itemCheck });
        onChange({target:{value: itemCheck}},{name,value: itemCheck})
        setLoadRender(loadRender+1);
        }
    }

    return (
        <FormControl component="fieldset" style={error?radioButtonStyle.fieldError:undefined}>
            <SimpleLabelView label={label}/>
            {list?
                <RadioGroup name="value" value={selection.value} onChange={handleChangeCheck} style={radioButtonStyle.radio}>
                    {list.map((itemCheck) => {
                        return <FormControlLabel
                                  key={itemCheck}
                                  value={itemCheck}
                                  id={itemCheck}
                                  label={itemCheck}
                                control={<Radio color="primary" />}
                              />
                    })}
                </RadioGroup> : null}
        </FormControl>
    )
}
