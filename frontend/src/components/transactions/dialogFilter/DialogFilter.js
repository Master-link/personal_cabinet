import { ButtonUI } from '../../../ui/prepared';
import cn from 'classnames';
import { useState } from 'react';
import SearchForm from '../filter/SearchForm';
import * as PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import { FormattedMessage } from 'react-intl';

const DialogFilter = ({
  countFilters,
  clientId,
  initialValues,
  intl,
  onSubmit,
  serviceId,
  serviceOptions,
  onReset,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <Badge
        color="primary"
        className={cn('ml-3', 'mr-3')}
        badgeContent={countFilters}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ButtonUI
          className={cn('ml-2', 'mr-2')}
          variant="outlined"
          color="secondary"
          text={
            <FormattedMessage
              id="filter"
              defaultMessage="Filter"
            />
          }
          onClick={() => setShowDialog(true)}
        />
      </Badge>
      {showDialog && (
        <SearchForm
          intl={intl}
          clientId={clientId}
          serviceId={serviceId}
          serviceOptions={serviceOptions}
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmit(values);
            setShowDialog(false);
          }}
          onCloseDialog={() => setShowDialog(false)}
          onReset={onReset}
        />
      )}
    </>
  );
};

DialogFilter.propTypes = {
  clientId: PropTypes.string,
  countFilters: PropTypes.number,
  initialValues: PropTypes.shape({
    client_id: PropTypes.string.isRequired,
    service_id: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    date_gte: PropTypes.string.isRequired,
    date_lte: PropTypes.string.isRequired,
  }).isRequired,
  intl: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  serviceId: PropTypes.string,
  serviceOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default DialogFilter;
