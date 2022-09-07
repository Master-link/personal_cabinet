import CKEditor from 'ckeditor4-react';
import * as PropTypes from 'prop-types';
import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';

export const CkeditorAdapterLimited = ({
  input,
  label,
  meta,
  height = '500px',
  uiColor = '#1DA7FF',
  onChangeData = (evt) => {
    window.setContent(evt.editor.getData());
  },
}) => {
  const hasRequired =
    meta.submitFailed && meta.error && 'Mui-error';

  return (
    <>
      <FormLabel component="legend" className={hasRequired}>
        {label}
      </FormLabel>
      {hasRequired && (
        <p className="is_required">{meta.error}</p>
      )}
      <CKEditor
        id="add_question_form"
        data={input.value}
        name={input.name}
        config={{
          scayt_autoStartup: false,
          disableNativeSpellChecker: false,
          uiColor,
          height,
          toolbar: [
            ['Bold', 'Italic'],
            ['Undo', 'Redo'],
          ],
          contentsCss:
            'body {font-size: 18px;font-family: sans-serif, arial, helvetica}',
        }}
        className={'m-3'}
        onChange={onChangeData}
        onBeforeLoad={(CKEDITOR) =>
          (CKEDITOR.disableAutoInline = true)
        }
      />
    </>
  );
};

CkeditorAdapterLimited.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    submitFailed: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  label: PropTypes.string,
  onChangeData: PropTypes.func,
  height: PropTypes.string.isRequired,
  uiColor: PropTypes.string.isRequired,
};
