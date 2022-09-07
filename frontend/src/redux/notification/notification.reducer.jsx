import { createSelector } from 'reselect';
import NotificationTypes from './notification.types';
const INITIAL_STATE = {
  notifications: [],
};

export const notificationReducer = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case NotificationTypes.SET_POST_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case NotificationTypes.RESET_NOTIFICATIONS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const notifictionsSelector = (state) => state;

export const limitedNotificationsSelector = createSelector(
  [notifictionsSelector],
  (notifications, limit = 10) =>
    notifications.slice(0, limit),
);
