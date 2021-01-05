import React from 'react';
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
  const [chip, setChip] = React.useState([name, label]);
  const handleChange = (value) => {
    onChange({},{name, label:value})
  }
  const handleDelete = (chipToDelete) => () => {
    setChip((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  return <ChipInput
  //name={name}
  //label={label}
  value={chip.value}
  onChange={()=> handleChange(chip)}
  onDelete={handleDelete(chip)}
  error={!!error} 
  disabled={!!readOnly} 
   {...otherProps} fullWidth 
  //onAdd={(chip) => handleAddChip(chip)}
  />;
}

