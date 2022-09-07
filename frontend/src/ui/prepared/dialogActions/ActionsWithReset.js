import cn from 'classnames';
import { ButtonUI } from '../buttons';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import * as PropTypes from 'prop-types';

export const ActionsWithReset = ({
  onReset,
  onSubmit,
  onCloseDialog,
}) => (
  <div className={cn('flex', 'space_btw')}>
    <div>
      <ButtonUI
        onClick={onReset}
        color="secondary"
        text={
          <FormattedMessage
            id="reset"
            defaultMessage="Reset"
          />
        }
      />
    </div>

    <div>
      <ButtonUI
        className={cn('ml-1', 'mr-1')}
        onClick={onSubmit}
        variant="outlined"
        color="secondary"
        type="submit"
        text={
          <FormattedMessage
            id="search"
            defaultMessage="Search"
          />
        }
      />
      <ButtonUI
        className={cn('ml-1', 'mr-1')}
        onClick={onCloseDialog}
        color="secondary"
        text={
          <FormattedMessage
            id="cancel"
            defaultMessage="Cancel"
          />
        }
      />
    </div>
  </div>
);

ActionsWithReset.propTypes = {
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
};
