import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#dddddd',
    color: '#333333',
    fontSize: '1rem',
  },
  body: {
    fontSize: '1rem',
  },
}))(TableCell);
