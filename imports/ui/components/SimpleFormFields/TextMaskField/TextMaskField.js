import React from "react";
import {hasValue} from "../../../../libs/hasValue";
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export default ({name,label,value,onChange,readOnly,error,...otherProps})=>{

  const [values, setValues] = React.useState({ textmasked: '' });

  console.log(otherProps.schema.subSchema[name].mask);

  const applyMask = (inputValue, mask) => {
    let text = '';
    const data = inputValue;
    let c;

    let m;

    let i;

    let x;

    let valueCharCount = 0;
    for (i = 0, x = 1; x && i < mask.length; ++i) {
        c = data.charAt(valueCharCount);
        m = mask.charAt(i);

        if (valueCharCount >= data.length) {
            break;
        }

        switch (mask.charAt(i)) {
            case '9': // Number
            case '#': // Number
                if (/\d/.test(c)) {
                    text += c;
                    valueCharCount++;
                } else {
                    x = 0;
                }
                break;

            case '8': // Alphanumeric
            case 'A': // Alphanumeric
                if (/[a-z]/i.test(c)) {
                    text += c;
                    valueCharCount++;
                } else {
                    x = 0;
                }
                break;

            case '7': // Number or Alphanumerica
            case 'N': // Number or Alphanumerica
                if (/[a-z0-9]/i.test(c)) {
                    text += c;
                    valueCharCount++;
                } else {
                    x = 0;
                }
                break;

            case '6': // Any
            case 'X': // Any
                text += c;
                valueCharCount++;

                break;

            default:
                if (m === c) {
                    text += m;
                    valueCharCount++;
                } else {
                    text += m;
                }

                break;
        }
    }
    return text;
  }

  const handleApplyMask = () => {

      const mask = otherProps.schema.subSchema[name] ? otherProps.schema.subSchema[name].mask : undefined;

      if (!!mask) {
          const inputValue = applyMask(value, mask);
          setValues(['textmasked', inputValue]);
          console.log(value.textmasked);
          console.log(value,mask);
          //onChange({},{name,value: inputValue});
      }
      else {
        onChange({},{name, value: value});
      }
  }


    if(!!readOnly) {
        return (<div key={name}>
            {hasValue(label)?(<label
                style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: 0,
                    fontSize: '1rem',
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 400,
                    lineHeight: 1,
                    letterSpacing: '0.00938em',
                }}
            >{label}</label>):null}
            <div style={{color:'#222',padding:5,height:35,marginTop:4,marginBottom:8}}>{(value+'')}</div>
        </div>)
    }

    return (<TextField key={name} onChange={handleApplyMask} value={value.textmasked} error={!!error} disabled={!!readOnly} id={name} name={name} label={label} {...otherProps} />);

}




/*

<InputMask
  mask="(99) 9 9999-9999"
  value={values.textmask}
  disabled={false}
  maskChar=" "
  onChange={handleChange}
  key={name} error={!!error} disabled={!!readOnly} id={name} name={name} label={label} {...otherProps}
>
  {() => <TextField id={values.textmask} />}
</InputMask>
*/
