import { useEffect, useState } from 'react';
import 'src/components/share/share.style.scss';
import { ButtonUI } from 'src/ui/prepared/buttons';
import { YesOrNoUI } from 'src/ui/prepared/dialogs';
import { useIntl } from 'react-intl';
import {
  getNewClaims,
  refuseClaim,
} from 'src/services/claim-http.service';
import { connect } from 'react-redux';
import { setCount } from 'src/redux/claim/claim.actions';
import * as PropTypes from 'prop-types';
import SnackbarUtils from 'src/utilities/SnackbarUtils';

const ClaimReject = ({ setCount, id }) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(true);

  const rejectClaim = (id) => {
    refuseClaim(id)
      .then((response) => {
        setSent(false);
        const {
          data: { message },
        } = response;

        SnackbarUtils.success(message);
        getNewClaims()
          .then((response) => {
            const {
              data: { count },
            } = response;
            setCount(count);
          })
          .catch(() => {});
      })
      .catch(() => {});
    setOpen(false);
  };

  useEffect(() => {}, []);

  return (
    <>
      {sent && (
        <ButtonUI
          color={'secondary'}
          onClick={() => setOpen(true)}
          text={intl.formatMessage({
            id: 'claim.reject',
            defaultMessage: 'Reject claim',
          })}
          className="ml-2"
        />
      )}

      <YesOrNoUI
        description={intl.formatMessage({
          id: 'claim.is_reject_claim',
          defaultMessage: `Is reject the claim ?`,
        })}
        onCancel={() => {
          setOpen(false);
        }}
        onConfirm={() => {
          rejectClaim(id);
        }}
        isOpen={open}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCount: (data) => dispatch(setCount(data)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ClaimReject);

ClaimReject.propTypes = {
  id: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
};
