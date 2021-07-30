import React from "react";
import TextField from '@material-ui/core/TextField';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import InputBase from '@material-ui/core/InputBase';
import * as appStyle from "/imports/materialui/styles";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import omit from 'lodash/omit';


export default ({name,label,value,onChange,readOnly,error,help, style, ...otherProps}:IBaseSimpleFormComponent)=>{
    const {schema} = otherProps;

    const fieldValue = value === '-'?'-':(schema&&schema.type===Date&&!!value&&value instanceof Date?value.toLocaleDateString('pt-BR'):value);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {height: 50},
        }),
    );
    const classes = useStyles();

    const onFieldChange = (e) => {
        const newValue = e.target.value;
        onChange({name, target: {name, value:newValue}}, {name, value: newValue})
    }
    
    
    if(readOnly) {
        return (<div key={name} style={{display:'flex',flexDirection:'column',...appStyle.fieldContainer}}>
            {label&&!otherProps.rounded?<SimpleLabelView label={label} style={style ? style.displayLabel : undefined} help={help} />:null}
            <TextField variant={'outlined'} InputProps={otherProps.rounded?{classes:classes}:undefined} key={name} onChange={onFieldChange} value={fieldValue} error={!!error} disabled={!!readOnly} id={name} name={name} {...(omit(otherProps,['placeholder'])) } label={otherProps.rounded?label:null} type={'text'}  />
        </div>)
    }
    if(otherProps.isNaked) {
        return (<InputBase key={name} onChange={onFieldChange} value={fieldValue} error={!!error} disabled={!!readOnly} id={name} name={name} label={otherProps.labelDisable? undefined:label } {...otherProps} />);
    }
    return (<div key={name} style={{display: 'flex',flexDirection: 'column',...appStyle.fieldContainer}}>
        {label&&!otherProps.rounded?<SimpleLabelView label={label} help={help} style={style ? {displayLabel: style.displayLabel} : undefined}/>:null}
        <TextField style={style ? style:{ backgroundColor: 'white', borderColor: '#f2f2f2'}} variant={'outlined'} InputProps={otherProps.rounded || otherProps.field?{root: classes.root}:undefined} key={name} onChange={onFieldChange} value={fieldValue} error={!!error} disabled={!!readOnly} id={name} name={name} label={otherProps.rounded?label:null} {...otherProps}/>
    </div>);
}
