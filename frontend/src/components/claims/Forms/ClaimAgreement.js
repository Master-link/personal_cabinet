import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from 'react-intl';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { ButtonUI } from 'src/ui/prepared/buttons';
import * as PropTypes from 'prop-types';

export const ClaimAgreement = ({ is_link, agreement }) => {
  const intl = useIntl();
  const [show, setShow] = useState(false);

  return (
    <>
      {is_link ? (
        <a
          className="pointer bold"
          href={agreement}
          target="_blank"
        >
          {intl.formatMessage({
            id: 'claim.this_agreement',
            defaultMessage: 'this agreement',
          })}
        </a>
      ) : (
        <a
          className="pointer bold"
          onClick={() => setShow(true)}
        >
          {intl.formatMessage({
            id: 'claim.this_agreement',
            defaultMessage: 'this agreement',
          })}
        </a>
      )}

      <Dialog
        key={`dialog-change-password`}
        open={show}
        onClose={() => setShow(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage
            id="claim.agreement"
            defaultMessage={`Claim agreement`}
          />
        </DialogTitle>
        <DialogContent>
          <div
            dangerouslySetInnerHTML={{ __html: agreement }}
          />
        </DialogContent>
        <DialogActions className={'p-20'}>
          <ButtonUI
            onClick={() => setShow(false)}
            color="secondary"
            text={intl.formatMessage({
              id: 'close',
              defaultMessage: 'Close',
            })}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

ClaimAgreement.propTypes = {
  clientId: PropTypes.string,
};
