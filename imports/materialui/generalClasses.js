import {makeStyles} from '@material-ui/styles';

export const generalClasses = makeStyles(theme => ({
  root: {
    color: theme.status.danger,
    '&$checked': {
      color: theme.status.danger,
    },
  },
  checked: {},
}));
