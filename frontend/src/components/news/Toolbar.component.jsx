import AppBar from '@material-ui/core/AppBar';
import { useStyles } from './use-styles';
import * as PropTypes from 'prop-types';
import cn from 'classnames';

export const Toolbar = ({
  dateFilter,
  pagination,
}) => {
  const classes = useStyles();
  const appBarClassName = cn(
    'pt-1',
    'pb-1',
    'pl-3',
    'pr-3',
    'panel',
    classes.appbar,
  );
  return (
    <div>
      <AppBar
        position="static"
        color="default"
      >
        <div
          className={appBarClassName}
        >
          <div
            className={
              classes.appbar_div
            }
          >
            {dateFilter}
          </div>
          <div>{pagination}</div>
        </div>
      </AppBar>
    </div>
  );
};

Toolbar.propTypes = {
  dateFilter: PropTypes.node,
  pagination: PropTypes.node,
};
