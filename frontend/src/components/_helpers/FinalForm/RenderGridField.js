import { Grid } from '@material-ui/core';
import { Field } from 'react-final-form';
import * as PropTypes from 'prop-types';
import React from 'react';
import { useIntl } from 'react-intl';

export const RenderGridField = ({ item, options }) => {
  const {
    size,
    field,
    props: { name, label, i18nId, required, disabled },
  } = item;
  const intl = useIntl();

  return (
    <Grid item xs={size}>
      <Field
        component={field}
        name={name}
        i18nId={i18nId}
        required={required}
        disabled={disabled}
        label={intl.formatMessage({
          id: i18nId,
          defaultMessage: label,
        })}
        options={options}
      />
    </Grid>
  );
};

RenderGridField.propTypes = {
  item: PropTypes.shape({
    size: PropTypes.number.isRequired,
    field: PropTypes.any,
    props: PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      i18nId: PropTypes.string.isRequired,
      required: PropTypes.bool,
      disabled: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};
