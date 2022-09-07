import TariffTypes from './tariff.types.js';

export const setData = data =>({
  type: TariffTypes.SET_TARIFF_DATA,
  payload: data
})
export const setCurrentPage = page => ({
  type: TariffTypes.SET_TARIFF_CURRENT_PAGE,
  payload: page
})
export const setTotalPage = page => ({
  type: TariffTypes.SET_TARIFF_TOTAL_PAGE,
  payload: page
})
export const setSort = sort => ({
  type: TariffTypes.SET_TARIFF_SORT,
  payload: sort
})
export const setOrder = order => ({
  type: TariffTypes.SET_TARIFF_ORDER,
  payload: order
})
export const setId = id => ({
  type: TariffTypes.SET_TARIFF_ID,
  payload: id
})
export const setAction = action => ({
  type: TariffTypes.SET_TARIFF_ACTION,
  payload: action
})
export const setTariffServiceId = id => ({
  type: TariffTypes.SET_TARIFF_SERVICE_ID,
  payload: id
})
export const setRecord = record => ({
  type: TariffTypes.SET_TARIFF_RECORD,
  payload: record
})