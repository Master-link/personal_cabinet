import TariffTypes from './tariff.types.js';
const INITIAL_STATE = {
  data: [],
  current_page: 1,
  total_page: 1,
  sort: 'id',
  order: 'asc',
  action: 'index',
  id: null,
  record: {
    extra: {
      allow_client_subscription: false,
      changeable: false,
      allow_with_confirmation: false
    }
  },
  service_id: null
}

const tariffReducer = (state=INITIAL_STATE, action) =>{
  switch (action.type) {
    case TariffTypes.SET_TARIFF_DATA:
      return {
        ...state,
        data: action.payload
      }
    case TariffTypes.SET_TARIFF_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.payload
      }
    case TariffTypes.SET_TARIFF_TOTAL_PAGE:
      return {
        ...state,
        total_page: action.payload
      }
    case TariffTypes.SET_TARIFF_SORT:
      return {
        ...state,
        sort: action.payload
      }
    case TariffTypes.SET_TARIFF_ORDER:
      return {
        ...state,
        order: action.payload
      }
    case TariffTypes.SET_TARIFF_ID:
      return {
        ...state,
        id: action.payload
      }
    case TariffTypes.SET_TARIFF_ACTION:
      return {
        ...state,
        action: action.payload
      }
    case TariffTypes.SET_TARIFF_SERVICE_ID:
      return {
        ...state,
        service_id: action.payload
      }
    case TariffTypes.SET_TARIFF_RECORD:
      return {
        ...state,
        record: action.payload
      }
    default:
      return state;
  }
}

export default tariffReducer;