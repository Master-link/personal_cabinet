import { useDispatch } from 'react-redux';
import Myspinner from '../share/myspinner.component';
import { useEffect, useState } from 'react';
import { breadcrumbsCreateService } from './CreateUpdateService/breadcrumbsCreateService';
import { UserForm } from './CreateUpdateService/UserForm';
import { getCountries } from '../../services/countries-http.service';
import { getLegalEntities } from '../../services/legal-entities-http.service';
import { getCurrencies } from '../../services/currency-http.service';
import {
  getService,
  postService,
  putService,
} from '../../services/service-http.service';
import { useHistory } from 'react-router-dom';
import * as PropTypes from 'prop-types';

const serviceStates = [
  { id: 'active', name: 'Активный' },
  { id: 'closed', name: 'Закрытый' },
];

const types = [
  { id: 'active', name: 'Активный' },
  { id: 'closed', name: 'Закрытый' },
];

const Edit = ({ id }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(true);
  const [countries, setCountries] = useState([]);
  const [legalEntities, setLegalEntities] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [initialValues, setInitialValues] = useState(null);

  const fetchService = async (id) => {
    setLoaded(false);
    try {
      const {
        data: { service },
      } = await getService(id);
      setInitialValues({
        ...service,
        currency_id: service.currency.id,
        legal_entity_id: service.legal_entity.id,
        country_ids: service.countries.map(({ id }) => id),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  const fetchCurrencies = async () => {
    setLoaded(false);
    try {
      const {
        data: { data },
      } = await getCurrencies();
      setCurrencies(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  const fetchCountries = async () => {
    setLoaded(false);
    try {
      const {
        data: { data },
      } = await getCountries();
      setCountries(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  const fetchLegalEntities = async () => {
    setLoaded(false);
    try {
      const {
        data: { data },
      } = await getLegalEntities({ page: 1 }, {});
      setLegalEntities(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  const saveUser = async (data) => {
    setLoaded(false);
    try {
      await putService(id, data);
      history.push('/services');
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(async () => {
    await Promise.all([
      fetchService(id),
      fetchCountries(),
      fetchLegalEntities(),
      fetchCurrencies(),
    ]);
    breadcrumbsCreateService(dispatch);
  }, []);

  if (!loaded || !initialValues) {
    return <Myspinner />;
  }
  return (
    <UserForm
      onSubmit={saveUser}
      initialValues={initialValues}
      countries={countries}
      legalEntities={legalEntities}
      currencies={currencies}
      serviceStates={serviceStates}
      types={types}
    />
  );
};

Edit.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Edit;
