import { Field, Form } from 'react-final-form';
import { Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
import { SelectAdapter } from '../../_helpers/FinalForm/Controls';
import cn from 'classnames';

const SearchForm = ({
  initialValues,
  options,
  onSubmit = () => {},
}) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    render={({ handleSubmit }) => {
      return (
        <>
          <form
            onSubmit={handleSubmit}
            noValidate
            className={cn('flexbox', 'user-search-form')}
          >
            <div className="appeal-name-search appeal-status-search">
              <Field
                component={SelectAdapter}
                name="category"
                label=<FormattedMessage
                  id="category"
                  defaultMessage="Category"
                />
                options={options}
                keyName="title"
                keyId="id"
                allowEmpty
                emptyText=<FormattedMessage
                  id="no_select"
                  defaultMessage="No select"
                />
              />
            </div>
          </form>

          <Button
            onClick={handleSubmit}
            variant="outlined"
            color="secondary"
          >
            <FormattedMessage
              id="search"
              defaultMessage="Search"
            />
          </Button>
        </>
      );
    }}
  />
);

export default SearchForm;

SearchForm.propTypes = {
  initialValues: PropTypes.shape({
    search: PropTypes.string,
    status: PropTypes.string,
    appealNumber: PropTypes.string,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onSubmit: PropTypes.func,
};
