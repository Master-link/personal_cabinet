import SearchForm from './SearchForm';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getCrmEmployeeManagers } from '../../../services/crm-employees-http.service';
import { stateOptions } from './stateOptions';

const SearchFormContainer = ({
  search,
  employee_id,
  state,
  onSubmitProp,
  onCloseDialog,
  onReset,
}) => {
  const onSubmit = ({ search, state, employee_id }) => {
    onSubmitProp({ search, state, employee_id });
  };

  const [options, setOptions] = useState([]);

  const fetchEmployers = () => {
    return getCrmEmployeeManagers()
      .then((response) => {
        const {
          data: { data },
        } = response;
        setOptions(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  return (
    <SearchForm
      initialValues={{
        search: search,
        state: state,
        employee_id: employee_id,
      }}
      options={options}
      stateOptions={stateOptions}
      onSubmit={onSubmit}
      onCloseDialog={onCloseDialog}
      onReset={onReset}
    />
  );
};

export default SearchFormContainer;

SearchFormContainer.propTypes = {
  search: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  employee_id: PropTypes.number.isRequired,
  onSubmitProp: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
