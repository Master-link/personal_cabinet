import { validate } from './validate';
import { FilterForm } from '../../news/form/FilterForm';
import { Grid } from '@material-ui/core';
import { ButtonUI } from '../../../ui/prepared';
import { Field, Form } from 'react-final-form';
import { TextFieldAdapter } from '../../_helpers/FinalForm/Controls';
import * as PropTypes from 'prop-types';

export const SentToEmailForm = ({
  intl,
  isDisabledSubmit,
  onSubmitForm,
}) => {
  let submit = () => {};

  const submitForm = (values) => {
    const errors = validate(values);
    if (Object.keys(errors).length === 0) {
      onSubmitForm({
        email: values.email,
      });
    } else {
      return errors;
    }
  };

  return (
    <>
      <FilterForm
        formButtons={
          <Grid item>
            <ButtonUI
              disabled={isDisabledSubmit}
              variant="contained"
              color="primary"
              type="submit"
              onClick={(event) => {
                submit(event);
              }}
              text={intl.formatMessage({
                id: 'send',
                defaultMessage: 'Send',
              })}
            />
          </Grid>
        }
      />

      <Form
        onSubmit={(values) => submitForm(values)}
        initialValues={{}}
        render={({ handleSubmit, form }) => {
          submit = handleSubmit;
          return (
            <form noValidate>
              <Grid
                container
                alignItems="flex-start"
                className="p-20"
              >
                {/**/}
                <Grid item xs={12} key="price">
                  <Field
                    component={TextFieldAdapter}
                    name="email"
                    label={intl.formatMessage(
                      {
                        id: 'enter_valid',
                        defaultMessage:
                          'Enter valid {field_name}',
                      },
                      { field_name: 'email' },
                    )}
                  />
                </Grid>
                {/**/}
              </Grid>
            </form>
          );
        }}
      />
    </>
  );
};

SentToEmailForm.propTypes = {
  intl: PropTypes.func.isRequired,
  isDisabledSubmit: PropTypes.bool.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};
