import { Field, Form } from 'react-final-form';
import { Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
import { TextFieldAdapter } from '../../_helpers/FinalForm/Controls';
import cn from 'classnames';

const SearchForm = ({
  clientId,
  initialValues,
  onSubmit,
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
            {!clientId && (
              <div className="appeal-name-search">
                <Field
                  component={TextFieldAdapter}
                  name="search"
                  label=<FormattedMessage
                    id="search"
                    defaultMessage="Search"
                  />
                />
              </div>
            )}

            <div className="appeal-number-search">
              <Field
                component={TextFieldAdapter}
                name="id"
                label=<FormattedMessage
                  id="documents.docnumber"
                  defaultMessage="Document №"
                />
              />
            </div>

            <Button
              onClick={handleSubmit}
              variant="outlined"
              color="secondary"
              type="submit"
            >
              <FormattedMessage
                id="search"
                defaultMessage="Search"
              />
            </Button>
          </form>
        </>
      );
    }}
  />
);

SearchForm.propTypes = {
  clientId: PropTypes.string,
  initialValues: PropTypes.shape({
    search: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
