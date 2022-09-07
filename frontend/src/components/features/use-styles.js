import { makeStyles } from '@material-ui/core/styles';
import * as PropTypes from 'prop-types';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

useStyles.propTypes = {
  theme: PropTypes.object.isRequired,
};
