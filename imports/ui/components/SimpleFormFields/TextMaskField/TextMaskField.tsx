import React from 'react';
import _ from 'lodash';
import TextField from '@mui/material/TextField';
import SimpleLabelView
  from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import InputBase from '@mui/material/InputBase';
import * as appStyle from '/imports/materialui/styles';
import omit from "lodash/omit";
import makeStyles from '@mui/styles/makeStyles';
import { createStyles, Theme } from '@mui/material/styles';

export default ({
  name,
  label,
  value,
  onChange,
  readOnly,
  schema,
  error,
  noShowMsgError,
  placeholder,
  help,
  style,...otherProps
}: IBaseSimpleFormComponent) => {

  const [fieldValue,setFieldValue] = React.useState(value)
  const [maskError,setMaskError] = React.useState(false)


  React.useEffect(()=>{
    const val = schema && schema.type === Date &&
    !!value && value instanceof Date ? value.toLocaleDateString('pt-BR') : value;
    (val||!val&&!!fieldValue&&fieldValue.length>0)&&setFieldValue(val);
  },[value])

  const mask = otherProps && otherProps.mask ?
      otherProps.mask : (schema && schema.mask ? schema.mask : undefined);

  const validate = (paramValue) => {
    if(mask&&(paramValue||fieldValue)&&(paramValue||fieldValue).length>0&&(paramValue||fieldValue||'').length!==mask.length) {
      !maskError&&setMaskError(true);
      return false;
    } else if(maskError) {
      setMaskError(false);
      return true;
    }
    return true;
  }


  const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        root: {height: 50},
      }),
  );

  const classes = useStyles();




  const applyMask = (inputValue: string, mask: string) => {
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
  };

  const onFieldChange = (e) => {
    const newValue = e.target.value;
    if(fieldValue&&fieldValue.length===mask.length) {
      validate(newValue);
    }
    setFieldValue(newValue);
    if(maskError) {
      setMaskError(false);
    }
    if(mask&&newValue.length===mask.length) {
      onChange({name, target: {name, value: newValue}}, {name, value: newValue});
    } else if(value) {
      onChange({name, target: {name, value: undefined}}, {name, value: undefined});
    }

  };

  const handleApplyMask = (event: React.BaseSyntheticEvent) => {
    if (mask) {
      const inputValue = applyMask(event.target.value, mask);
      onFieldChange({name, target: {name, value: inputValue}},
          {name, value: inputValue});
    } else {
      onFieldChange(
          {name, target: {name, value: event.target.value}},
          {name, value: event.target.value});
    }
  };


  if (readOnly) {
    return (<div key={name} style={{
      display: 'flex',
      flexDirection: 'column', ...appStyle.fieldContainer,
    }}>
      {(label && !otherProps.rounded) ? <SimpleLabelView label={label}
                                                         style={style
                                                             ? style.displayLabel
                                                             : undefined}
                                                         help={help}/> : null}
      <TextField InputProps={otherProps.rounded
          ? {classes: classes}
          : undefined}
                 {...(omit(otherProps, ['placeholder']))}
                 key={name} onChange={onFieldChange} value={fieldValue}
                 error={!!error} disabled={!!readOnly} id={name}
                 name={name}
                 label={otherProps.rounded ? label : null} type={'text'}/>
    </div>);
  }



  if (otherProps.isNaked) {
    return (
        <InputBase
            key={name}
            onChange={onChange}
            value={fieldValue}
            error={!!error}
            disabled={!!readOnly}
            id={name}
            name={name}
            label={otherProps.labelDisable ? undefined : label}
            {...otherProps}
            onBlur={()=>validate()}
        />);
  }

  return (<div key={name} style={{
    display: 'flex',
    flexDirection: 'column', ...appStyle.fieldContainer,
  }}>
    <SimpleLabelView label={label}/>
    <TextField
        {...otherProps}
        key={name}
        onChange={handleApplyMask}
        value={fieldValue}
        error={!!error}
        disabled={!!readOnly}
        id={name}
        name={name}
        label={null}
        help={help}
        onBlur={()=>validate()}
        style={style
            ? {displayLabel: style.displayLabel}
            : undefined}/>
    {!noShowMsgError&&maskError&&<div style={{width:'100%',textAlign:'right',margin:0,padding:1,color:'#DD0000',fontSize:10}}>{`${label||'Valor'} inválido!`}</div>}
  </div>);
};
