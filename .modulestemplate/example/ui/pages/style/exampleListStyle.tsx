import {makeStyles} from '@mui/styles';

export const useStylesExampleList = makeStyles({
  table: {
    minWidth: 500,
  },
  selectDropdown: {color: '#fff', backgroundColor: '#1b1f38'},
  menuItem: {
    '&:hover': {
      backgroundColor: '#3b3f58',
    },
  },
  space: {
    flex: 'none',
    width: 'fit-content',
  },
  caption: {
    flex: 'none',
    width: 'fit-content',
  },
});