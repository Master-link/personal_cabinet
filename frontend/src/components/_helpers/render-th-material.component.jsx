import * as PropTypes from 'prop-types';
import { TableSortLabel } from '@material-ui/core';
import { StyledTableCell } from './StyledTableCell';

const direction = (order) => {
  if (order === 'asc') {
    return 'desc';
  }
  return 'asc';
};

const renderContent = (
  onClick,
  sort,
  thSort,
  order,
  label,
) => {
  if (!thSort) return label;

  return (
    <TableSortLabel
      active={sort === thSort}
      onClick={() => thSort && onClick()}
      direction={direction(order)}
    >
      {label}
    </TableSortLabel>
  );
};

export const RenderThMaterial = ({
  order,
  sort,
  thSort,
  onClick,
  label,
  style,
}) => (
  <StyledTableCell
    align="left"
    padding="normal"
    style={style}
  >
    {renderContent(onClick, sort, thSort, order, label)}
  </StyledTableCell>
);

RenderThMaterial.propTypes = {
  order: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  thSort: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
  style: PropTypes.string,
};
