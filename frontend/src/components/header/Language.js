import Flag from 'react-world-flags';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputLabel, Select } from '@material-ui/core';
import { setLang } from '../../redux/lang/lang.actions';
import { useIntl } from 'react-intl';
import * as PropTypes from 'prop-types';

const Language = ({ setLang }) => {
  const intl = useIntl();

  const [language, setLanguage] = useState(
    intl.formatMessage({
      id: 'language_interface',
      defaultMessage: 'User interface language',
    }),
  );

  const [flag, setFlag] = useState(
    localStorage.getItem('lang') || 'ru',
  );

  const handleChange = (event, obj) => {
    setLang(event.target.value);
    localStorage.setItem('lang', event.target.value);
    setFlag(event.target.value);
    setLanguage(obj.props.label);
  };

  return (
    <FormControl>
      <InputLabel id="select-flag-label">
        {language}
      </InputLabel>
      <Select
        className="lang"
        labelId="select-flag-label"
        id="demo-customized-select"
        value={flag}
        onChange={handleChange}
      >
        <MenuItem value="ru" label="Язык интерфейса">
          <Flag code="RU" className="flag" /> Русский
        </MenuItem>
        <MenuItem
          value="en"
          label="User interface language"
        >
          <Flag code="US" className="flag" /> English
        </MenuItem>
      </Select>
    </FormControl>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLang: (lang) => dispatch(setLang(lang)),
  };
};

export default connect(null, mapDispatchToProps)(Language);

Language.propTypes = {
  setLang: PropTypes.func.isRequired,
};
