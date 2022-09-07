import React, { useEffect, useState } from 'react';
import Myspinner from '../share/myspinner.component';
import { connect } from 'react-redux';
import {
  setBreadcrumb,
  setActive,
} from '../../redux/breadcrumbs/breadcrumbs.actions';
import {
  FormattedMessage,
  FormattedHTMLMessage,
} from 'react-intl';
import { getService } from '../../services/service-http.service';
import '../share/share.style.scss';
import { useHistory } from 'react-router-dom';
import { getNomenclatures } from '../../services/nomenclatures-http.service';
import { getLicenses } from '../../services/licenses-http.service';
import { getSmppAccounts } from '../../services/smpp-http.service';
import {
  getCallbotOperators,
  getOperators,
} from '../../services/operator-http.service';
import * as PropTypes from 'prop-types';
import {
  getTariff,
  postTariff,
  putTariff,
} from '../../services/tariff-http.service';
import { useSnackbar } from 'notistack';
import FormTariff from './forms/FormTariff.component';

const FormTariffContainer = ({
  id,
  service_id,
  setActive,
  setBreadcrumb,
}) => {
  const history = useHistory();
  const [service, setService] = useState();
  const [initialValues, setInitialValues] = useState();
  const [
    nomenclatureOptions,
    setNomenclatureOptions,
  ] = useState([]);
  const [licenseOptions, setLicenseOptions] = useState([]);
  const [
    smppAccountsOptions,
    setSmppAccountsOptions,
  ] = useState([]);
  const [smsOperators, setSmsOperators] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const postData = async (data) => {
    try {
      await postTariff(data);
      enqueueSnackbar(
        <FormattedMessage
          id="successfully_save"
          defaultMessage="Successfully save"
        />,
        { variant: 'success' },
      );
      history.push(`/services/show/${service_id}/tariffs`);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const putData = async (id, data) => {
    try {
      await putTariff(id, data);
      enqueueSnackbar(
        <FormattedMessage
          id="successfully_save"
          defaultMessage="Successfully save"
        />,
        { variant: 'success' },
      );
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const fetchService = async (id = 0) => {
    try {
      const {
        data: { service },
      } = await getService(id);
      setService(service);
      return service;
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const fetchTariff = async (id = 0) => {
    try {
      const {
        data: { tariff },
      } = await getTariff(id);
      return tariff;
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const loadNomenclatures = async () => {
    try {
      const {
        data: { data },
      } = await getNomenclatures();
      setNomenclatureOptions(data);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const loadLicenses = async () => {
    try {
      const {
        data: { data },
      } = await getLicenses();
      setLicenseOptions(data);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const loadSmppAccounts = async () => {
    try {
      const {
        data: { data },
      } = await getSmppAccounts();
      setSmppAccountsOptions(data);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const loadSmsOperators = async () => {
    try {
      const {
        data: { data },
      } = await getOperators();
      setSmsOperators(data);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const loadCallsBotOperators = async () => {
    try {
      const {
        data: { data },
      } = await getCallbotOperators();
      setSmsOperators(data);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  useEffect(async () => {
    if (service) {
      const {
        ticket: { kind },
      } = service;

      if (
        [
          'sms_gate',
          'tech_support',
          'calls_bot',
          'custom',
          'license',
        ].includes(kind)
      ) {
        await loadNomenclatures();
      }

      if (['tech_support', 'license'].includes(kind)) {
        await loadLicenses();
      }

      if (['sms_gate'].includes(kind)) {
        await loadSmppAccounts();
        await loadSmsOperators();
      }

      if (['calls_bot'].includes(kind)) {
        await loadCallsBotOperators();
      }
    }
  }, [service]);

  useEffect(async () => {
    const service = await fetchService(service_id);
    setActive('/services');
    setBreadcrumb([
      {
        name: (
          <FormattedMessage
            id="services"
            defaultMessage="Services"
          />
        ),
        to: `/services`,
      },
      {
        name: (
          <FormattedHTMLMessage
            id="service.name"
            defaultMessage="Service {service}"
            values={{ service: service.name }}
          />
        ),
        to: `/services/show/${service_id}`,
      },
      {
        name: (
          <FormattedMessage
            id="tariffs"
            defaultMessage="Tariffs"
          />
        ),
        to: `/services/show/${service_id}/tariffs`,
      },
      {
        name: id ? (
          <FormattedMessage
            id="tariff.editing"
            defaultMessage="A tariff editing"
          />
        ) : (
          <FormattedMessage
            id="tariff.creating"
            defaultMessage="A tariff creating"
          />
        ),
      },
    ]);

    if (id) {
      setInitialValues(await fetchTariff(id));
    } else {
      setInitialValues({
        extra: {},
        service_id: service.id,
        started_at: null,
        ended_at: null,
      });
    }
  }, []);

  if (!service || !initialValues) return <Myspinner />;
  return (
    <FormTariff
      kind={service.ticket.kind}
      initialValues={initialValues}
      setInitialValues={setInitialValues}
      nomenclatureOptions={nomenclatureOptions}
      licenseOptions={licenseOptions}
      smppAccountsOptions={smppAccountsOptions}
      smsOperators={smsOperators}
      saveData={(data) => {
        id ? putData(id, data) : postData(data);
      }}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb: (data) => dispatch(setBreadcrumb(data)),
    setActive: (active) => dispatch(setActive(active)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(FormTariffContainer);

FormTariffContainer.propTypes = {
  id: PropTypes.number,
  service_id: PropTypes.number.isRequired,
  setBreadcrumb: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
};
