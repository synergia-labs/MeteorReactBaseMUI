import React, {useState} from 'react'
import Chip from "@material-ui/core/Chip";
import {hasValue} from "/imports/libs/hasValue";
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import {styles} from './ChipInputStyle'
import _ from 'lodash'

export default ({name,label,value,onChange,readOnly,error,...otherProps}:IBaseSimpleFormComponent) => {

    const[chipText, setChipText] = useState('')

    const handleDelete = (chipItem:string) => {
        const newChip = value.filter((chip:string) => chip !== chipItem)
        setChipText('')
        onChange({name,target:{name,value: newChip}},{name,value: newChip})
    };

    const handleOnChange = (event:React.BaseSyntheticEvent) => {
        setChipText(event.target.value)
    }

    const handleInsert = (chipText:string) => {
        const verifyItemInList = value&&value.find(chip => chip === chipText)||[];
        if(isFieldValid(chipText)&&verifyItemInList.length === 0){
            onChange({target:{value: [...(value || []), chipText]}},{name,value:[...(value || []), chipText]})
        }
        setChipText('')
    }

    const isFieldValid = (field:string) => {
        if(hasValue(field)){
            return true
        }else{
            return false
        }

    }

    return (
        <div style={styles.container}>
            <SimpleLabelView style={styles.title} label={label}/>
            {!readOnly?
                <div style={styles.input}>
                    <TextField
                      label={"chips"}
                      placeholder={otherProps.placeHolder}
                      value={chipText}
                      onChange={handleOnChange}
                      onKeyDown={e => {
                        if (e.keyCode === 13 && e.target.value) {
                          handleInsert(chipText);
                        }
                      }}
                      InputProps={{
                          fullWidth: true,
                          classes: {input: 'fullWidth'},
                          onBlur: ()=>handleInsert(chipText),
                          style: {display: 'block', width: '100%'},
                        startAdornment: <div>{hasValue(value) && value.map((chip: string) => {
                            return <Chip
                                variant="outlined"
                                label={chip}
                                color={'primary'}
                                style={styles.chip}
                                onDelete={readOnly ? undefined : () => handleDelete(chip)}
                                {..._.omit(otherProps, ['disabled', 'checked'])}
                            />
                        })
                        }</div>,
                      }}
                    />
                    <IconButton onClick={()=>handleInsert(chipText)}>
                        <AddIcon style={{fontSize:'2rem'}} color={'primary'}/>
                    </IconButton>
                </div>
                : null
            }
            <div>
              {readOnly && hasValue(value)&& value.map((chip:string) => {
                  return <Chip
                      variant="outlined"
                      label={chip}
                      color={'primary'}
                      style={styles.chip}
                      onDelete={readOnly? undefined : ()=> handleDelete(chip)}
                      {..._.omit(otherProps,['disabled','checked'])}
                  />
              })}
              {!hasValue(value) && readOnly?
                  <div style={styles.containerEmptyChips}>{'Não há chips'}</div>
                : null}
            </div>
        </div>
    )
}
