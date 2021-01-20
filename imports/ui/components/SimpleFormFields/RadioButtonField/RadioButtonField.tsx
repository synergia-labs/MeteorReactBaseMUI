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

    const handleChangeCheck = (event:React.BaseSyntheticEvent, itemCheck:string, value:string) => {
      console.log("value: ", value);
      setValueR(itemCheck);

        /*if(!readOnly){
            const newValue = typeof(value) === 'object' ? value : {}
            newValue[itemCheck]= event.target.value
            onChange({},{name,value: newValue})
            setLoadRender(loadRender+1);
        }*/
    }

    const list = otherProps.checksList&&hasValue(otherProps.checksList)?otherProps.checksList:(schema&&hasValue(schema.checksList)?schema.checksList:null);

    return (
        <FormControl component="fieldset" style={error?radioButtonStyle.fieldError:undefined}>
            <SimpleLabelView label={label}/>

            {list?
                <RadioGroup aria-label="gender" name="gender1" value={valueR} style={radioButtonStyle.radio}>
                    {list.map((itemCheck) => {
                        return <FormControlLabel control={<Radio checked={!!value[itemCheck]} name={itemCheck} row/>}
                                                 key={itemCheck}
                                                 value={value}
                                                 id={itemCheck}
                                                 label={itemCheck}
                                                 onChange={(event) => handleChangeCheck(event, itemCheck, value)}
                                                 {...(_.omit(otherProps,['disabled', 'checked']))}
                        />
                    })}
                </RadioGroup> : null}
        </FormControl>
    )
}
