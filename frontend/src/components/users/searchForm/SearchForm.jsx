import { Field, Form } from 'react-final-form';
import { Button } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import * as PropTypes from 'prop-types';
import {
  SelectAdapter,
  TextFieldAdapter,
} from '../../_helpers/FinalForm/Controls';
import cn from 'classnames';

const roles = [
  {
    id: ' ',
    title: (
      <FormattedMessage id="all" defaultMessage="All" />
    ),
  },
  {
    id: 'admin',
    title: (
      <FormattedMessage
        id="role.admin"
        defaultMessage="Admin"
      />
    ),
  },
  {
    id: 'observer',
    title: (
      <FormattedMessage
        id="role.observer"
        defaultMessage="Observer"
      />
    ),
  },
  {
    id: 'manager',
    title: (
      <FormattedMessage
        id="role.manager"
        defaultMessage="Manager"
      />
    ),
  },
  {
    id: 'employee',
    title: (
      <FormattedMessage
        id="role.employee"
        defaultMessage="Employee"
      />
    ),
  },
  {
    id: 'director',
    title: (
      <FormattedMessage
        id="role.director"
        defaultMessage="Director"
      />
    ),
  },
  {
    id: 'client',
    title: (
      <FormattedMessage
        id="role.client"
        defaultMessage="Client"
      />
    ),
  },
];

const SearchForm = ({
  initialValues = {},
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
            <div className="user-name-search">
              <Field
                component={TextFieldAdapter}
                name="search"
                label=<FormattedMessage
                  id="user_fields_search"
                  defaultMessage="Login, email, phone, ФИО"
                />
              />
            </div>

            <div className="user-role-search">
              <Field
                component={SelectAdapter}
                name="role"
                label=<FormattedMessage
                  id="role"
                  defaultMessage="Role"
                />
                options={roles}
              />
            </div>

            <div className="user-crm-search">
              <Field
                component={TextFieldAdapter}
                name="searchCrm"
                label=<FormattedMessage
                  id="crm"
                  defaultMessage="CRM"
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

export default SearchForm;

SearchForm.propTypes = {
  initialValues: PropTypes.shape({
    search: PropTypes.string,
    role: PropTypes.string,
    searchCrm: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func,
};
