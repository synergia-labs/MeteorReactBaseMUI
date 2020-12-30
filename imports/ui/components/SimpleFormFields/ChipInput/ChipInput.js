import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import {hasValue} from "../../../../libs/hasValue";

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

export default function ChipsArray({name,label,value,onDelete,readOnly,error,...otherProps}) {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
    { key: '0', label: 'Exemplo 1' },
    { key: '1', label: 'Exemplo 2' },
    { key: '2', label: 'Exemplo 3' },
    { key: '3', label: 'Exemplo 4' },
    { key: '4', label: 'Exemplo 5' },
  ]);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.map((data) => {
        let icon;

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}  
              value={value}
              error={!!error} 
              disabled={!!readOnly} 
               {...otherProps}
            />
          </li>
        );
      })}
    </Paper>
  );
}
