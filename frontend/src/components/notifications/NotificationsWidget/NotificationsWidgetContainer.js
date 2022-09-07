import { connect } from 'react-redux';
import { setPostNotifications } from '../../../redux/notification/notification.actions';
import {
  patchNtfMessage,
  patchNtfMessageAll,
} from '../../../services/ntf-http.service';
import { useHistory } from 'react-router-dom';
import { NotificationsWidget } from './NotificationsWidget';
import * as PropTypes from 'prop-types';
import { limitedNotificationsSelector } from '../../../redux/notification/notification.reducer';
import SnackbarUtils from '../../../utilities/SnackbarUtils';
import { useIntl } from 'react-intl';

const NotificationsWidgetContainer = ({
  notifications,
  setPostNotifications,
  limitedNotificationsSelector,
}) => {
  const history = useHistory();
  const intl = useIntl();

  const onRead = async (message_id, index) => {
    try {
      const notify = notifications.filter((item, i) => {
        return i !== index;
      });

      if (notifications[index].id) {
        await patchNtfMessage(message_id);
      }
      setPostNotifications(notify);
    } catch (e) {
      console.error(e);
    }
  };

  const onReadAll = async () => {
    try {
      await patchNtfMessageAll();
      SnackbarUtils.success(
        intl.formatMessage({
          id: 'success',
          defaultMessage: 'Success',
        }),
      );
      setPostNotifications([]);
    } catch (e) {
      console.error(e);
    }
  };

  const generateAmountLabel = () => {
    if (notifications.length > 99) return '99+';
    return notifications.length.toString();
  };

  return (
    <NotificationsWidget
      notifications={limitedNotificationsSelector}
      amount={notifications.length}
      amountLabel={generateAmountLabel()}
      onRead={onRead}
      onReadAll={onReadAll}
      onRedirect={(uri) => history.push(uri)}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications,
    limitedNotificationsSelector: limitedNotificationsSelector(
      state.notification.notifications,
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPostNotifications: (payload) =>
      dispatch(setPostNotifications(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationsWidgetContainer);

NotificationsWidgetContainer.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setPostNotifications: PropTypes.func.isRequired,
};
