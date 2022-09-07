import { FormattedMessage } from 'react-intl';
import React from 'react';
import { DetectOrder } from '../../utilities/DetectOrder';
import * as PropTypes from 'prop-types';

export const RenderTh = ({
  id,
  defaultMessage,
  style = {},
  order,
  sort,
  thSort,
  onClick,
  noFormat = false,
  prefix = '',
}) => (
  <th
    data-resizable-column-id={`${prefix}${id}`}
    style={style}
    onClick={() => thSort && onClick()}
  >
    <span>
      {noFormat ? (
        defaultMessage
      ) : (
        <FormattedMessage
          id={id}
          defaultMessage={defaultMessage}
        />
      )}

      <DetectOrder
        showSort={sort === thSort && !!thSort}
        order={order}
      />
    </span>
  </th>
);

RenderTh.propTypes = {
  id: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  style: PropTypes.object,
  order: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  thSort: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  noFormat: PropTypes.bool,
};
