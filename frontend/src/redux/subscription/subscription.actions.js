import SubscriptionTypes from './subscription.types.js';

export const setData = data =>({
  type: SubscriptionTypes.SET_SUBSCRIPTION_DATA,
  payload: data
})
export const setCurrentPage = page => ({
  type: SubscriptionTypes.SET_SUBSCRIPTION_CURRENT_PAGE,
  payload: page
})
export const setTotalPage = page => ({
  type: SubscriptionTypes.SET_SUBSCRIPTION_TOTAL_PAGE,
  payload: page
})
export const setSort = sort => ({
  type: SubscriptionTypes.SET_SUBSCRIPTION_SORT,
  payload: sort
})
export const setOrder = order => ({
  type: SubscriptionTypes.SET_SUBSCRIPTION_ORDER,
  payload: order
})
export const setId = id => ({
  type: SubscriptionTypes.SET_SUBSCRIPTION_ID,
  payload: id
})
export const setAction = action => ({
  type: SubscriptionTypes.SET_SUBSCRIPTION_ACTION,
  payload: action
})
export const setServiceUserId = id => ({
  type: SubscriptionTypes.SET_SUBSCRIPTION_USER_ID_ACTION,
  payload: id
})
export const setRecord = record => ({
  type: SubscriptionTypes.SET_SUBSCRIPTION_RECORD,
  payload: record
})
export const setActivated = flag => ({
  type: SubscriptionTypes.SET_SUBSCRIPTION_ACTIVATED,
  payload: flag
})
export const setServiceReset = () => ({
  type: SubscriptionTypes.RESET_SERVICE,
  payload: null
})