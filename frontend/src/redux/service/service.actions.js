import ServiceTypes from './service.types.js';

export const setData = data =>({
  type: ServiceTypes.SET_SERVICE_DATA,
  payload: data
})
export const setCurrentPage = page => ({
  type: ServiceTypes.SET_SERVICE_CURRENT_PAGE,
  payload: page
})
export const setTotalPage = page => ({
  type: ServiceTypes.SET_SERVICE_TOTAL_PAGE,
  payload: page
})
export const setSort = sort => ({
  type: ServiceTypes.SET_SERVICE_SORT,
  payload: sort
})
export const setOrder = order => ({
  type: ServiceTypes.SET_SERVICE_ORDER,
  payload: order
})
export const setId = id => ({
  type: ServiceTypes.SET_SERVICE_ID,
  payload: id
})
export const setAction = action => ({
  type: ServiceTypes.SET_SERVICE_ACTION,
  payload: action
})
export const setServiceUserId = id => ({
  type: ServiceTypes.SET_SERVICE_USER_ID_ACTION,
  payload: id
})
export const setRecord = record => ({
  type: ServiceTypes.SET_SERVICE_RECORD,
  payload: record
})
export const setServiceReset = () => ({
  type: ServiceTypes.RESET_SERVICE,
  payload: null
})
export const setBalance = (data) => ({
  type: ServiceTypes.SET_BALANCE,
  payload: data
})