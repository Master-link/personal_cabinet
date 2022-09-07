import SearchForm from './SearchForm';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getNtfCategories } from '../../../services/ntf-http.service';
import { useIntl } from 'react-intl';

const SearchFormContainer = ({
  category,
  onSubmitProp,
}) => {
  const intl = useIntl();
  const [options, setOptions] = useState([]);
  const onSubmit = ({ category }) => {
    onSubmitProp({ category });
  };

  const fetchNotificationCategories = () => {
    getNtfCategories()
      .then((response) => {
        const {
          data: { categories },
        } = response;

        setOptions(categories);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    fetchNotificationCategories();
  }, []);

  return (
    <SearchForm
      initialValues={{
        category: category || 'null',
      }}
      options={options.map((option) => {
        return {
          ...option,
          title: intl.formatMessage({
            id: option.title,
            defaultMessage: option.title,
          }),
        };
      })}
      onSubmit={onSubmit}
    />
  );
};

export default SearchFormContainer;

SearchFormContainer.propTypes = {
  category: PropTypes.string.isRequired,
  onSubmitProp: PropTypes.func.isRequired,
};
