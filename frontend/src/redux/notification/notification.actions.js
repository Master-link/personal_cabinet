import NotificationTypes from './notification.types';

export const setPostNotifications = (payload) => ({
  type: NotificationTypes.SET_POST_NOTIFICATIONS,
  payload: payload,
});
export const resetNotifications = () => ({
  type: NotificationTypes.RESET_NOTIFICATIONS,
  payload: null,
});
