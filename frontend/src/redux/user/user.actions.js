import UserTypes from './user.types.js';

export const setData = (data) => ({
  type: UserTypes.SET_USER_DATA,
  payload: data,
});
export const setCurrentPage = (page) => ({
  type: UserTypes.SET_USER_CURRENT_PAGE,
  payload: page,
});
export const setTotalPage = (page) => ({
  type: UserTypes.SET_USER_TOTAL_PAGE,
  payload: page,
});
export const setSort = (sort) => ({
  type: UserTypes.SET_USER_SORT,
  payload: sort,
});
export const setOrder = (order) => ({
  type: UserTypes.SET_USER_ORDER,
  payload: order,
});
export const setId = (id) => ({
  type: UserTypes.SET_USER_ID,
  payload: id,
});
export const setAction = (action) => ({
  type: UserTypes.SET_USER_ACTION,
  payload: action,
});
export const setRecord = (record) => ({
  type: UserTypes.SET_USER_RECORD,
  payload: record,
});
export const setUserToken = (token) => ({
  type: UserTypes.SET_USER_TOKEN,
  payload: token,
});
