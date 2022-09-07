import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import * as PropTypes from 'prop-types';

const SearchFormContainer = ({
  search,
  role,
  searchCrm,
  onSubmitProp,
}) => {
  const onSubmit = ({ search, role, searchCrm }) => {
    onSubmitProp({ search, role, searchCrm });
  };

  return (
    <SearchForm
      initialValues={{
        search: search,
        role: role,
        searchCrm: searchCrm,
      }}
      onSubmit={onSubmit}
    />
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps)(
  SearchFormContainer,
);

SearchFormContainer.propTypes = {
  search: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  searchCrm: PropTypes.string.isRequired,
  onSubmitProp: PropTypes.func.isRequired,
};
