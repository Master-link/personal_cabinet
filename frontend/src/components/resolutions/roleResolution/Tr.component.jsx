import * as PropTypes from 'prop-types';
import MuiCheckbox from '../../_helpers/mui-checkox.component';
import { Field } from 'react-final-form';
import { StyledTableRow } from '../../_helpers/StyledTableRow';
import { StyledTableCell } from '../../_helpers/StyledTableCell';

export const Tr = ({
  comment,
  finalFormNamePrefix,
  name,
}) => (
  <StyledTableRow hover>
    <StyledTableCell align="left">
      <Field name={`${finalFormNamePrefix}.has_resolution`}>
        {({ input }) => (
          <MuiCheckbox
            input={input}
            className="no_margin"
            classNameCheckbox="no_padding"
          />
        )}
      </Field>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span title={name}>{name}</span>
    </StyledTableCell>
    <StyledTableCell align="left">
      <span title={comment}>{comment}</span>
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  comment: PropTypes.string.isRequired,
  finalFormNamePrefix: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
