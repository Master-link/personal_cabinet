import ProfileTypes from './profile.types.js';

export const setData = license =>({
  type: ProfileTypes.SET_PROFILE_DATA,
  payload: license
})
export const setCurrentPage = page => ({
  type: ProfileTypes.SET_PROFILE_CURRENT_PAGE,
  payload: page
})
export const setTotalPage = page => ({
  type: ProfileTypes.SET_PROFILE_TOTAL_PAGE,
  payload: page
})
export const setSort = sort => ({
  type: ProfileTypes.SET_PROFILE_SORT,
  payload: sort
})
export const setOrder = order => ({
  type: ProfileTypes.SET_PROFILE_ORDER,
  payload: order
})
export const setId = id => ({
  type: ProfileTypes.SET_PROFILE_ID,
  payload: id
})
export const setAction = action => ({
  type: ProfileTypes.SET_PROFILE_ACTION,
  payload: action
})
export const setProfileReset = () => ({
  type: ProfileTypes.RESET_PROFILE,
  payload: null
})
export const setRecord = record => ({
  type: ProfileTypes.SET_PROFILE_RECORD,
  payload: record
})