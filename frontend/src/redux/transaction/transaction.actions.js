import TransactionTypes from './transaction.types.js';

export const setData = license =>({
  type: TransactionTypes.SET_TRANSACTION_DATA,
  payload: license
})
export const setCurrentPage = page => ({
  type: TransactionTypes.SET_TRANSACTION_CURRENT_PAGE,
  payload: page
})
export const setTotalPage = page => ({
  type: TransactionTypes.SET_TRANSACTION_TOTAL_PAGE,
  payload: page
})
export const setSort = sort => ({
  type: TransactionTypes.SET_TRANSACTION_SORT,
  payload: sort
})
export const setOrder = order => ({
  type: TransactionTypes.SET_TRANSACTION_ORDER,
  payload: order
})
export const setId = id => ({
  type: TransactionTypes.SET_TRANSACTION_ID,
  payload: id
})
export const setAction = action => ({
  type: TransactionTypes.SET_TRANSACTION_ACTION,
  payload: action
})
export const setTransactionReset = () => ({
  type: TransactionTypes.RESET_TRANSACTION,
  payload: null
})
export const setRecord = record => ({
  type: TransactionTypes.SET_TRANSACTION_RECORD,
  payload: record
})
export const setAdd = record => ({
  type: TransactionTypes.SET_TRANSACTION_ADD,
  payload: record
})