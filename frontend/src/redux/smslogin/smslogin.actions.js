import SmsloginTypes from './smslogin.types.js';

export const setData = license =>({
  type: SmsloginTypes.SET_SMSLOGIN_DATA,
  payload: license
})
export const setCurrentPage = page => ({
  type: SmsloginTypes.SET_SMSLOGIN_CURRENT_PAGE,
  payload: page
})
export const setTotalPage = page => ({
  type: SmsloginTypes.SET_SMSLOGIN_TOTAL_PAGE,
  payload: page
})
export const setSort = sort => ({
  type: SmsloginTypes.SET_SMSLOGIN_SORT,
  payload: sort
})
export const setOrder = order => ({
  type: SmsloginTypes.SET_SMSLOGIN_ORDER,
  payload: order
})
export const setId = id => ({
  type: SmsloginTypes.SET_SMSLOGIN_ID,
  payload: id
})
export const setAction = action => ({
  type: SmsloginTypes.SET_SMSLOGIN_ACTION,
  payload: action
})
export const setSmsloginReset = () => ({
  type: SmsloginTypes.RESET_SMSLOGIN,
  payload: null
})
export const setRecord = record => ({
  type: SmsloginTypes.SET_SMSLOGIN_RECORD,
  payload: record
})