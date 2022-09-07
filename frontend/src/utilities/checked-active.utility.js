import React from 'react';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const CheckedActive = ({status}) => {
  if (status) {
    return <CheckBoxIcon />
  } else {
    return <CheckBoxOutlineBlankIcon />
  }
}

export default CheckedActive;