import React, {useState} from 'react'
import Chip from "@material-ui/core/Chip";
import {hasValue} from "/imports/libs/hasValue";
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Check from "@material-ui/icons/Check";
import styles from './ChipInputStyle'

export default ({name,label,value,onChange,readOnly,error,...otherProps}) => {

    const[chipText, setChipText] = useState('')
    const[erro, setErro] = useState('')

    const handleDelete = (event, chipItem) => {
        const newChip = value.filter((chip) => chip !== chipItem)
        setChipText('')
        onChange({},{name,value: newChip})
    };

    const handleOnChange = (event) => {
        setChipText(event.target.value)
    }

    const handleInsert = (chipText) => {
        if(isFieldValid(chipText)){
            onChange({},{name,value:[...value, chipText]})
        }
        setChipText('')
    }

    const isFieldValid = (field) => {
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
                    <TextField value={chipText} onChange={handleOnChange}/>
                    <IconButton onClick={()=>handleInsert(chipText)}>
                        <Check color={'primary'}/>
                    </IconButton>
                </div>
                : null
            }
            <div>
                {hasValue(value)&& value.map((chip) => {
                    return <Chip
                        variant="outlined"
                        label={chip}
                        color={'primary'}
                        style={{margin:'0.5rem'}}
                        onDelete={readOnly? undefined : (event)=> handleDelete(event, chip)}

                    />
                })}
            </div>
        </div>
    )
}