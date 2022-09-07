import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import './switch_mui.style.scss';
import * as PropTypes from 'prop-types';

export const SwitchMui = ({
  valuePosition = 'top',
  label = '',
  checked = false,
  onChange = () => {},
  color = 'primary',
  minWidth = '130px',
}) => {
  return (
    <FormControl component="fieldset">
      <FormControlLabel
        style={{
          margin: '12px 0 0',
          minWidth: minWidth,
          textAlign: 'center',
        }}
        value={valuePosition}
        control={
          <Switch
            color={color}
            checked={checked}
            onChange={onChange}
          />
        }
        label={
          <span className={'switch_mui__label'}>
            {label}
          </span>
        }
        labelPlacement={valuePosition}
      />
    </FormControl>
  );
};

SwitchMui.propTypes = {
  valuePosition: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  color: PropTypes.string,
  minWidth: PropTypes.string,
};
