import {
  DatePickerAdapter,
  TextFieldAdapter,
} from 'src/components/_helpers/FinalForm/Controls';
import { AutocompleteAsync } from 'src/components/_helpers/FinalForm/Controls/AutocompleteAsync';
import { ButtonUI } from 'src/ui/prepared/buttons';
import { Field, Form } from 'react-final-form';
import { FilterForm } from 'src/components/news/form/FilterForm';
import { Grid } from '@material-ui/core';
import { onChangeAutocompleteService } from 'src/components/_helpers/Transaction/Form/functions/onChangeAutocompleteService';
import CheckBox from '@material-ui/core/Checkbox';
import { ClaimAgreement } from 'src/components/claims/Forms/ClaimAgreement';
import * as PropTypes from 'prop-types';
import { claimDataProps } from 'src/components/_props/claimDataProps';

export const ClaimForm = ({
  agreementCondition,
  formHandle,
  initialValues,
  intl,
  submit,
  submitForm,
  serviceData,
  tariffData,
  agreement,
  serviceOptions,
  tariffOptions,
  disabledSubmit,
  claimData,
  setClaimData,
  handleChangeService,
  resetClaim,
}) => {
  return (
    <>
      <FilterForm
        formButtons={
          <Grid item>
            <ButtonUI
              disabled={disabledSubmit || !agreement}
              variant="contained"
              color="primary"
              type="submit"
              onClick={(event) => {
                submit(event);
                resetClaim();
              }}
              text={intl.formatMessage({
                id: 'claim.create',
                defaultMessage: 'Create a claim',
              })}
            />
          </Grid>
        }
      />

      <Form
        onSubmit={submitForm}
        initialValues={initialValues}
        render={({ handleSubmit, form }) => {
          submit = handleSubmit;
          form = form;
          formHandle = form;

          return (
            <form onSubmit={handleSubmit} noValidate>
              <Grid
                container
                sm={12}
                lg={6}
                xs={6}
                alignItems="flex-start"
                spacing={2}
                className="p-20"
              >
                {/**/}
                <Grid item xs={12} key="service">
                  <Field name="service">
                    {({ input }) => (
                      <AutocompleteAsync
                        options={serviceOptions}
                        fieldName="service"
                        onSearch={handleChangeService}
                        label={intl.formatMessage({
                          id: 'service',
                          defaultMessage: 'Service',
                        })}
                        disabled={false}
                        onChange={(value) => {
                          onChangeAutocompleteService(
                            input,
                            value,
                            (value) => {
                              setClaimData({
                                ...claimData,
                                serviceData: value,
                                tariffData: {
                                  id: null,
                                  name: null,
                                },
                              });
                            },
                          );
                          form.change('tariff', undefined);
                        }}
                        value={serviceData}
                      />
                    )}
                  </Field>
                </Grid>
                {/**/}

                {/**/}
                <Grid item xs={12} key="tariff">
                  <Field name="tariff">
                    {({ input }) => (
                      <AutocompleteAsync
                        options={tariffOptions}
                        fieldName="tariff"
                        onSearch={() => {}}
                        label={intl.formatMessage({
                          id: 'tariff',
                          defaultMessage: 'Tariff',
                        })}
                        disabled={!serviceData.id}
                        onChange={(value) =>
                          onChangeAutocompleteService(
                            input,
                            value,
                            (value) => {
                              setClaimData({
                                ...claimData,
                                tariffData: value,
                              });
                            },
                          )
                        }
                        value={tariffData}
                      />
                    )}
                  </Field>
                </Grid>
                {/**/}

                {/**/}
                <Grid item xs={12} key="date_activation">
                  <Field
                    component={DatePickerAdapter}
                    name={'date_activation'}
                    i18nId={'date_activation'}
                    required
                    disabled={!tariffData.id}
                    label={intl.formatMessage({
                      id: 'date_activation',
                      defaultMessage: 'Date activation',
                    })}
                  />
                </Grid>
                {/**/}

                {/**/}
                <Grid item xs={12} key="date_activation">
                  <Field
                    component={TextFieldAdapter}
                    name={'comment'}
                    i18nId={'comment'}
                    required
                    disabled={!tariffData.id}
                    label={intl.formatMessage({
                      id: 'transactions.details.comment',
                      defaultMessage: 'Comment',
                    })}
                  />
                </Grid>
                {/**/}

                {/**/}
                <Grid item xs={12} key="checkbox">
                  {agreementCondition() && (
                    <>
                      <CheckBox
                        checked={agreement}
                        onChange={(event) =>
                          setClaimData({
                            ...claimData,
                            agreement: event.target.checked,
                          })
                        }
                        name="checkedB"
                        color="primary"
                      />
                      {intl.formatMessage({
                        id: 'claim.user_agreement',
                        defaultMessage:
                          'Before creating a subscribe, You agree',
                      })}{' '}
                      <ClaimAgreement
                        is_link={
                          serviceData.agreement_is_link
                        }
                        agreement={agreement}
                      />
                    </>
                  )}
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

ClaimForm.propTypes = {
  agreementCondition: PropTypes.func.isRequired,
  formHandle: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  intl: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  serviceData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    agreement_is_link: PropTypes.bool.isRequired,
  }).isRequired,
  tariffData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  agreement: PropTypes.bool.isRequired,
  serviceOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  tariffOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  disabledSubmit: PropTypes.bool.isRequired,
  claimData: claimDataProps.isRequired,
  setClaimData: PropTypes.func.isRequired,
  handleChangeService: PropTypes.func.isRequired,
  resetClaim: PropTypes.func.isRequired,
};
