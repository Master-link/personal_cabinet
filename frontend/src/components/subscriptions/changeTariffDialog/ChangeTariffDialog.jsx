import { FormattedMessage } from 'react-intl';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Dialog,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { Field, Form } from 'react-final-form';
import {
  DatePickerAdapter,
  SelectAdapter,
} from '../../_helpers/FinalForm/Controls';
import { PaperDialogComponent } from '../../_helpers/MuiDialogs/PaperDialogComponent';
import moment from 'moment';
import { ButtonUI } from '../../../ui/prepared';
import cn from 'classnames';
import * as PropTypes from 'prop-types';
import { validate } from './validate';

export const ChangeTariffDialog = ({
  onSubmit,
  initialValues,
  onCloseDialog,
  tariffs,
  countSubscriptions,
  fetchCountActiveSubscriptions,
  createDuplicates,
  createdSubscriptions,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    initialValues={initialValues}
    render={({ handleSubmit, form, values, valid }) => {
      return (
        <div className="ml-2">
          <form
            onSubmit={handleSubmit}
            noValidate={false}
            className={cn('flexbox', 'user-search-form')}
          >
            <Dialog
              open
              onClose={onCloseDialog}
              maxWidth="sm"
              fullWidth
              aria-labelledby="dialog-title"
              PaperComponent={PaperDialogComponent}
            >
              <DialogTitle id="dialog-title">
                <FormattedMessage
                  id="creating_task"
                  defaultMessage="Creating a task"
                />
              </DialogTitle>

              <DialogContent>
                <div className={cn('mr-2', 'date-from')}>
                  <Field
                    component={SelectAdapter}
                    name="from"
                    id="from"
                    options={tariffs}
                    keyName="name"
                    label={
                      <FormattedMessage
                        id="from_tariff"
                        defaultMessage="From tariff"
                      />
                    }
                    onChange={(value) => {
                      fetchCountActiveSubscriptions(
                        value.target.value,
                      );
                    }}
                  />
                  <span className="text-small">
                    {countSubscriptions > 0 ? (
                      <>
                        <FormattedMessage
                          id="found"
                          defaultMessage="Found"
                        />
                        : {countSubscriptions}
                      </>
                    ) : (
                      <FormattedMessage
                        id="choose_tariff_with_subscriptions"
                        defaultMessage="Choose tariff with subscriptions, where have to change an another tariff"
                      />
                    )}
                  </span>
                </div>

                <div className={cn('mr-2', 'date-from')}>
                  <Field
                    component={DatePickerAdapter}
                    name="started_at"
                    id="started_at"
                    label={
                      <FormattedMessage
                        id="date_activation"
                        defaultMessage="Date activation"
                      />
                    }
                    disabled={countSubscriptions === 0}
                    onChange={(value) => {
                      if (value) {
                        form.change(
                          'started_at',
                          moment(value).format(
                            'YYYY-MM-DD',
                          ),
                        );
                      } else {
                        form.change('started_at', '');
                      }
                    }}
                  />
                </div>

                <div className={cn('mr-2', 'date-from')}>
                  <Field
                    component={SelectAdapter}
                    disabled={countSubscriptions === 0}
                    name="to"
                    id="to"
                    options={tariffs.filter((item) => {
                      if (
                        form.getFieldState('from') &&
                        item.id !==
                          form.getFieldState('from').value
                      ) {
                        return item;
                      }
                    })}
                    keyName="name"
                    label={
                      <FormattedMessage
                        id="to_tariff"
                        defaultMessage="To tariff"
                      />
                    }
                  />
                </div>
              </DialogContent>
              <DialogActions className="m-3">
                <div className={cn('flex', 'space_btw')}>
                  <div>
                    <ButtonUI
                      onClick={() =>
                        createDuplicates(values)
                      }
                      color="secondary"
                      disabled={
                        !valid || createdSubscriptions
                      }
                      text={
                        <FormattedMessage
                          id="create"
                          defaultMessage="Create"
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
                      disabled={
                        !valid || !createdSubscriptions
                      }
                      text={
                        <FormattedMessage
                          id="save"
                          defaultMessage="Save"
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
            </Dialog>
          </form>
        </div>
      );
    }}
  />
);

ChangeTariffDialog.propTypes = {
  initialValues: PropTypes.shape({
    from: PropTypes.string.isRequired,
    started_at: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  tariffs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  countSubscriptions: PropTypes.number.isRequired,
  fetchCountActiveSubscriptions: PropTypes.func.isRequired,
  createDuplicates: PropTypes.func.isRequired,
  createdSubscriptions: PropTypes.bool.isRequired,
};
