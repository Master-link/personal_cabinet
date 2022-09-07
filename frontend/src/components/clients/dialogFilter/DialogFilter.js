import cn from 'classnames';
import { useState } from 'react';
import Badge from '@material-ui/core/Badge';
import { ButtonUI } from '../../../ui/prepared';
import SearchFormContainer from '../searchForm/SearchForm.container';
import * as PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export const DialogFilter = ({
  search,
  employee_id,
  state,
  onSubmitProp,
  onReset,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Badge
        color="primary"
        className={cn('ml-3', 'mr-3')}
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
        <SearchFormContainer
          search={search}
          employee_id={employee_id}
          state={state}
          onSubmitProp={(values) => {
            onSubmitProp(values);
            setShowDialog(false);
          }}
          onReset={() => {
            setShowDialog(false);
            onReset();
          }}
          onCloseDialog={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

DialogFilter.propTypes = {
  search: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  employee_id: PropTypes.string.isRequired,
  onSubmitProp: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
