import React from "react";
import {hasValue} from "../../../../libs/hasValue";
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import SimpleValueView from "/imports/ui/components/SimpleValueView/SimpleValueView";

import {simpleLabelStyle} from "/imports/ui/components/SimpleLabelView/SimpleLabelViewStyle";

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{

  const [values, setValues] = React.useState({ textmask: value || '' });

  const deleteImage = () => {
      onChange({},{name,value: '-'})
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      ['textmask']: event.target.value,
    });
  };

    if(!!readOnly) {
        return (<div key={name}>
          <SimpleLabelView label={label}/>
          <SimpleValueView value={(value+'')}/>
        </div>)
    }

    return (
      <FormControl>
        <InputLabel htmlFor="formatted-text-mask-input">{label}</InputLabel>
        <Input
          inputComponent={TextMaskCustom}
          key={name} onChange={handleChange} value={values.textmask || ''} error={!!error} disabled={!!readOnly} id={name} name={name} label={label} {...otherProps}
        />
      </FormControl>
    );
}
