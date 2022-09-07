import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(
  (theme) => ({
    appbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    appbar_div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }),
);
