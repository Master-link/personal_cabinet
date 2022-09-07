import cn from 'classnames';
import { ButtonUI } from '../buttons';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import * as PropTypes from 'prop-types';

export const SaveAndClose = ({
  disabled = false,
  onSubmit,
  onCloseDialog,
  positiveButtonText = (
    <FormattedMessage id="save" defaultMessage="Save" />
  ),
}) => (
  <>
    <ButtonUI
      disabled={disabled}
      className={cn('ml-1', 'mr-1')}
      onClick={onSubmit}
      variant="outlined"
      color="secondary"
      type="submit"
      text={positiveButtonText}
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
  </>
);

SaveAndClose.propTypes = {
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
};
