import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {hasValue} from "../../../../libs/hasValue";
import AddIcon from '@material-ui/icons/Add';
import ChipInput from 'material-ui-chip-input';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray({name,label,value,onChange,readOnly,error,...otherProps}) {
  const [chip, setChip] = React.useState(value);

  useEffect(()=> {
    if(!hasValue(chip)){
      setChip(value)
    }
  })

  const handleChange = (value) => {
    const newValue = [...chip, ...value]
    setChip(newValue)
    onChange({},{name, value:newValue})
  }
  const handleDelete = (chipToDelete) => {
    const newChip = value.filter((chip) => chip !== chipToDelete)
    setChip(newChip)
    onChange({},{name,value: newChip})
  };
  return <ChipInput
  //name={name}
      //   //label={label}
  value={chip}
  onChange={handleChange}
  onDelete={handleDelete}
  error={!!error}
  {...otherProps}
  fullWidth
  //onAdd={(chip) => handleAddChip(chip)}
  />;
}

