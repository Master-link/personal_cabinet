import ServiceTypes from './service.types.js';
const INITIAL_STATE = {
  data: [],
  current_page: 1,
  total_page: 1,
  sort: 'id',
  order: 'asc',
  action: 'index',
  id: null,
  record: null,
  user_id: null,
  balance: 0,
};

const serviceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ServiceTypes.SET_SERVICE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ServiceTypes.SET_SERVICE_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.payload,
      };
    case ServiceTypes.SET_SERVICE_TOTAL_PAGE:
      return {
        ...state,
        total_page: action.payload,
      };
    case ServiceTypes.SET_SERVICE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case ServiceTypes.SET_SERVICE_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case ServiceTypes.SET_SERVICE_ID:
      return {
        ...state,
        id: action.payload,
      };
    case ServiceTypes.SET_SERVICE_ACTION:
      return {
        ...state,
        action: action.payload,
      };
    case ServiceTypes.SET_SERVICE_USER_ID_ACTION:
      return {
        ...state,
        user_id: action.payload,
      };
    case ServiceTypes.SET_SERVICE_RECORD:
      return {
        ...state,
        record: action.payload,
      };
    case ServiceTypes.RESET_SERVICE:
      return INITIAL_STATE;
    case ServiceTypes.SET_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return state;
  }
};

export default serviceReducer;
