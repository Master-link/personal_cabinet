import { breadcrumbsCreate, ClaimForm } from '../index';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as PropTypes from 'prop-types';
import { searchAvailableServices } from 'src/services/service-http.service';
import { searchAvailableTariffs } from 'src/services/tariff-http.service';
import { validate } from 'src/components/claims/Forms/validate';
import { onSubmit } from 'src/components/claims/Forms/onSubmit';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import {
  resetClaim,
  setClaimData,
} from 'src/redux/claim/claim.actions';
import { connect } from 'react-redux';
import { claimDataProps } from 'src/components/_props/claimDataProps';

const ClaimsFormContainer = ({
  clientId,
  setClaimData,
  claimData,
  resetClaim,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const submit = () => {};
  const formHandle = () => {};
  const intl = useIntl();
  const initialValues = {};

  const {
    serviceData,
    tariffData,
    tariff,
    agreement,
    serviceOptions,
    tariffOptions,
    disabledSubmit,
  } = claimData;

  // получить список услуг
  const handleChangeService = async (name, client_id) => {
    const {
      data: { data },
    } = await searchAvailableServices(
      clientId,
      {
        page: 1,
      },
      {
        name: name,
        client_services_for_cities: client_id,
      },
    ).catch((error) => console.log(error));
    return data;
  };

  // получить доступные тарифы
  const handleChangeTariff = async (serviceId, name) => {
    const response = await searchAvailableTariffs(
      clientId,
      serviceId,
      {
        page: 1,
        name,
      },
    ).catch((error) => console.log(error));
    if (response) {
      const {
        data: { data },
      } = response;
      return data;
    }
  };

  useEffect(async () => {
    breadcrumbsCreate(dispatch);
    const data = await handleChangeService('', clientId);
    setClaimData({
      ...claimData,
      serviceOptions: data,
    });
  }, []);

  useEffect(async () => {
    if (serviceData.id) {
      const data = await handleChangeTariff(
        serviceData.id,
        tariff,
      );
      setClaimData({
        ...claimData,
        tariffOptions: data,
      });
    }
  }, [serviceData]);

  const agreementCondition = () =>
    serviceData.allow_subscribe &&
    tariffData.allow_client_subscription &&
    !serviceData.require_submit_client &&
    !tariffData.allow_with_confirmation;

  useEffect(async () => {
    if (agreementCondition()) {
      setClaimData({
        ...claimData,
        agreement: false,
      });
    } else {
      setClaimData({
        ...claimData,
        agreement: true,
      });
    }
  }, [serviceData, tariffData]);

  const submitForm = (values) => {
    const errors = validate(values);
    if (Object.keys(errors).length === 0) {
      onSubmit({
        claim: {
          client_id: clientId,
          service_id: values.service.id,
          tariff_id: values.tariff.id,
          date_activation: values.date_activation,
          comment: values.comment,
        },
      })
        .then(() => {
          history.push('/services_client');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          resetClaim();
        });
    } else {
      return errors;
    }
  };

  return (
    <ClaimForm
      agreementCondition={agreementCondition}
      formHandle={formHandle}
      handleChangeService={(name) => {
        handleChangeService(name, clientId);
      }}
      initialValues={initialValues}
      intl={intl}
      submit={submit}
      submitForm={submitForm}
      claimData={claimData}
      setClaimData={setClaimData}
      serviceData={serviceData}
      tariffData={tariffData}
      agreement={agreement}
      serviceOptions={serviceOptions}
      tariffOptions={tariffOptions}
      disabledSubmit={disabledSubmit}
      resetClaim={resetClaim}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    claimData: state.claim.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setClaimData: (data) => dispatch(setClaimData(data)),
    resetClaim: () => dispatch(resetClaim()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClaimsFormContainer);

ClaimsFormContainer.propTypes = {
  clientId: PropTypes.number,
  setClaimData: PropTypes.func.isRequired,
  claimData: claimDataProps.isRequired,
  resetClaim: PropTypes.func.isRequired,
};
