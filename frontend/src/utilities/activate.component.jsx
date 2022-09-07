import CheckIcon from '@material-ui/icons/Check';
import { connect } from 'react-redux';
import { setActivated } from '../redux/subscription/subscription.actions';
import { useSnackbar } from 'notistack';
import { FormattedMessage } from 'react-intl';
import { ButtonUI } from '../ui/prepared';
import { activateSubscribe } from '../services/subscription-http.service';
import * as PropTypes from 'prop-types';

const errorBuilder = ({
  response: {
    data: { message },
  },
}) => message.result || message;

const Activate = ({
  subscription: { id },
  setActivated,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const activate = async () => {
    try {
      await activateSubscribe(id, null);
      setActivated(true);
      enqueueSnackbar(
        <FormattedMessage
          id="subscribe.activated"
          defaultMessage="The Subscription has been activated"
        />,
        { variant: 'success' },
      );
    } catch (e) {
      enqueueSnackbar(errorBuilder(e), {
        variant: 'error',
      });
    }
  };

  return (
    <ButtonUI
      variant="contained"
      color="primary"
      onClick={activate}
      text={
        <>
          <CheckIcon />
          <FormattedMessage
            id="activate"
            defaultMessage="Activate"
          />
        </>
      }
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActivated: (data) => dispatch(setActivated(data)),
  };
};

Activate.propTypes = {
  subscription: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  setActivated: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(Activate);
