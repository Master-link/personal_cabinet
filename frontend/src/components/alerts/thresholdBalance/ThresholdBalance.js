import cn from 'classnames';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from '@material-ui/core';
import { PaperDialogComponent } from '../../_helpers/MuiDialogs/PaperDialogComponent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from 'react-intl';
import { ButtonUI } from '../../../ui/prepared';
import { Field, Form } from 'react-final-form';
import { TextFieldAdapter } from '../../_helpers/FinalForm/Controls';
import { CommonFields } from '../DialogSelector/CommonFields';
import * as PropTypes from 'prop-types';

export const ThresholdBalance = ({
  onSubmit,
  onCloseDialog,
  initialValues,
}) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    render={({ handleSubmit }) => {
      return (
        <div className="ml-2">
          <form
            onSubmit={handleSubmit}
            noValidate
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
                  id="alert.edit_settings"
                  defaultMessage="Edit alert settings"
                />
              </DialogTitle>

              <DialogContent>
                <CommonFields />

                {/**/}
                <Grid item xs={12}>
                  <Field name="setting.balance_limit">
                    {({ input }) => (
                      <TextFieldAdapter
                        input={input}
                        label={
                          <FormattedMessage
                            id="balance_treshold"
                            defaultMessage="Notification balance threshold"
                          />
                        }
                        typeField="number"
                      />
                    )}
                  </Field>
                </Grid>
                {/**/}
              </DialogContent>
              <DialogActions className="m-3">
                <ButtonUI
                  className={cn('ml-1', 'mr-1')}
                  onClick={handleSubmit}
                  variant="outlined"
                  color="secondary"
                  type="submit"
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
              </DialogActions>
            </Dialog>
          </form>
        </div>
      );
    }}
  />
);

ThresholdBalance.propTypes = {
  initialValues: PropTypes.shape({
    email_enabled: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      balance_limit: PropTypes.number.isRequired,
    }).isRequired,
    sms_enabled: PropTypes.bool.isRequired,
  }).isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
