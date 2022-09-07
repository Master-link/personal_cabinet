import { Field, Form } from 'react-final-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
import {
  SelectAdapter,
  TextFieldAdapter,
} from '../../_helpers/FinalForm/Controls';
import cn from 'classnames';
import { PaperDialogComponent } from '../../_helpers/MuiDialogs/PaperDialogComponent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { ButtonUI } from '../../../ui/prepared';

const SearchForm = ({
  initialValues,
  options,
  stateOptions,
  onSubmit = () => {},
  onCloseDialog,
  onReset,
}) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    render={({ handleSubmit }) => {
      return (
        <Dialog
          open
          onClose={onCloseDialog}
          maxWidth="sm"
          fullWidth
          aria-labelledby="dialog-title"
          PaperComponent={PaperDialogComponent}
        >
          <form onSubmit={handleSubmit} noValidate>
            <DialogTitle id="dialog-title">
              <FormattedMessage
                id="filter_for_table"
                defaultMessage="Filter for table"
              />
            </DialogTitle>

            <DialogContent>
              <div className={cn('mr-2', 'date-from')}>
                <Field
                  component={TextFieldAdapter}
                  name="search"
                  autoFocus
                  label=<FormattedMessage
                    id="search"
                    defaultMessage="Search"
                  />
                />
              </div>

              <div
                className={cn('mr-2', 'mt-3', 'date-from')}
              >
                <Field
                  component={SelectAdapter}
                  name="employee_id"
                  label=<FormattedMessage
                    id="manager"
                    defaultMessage="Manager OSK"
                  />
                  options={options}
                  keyName="name"
                  allowEmpty
                  emptyText=<FormattedMessage
                    id="no_select"
                    defaultMessage="No select"
                  />
                />
              </div>

              <div
                className={cn('mr-2', 'mt-3', 'date-from')}
              >
                <Field
                  component={SelectAdapter}
                  name="state"
                  label=<FormattedMessage
                    id="have_subscribe_with_state"
                    defaultMessage="Have subsribes wit state"
                  />
                  options={stateOptions}
                  keyName="name"
                  allowEmpty
                  emptyText=<FormattedMessage
                    id="no_select"
                    defaultMessage="No select"
                  />
                />
              </div>
            </DialogContent>

            <DialogActions className="m-3">
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
                    onClick={handleSubmit}
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
            </DialogActions>
          </form>
        </Dialog>
      );
    }}
  />
);

export default SearchForm;

SearchForm.propTypes = {
  initialValues: PropTypes.shape({
    search: PropTypes.string,
    state: PropTypes.string,
    employee_id: PropTypes.string,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  stateOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onSubmit: PropTypes.func,
  onCloseDialog: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
