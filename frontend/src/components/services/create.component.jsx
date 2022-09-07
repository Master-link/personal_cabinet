import { useDispatch } from 'react-redux';
import Myspinner from '../share/myspinner.component';
import { useEffect, useState } from 'react';
import { breadcrumbsCreateService } from './CreateUpdateService/breadcrumbsCreateService';
import { UserForm } from './CreateUpdateService/UserForm';
import { getCountries } from '../../services/countries-http.service';
import { getLegalEntities } from '../../services/legal-entities-http.service';
import { getCurrencies } from '../../services/currency-http.service';
import { postService } from '../../services/service-http.service';
import { useHistory } from 'react-router-dom';

const serviceStates = [
  { id: 'active', name: 'Активный' },
  { id: 'closed', name: 'Закрытый' },
];

const types = [
  { id: 'active', name: 'Активный' },
  { id: 'closed', name: 'Закрытый' },
];

const Create = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loaded, setLoaded] = useState(true);
  const [countries, setCountries] = useState([]);
  const [legalEntities, setLegalEntities] = useState([]);
  const [currencies, setCurrencies] = useState([]);

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
      await postService(data);
      history.push('/services');
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(async () => {
    await Promise.all([
      fetchCountries(),
      fetchLegalEntities(),
      fetchCurrencies(),
    ]);
    breadcrumbsCreateService(dispatch);
  }, []);

  if (!loaded) {
    return <Myspinner />;
  }
  return (
    <UserForm
      onSubmit={saveUser}
      initialValues={{
        notify_expires_days: 7,
        country_ids: [],
        ticket: {
          kind: null,
          lumpsum: 0,
          can_suspend: false,
          count_balance: false,
          use_credit: false,
          count_statistic: false,
          allow_subscribe: false,
          require_submit_client: false,
          description: '',
        },
      }}
      countries={countries}
      legalEntities={legalEntities}
      currencies={currencies}
      serviceStates={serviceStates}
      types={types}
    />
  );
};

export default Create;
