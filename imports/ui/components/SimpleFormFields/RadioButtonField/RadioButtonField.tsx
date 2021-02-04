import React, {useState} from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import {hasValue} from "/imports/libs/hasValue";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Check from "@material-ui/icons/Check";

import {radioButtonStyle} from './RadioButtonFieldStyle'

export default ({name,label,value,onChange,readOnly,schema,error,...otherProps}:IBaseSimpleFormComponent)=>{
    const list = otherProps.radiosList&&hasValue(otherProps.radiosList)?otherProps.radiosList:(schema&&hasValue(schema.radiosList)?schema.radiosList:null);

    const handleChangeCheck = (event:React.BaseSyntheticEvent, itemCheck:string) => {
        onChange({name,target:{name,value: itemCheck}},{name,value: itemCheck})
    }

    return (
        <FormControl component="fieldset" style={error?radioButtonStyle.fieldError:undefined}>
            <SimpleLabelView label={label}/>
            {!readOnly&&list?(
                <RadioGroup name="value" value={value} onChange={handleChangeCheck} style={radioButtonStyle.radio}>
                    {list.map((itemCheck) => {
                        return <FormControlLabel
                                  key={itemCheck}
                                  value={itemCheck}
                                  id={itemCheck}
                                  label={itemCheck}
                                control={<Radio color="primary" />}
                              />
                    })}
                </RadioGroup>) : (
                list?(
                    <div style={{display:'flex',flexDirection:'row',alignItems:'center',flexWrap:'wrap',width:'100%'}}>
                        {list.map((itemCheck) => {
                            return <div style={{marginLeft:20,color:value!==itemCheck?'#999':undefined}}>{value===itemCheck?<Check style={{fontSize:15}} />:''}{itemCheck}</div>

                        })}
                    </div>
                ):null
            )}
        </FormControl>
    )
}
