import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { putRequest } from '../_services/http-request.js';
import { setRecord } from '../redux/subscription/subscription.actions';
import { setActivated } from '../redux/subscription/subscription.actions';
import { useSnackbar } from 'notistack';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

// Шаблон приостановления подписки
// Вызывается из: src/components/subscriptions/client/service/show.component.jsx
//
const SuspendSubscription = ({
  subscription,
  ...props
}) => {
  const { setActivated } = props;
  const { enqueueSnackbar } = useSnackbar();

  const postData = async () => {
    return await putRequest(

        '/subscriptions/' +
        subscription.id +
        '/suspend',
      null,
    )
      .then((_response) => {
        setActivated(true);
        return {
          message:
            subscription.state === 'state_suspend' ? (
              <FormattedMessage
                id="subscribe.recovered"
                defaultMessage="Subscribe has been recovered"
              />
            ) : (
              <FormattedMessage
                id="subscribe.suspended"
                defaultMessage="Subscribe has been suspended"
              />
            ),
          type: { variant: 'success' },
        };
      })
      .catch((error) => {
        return {
          message:
            error.response.data.message ||
            error.response.data.error,
          type: { variant: 'error' },
        };
      });
  };

  const activate = async () => {
    let resp = await postData();
    enqueueSnackbar(resp.message, resp.type);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={activate}
      >
        {subscription.state === 'state_suspend' ? (
          <>
            <PlayArrowIcon />
            <FormattedMessage
              id="recovery"
              defaultMessage="Recovery"
            />
          </>
        ) : (
          <>
            <PauseIcon />
            <FormattedMessage
              id="suspend"
              defaultMessage="Suspend"
            />
          </>
        )}
      </Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    reduxRecord: state.subscription.record,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRecord: (data) => dispatch(setRecord(data)),
    setActivated: (data) => dispatch(setActivated(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuspendSubscription);
