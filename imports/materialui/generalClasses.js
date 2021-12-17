import makeStyles from '@mui/styles/makeStyles';


export const generalClasses = makeStyles(theme => ({
  root: {
    color: theme.status.danger,
    '&$checked': {
      color: theme.status.danger,
    },
  },
  checked: {},
}));