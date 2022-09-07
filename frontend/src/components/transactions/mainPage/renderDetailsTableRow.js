import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { FormattedMessage } from 'react-intl';

export const renderDetailsTableRow = (
  { label, defaultLabel, value = '-' },
  index = 0,
) => (
  <TableRow key={index}>
    <TableCell component="th">
      <FormattedMessage
        id={label}
        defaultMessage={defaultLabel}
      />
      :
    </TableCell>
    <TableCell align="left">{value || '-'}</TableCell>
  </TableRow>
);
