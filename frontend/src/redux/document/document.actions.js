import DocumentTypes from './document.types.js';

export const setData = data =>({
  type: DocumentTypes.SET_DOCUMENT_DATA,
  payload: data
})
export const setCurrentPage = page => ({
  type: DocumentTypes.SET_DOCUMENT_CURRENT_PAGE,
  payload: page
})
export const setTotalPage = page => ({
  type: DocumentTypes.SET_DOCUMENT_TOTAL_PAGE,
  payload: page
})
export const setSort = sort => ({
  type: DocumentTypes.SET_DOCUMENT_SORT,
  payload: sort
})
export const setOrder = order => ({
  type: DocumentTypes.SET_DOCUMENT_ORDER,
  payload: order
})
export const setId = id => ({
  type: DocumentTypes.SET_DOCUMENT_ID,
  payload: id
})
export const setAction = action => ({
  type: DocumentTypes.SET_DOCUMENT_ACTION,
  payload: action
})
export const setDocumentClientId = id => ({
  type: DocumentTypes.SET_DOCUMENT_CLIENT_ID_ACTION,
  payload: id
})
export const setRecord = record => ({
  type: DocumentTypes.SET_DOCUMENT_RECORD,
  payload: record
})
export const setAdd = record => ({
  type: DocumentTypes.SET_DOCUMENT_ADD,
  payload: record
})
export const needUpdate = record => ({
  type: DocumentTypes.SET_DOCUMENT_NEEDUPDATE,
  payload: record
})
export const setDocumentReset = () => ({
  type: DocumentTypes.RESET_DOCUMENT,
  payload: null
})