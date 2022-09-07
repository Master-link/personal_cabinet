import { CurrentUser } from '../../utilities/current-user.utility';
import { ActionCable } from 'actioncable-client-react';
import { useEffect, useState } from 'react';
import { setPostNotifications } from '../../redux/notification/notification.actions';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import SnackbarUtils from '../../utilities/SnackbarUtils';

// логика показ снекбара, от если ключ only_display
export const onlyDisplayMessage = ({
  message,
  kind,
  type,
}) => {
  if (kind === 'only_display') {
    SnackbarUtils[`${type}`](message);
  }
};

const LkSocketMessage = ({
  notifications,
  setPostNotifications,
}) => {
  const [messages, setMessages] = useState();
  const [allMessages, setAllMessages] = useState([]);

  const handleReceived = ({ message: { messages } }) => {
    if (Array.isArray(messages))
      return setAllMessages(messages);

    return setMessages(messages);
  };

  useEffect(() => {
    setPostNotifications(allMessages);
  }, [allMessages]);

  useEffect(() => {
    if (messages) {
      setPostNotifications([messages, ...notifications]);
      onlyDisplayMessage(messages);
    }
  }, [messages]);

  return (
    <ActionCable
      channel="LkMessages"
      room={CurrentUser().id}
      onReceived={handleReceived}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notification.notifications,
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
)(LkSocketMessage);

LkSocketMessage.propTypes = {
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
