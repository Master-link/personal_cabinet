import CKEditor from 'ckeditor4-react';
import * as PropTypes from 'prop-types';
import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';

export const CkeditorAdapter = ({
  input,
  required,
  label,
  meta,
  height = '500px',
  uiColor = '#1DA7FF',
  onChangeData = (evt) => {
    window.setContent(evt.editor.getData());
  },
}) => {
  const hasRequired =
    meta.submitFailed &&
    meta.error &&
    required &&
    'Mui-error';

  return (
    <>
      <FormLabel component="legend" className={hasRequired}>
        {label}
      </FormLabel>
      {hasRequired && (
        <p className="is_required">{meta.error}</p>
      )}
      <CKEditor
        id={`ckeditor_${input.name}`}
        data={input.value}
        name={input.name}
        config={{
          scayt_autoStartup: false,
          disableNativeSpellChecker: false,
          uiColor,
          height,
          removePlugins:
            'contextmenu,liststyle,tabletools,tableselection,scayt',
          contentsCss:
            'body {font-size: 18px;font-family: sans-serif, arial, helvetica}',
        }}
        onChange={onChangeData}
        onBeforeLoad={(CKEDITOR) =>
          (CKEDITOR.disableAutoInline = true)
        }
      />
    </>
  );
};

CkeditorAdapter.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    submitFailed: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  label: PropTypes.string,
  height: PropTypes.string,
  uiColor: PropTypes.string,
  required: PropTypes.string.isRequired,
};
