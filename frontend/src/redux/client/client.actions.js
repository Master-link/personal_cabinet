import ClientTypes from './client.types.js';

export const setData = client =>({
  type: ClientTypes.SET_CLIENT_DATA,
  payload: client
})
export const setCurrentPage = page => ({
  type: ClientTypes.SET_CLIENT_CURRENT_PAGE,
  payload: page
})
export const setTotalPage = page => ({
  type: ClientTypes.SET_CLIENT_TOTAL_PAGE,
  payload: page
})
export const setSort = sort => ({
  type: ClientTypes.SET_CLIENT_SORT,
  payload: sort
})
export const setOrder = order => ({
  type: ClientTypes.SET_CLIENT_ORDER,
  payload: order
})
export const setId = id => ({
  type: ClientTypes.SET_CLIENT_ID,
  payload: id
})
export const setAction = action => ({
  type: ClientTypes.SET_CLIENT_ACTION,
  payload: action
})
export const setRecord = record => ({
  type: ClientTypes.SET_CLIENT_RECORD,
  payload: record
})