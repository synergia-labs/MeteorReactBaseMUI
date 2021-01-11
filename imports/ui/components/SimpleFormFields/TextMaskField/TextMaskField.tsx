import React from "react";
import TextField from '@material-ui/core/TextField';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import styles from './TextMaskFieldStyle'

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent)=>{

  const applyMask = (inputValue:string, mask:string) => {
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
          //console.log("break;");
            break;
        }

        switch (mask.charAt(i)) {
            case '9': // Number
            case '#': // Number
                if (/\d/.test(c)) {
                    text += c;
                    valueCharCount++;
                    //console.log("text += c;");
                } else {
                    x = 0;
                    //console.log("x = 0;");
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

  const handleApplyMask = (event:React.BaseSyntheticEvent) => {

      const mask = otherProps.schema&&otherProps.schema.subSchema[name] ? otherProps.schema.subSchema[name].mask : undefined;

      if (!!mask) {
          const inputValue = applyMask(event.target.value, mask);
          onChange({},{name,value: inputValue})
      }
      else {
        onChange({},{name, value: event.target.value});
      }
  }

    if(!!readOnly) {
        return <SimpleLabelView value={value} label={label}/>
    }

    return (<TextField key={name} onChange={handleApplyMask} value={value} error={!!error} disabled={!!readOnly} id={name} name={name} label={label} {...otherProps} />);

}
