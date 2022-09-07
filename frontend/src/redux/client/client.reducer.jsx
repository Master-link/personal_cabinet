import ClientTypes from './client.types.js';
const INITIAL_STATE = {
  data: [],
  current_page: 1,
  total_page: 1,
  sort: 'id',
  order: 'asc',
  action: 'index',
  id: null,
  record: null
}

const clientReducer = (state=INITIAL_STATE, action) =>{
  switch (action.type) {
    case ClientTypes.SET_CLIENT_DATA:
      return {
        ...state,
        data: action.payload
      }
    case ClientTypes.SET_CLIENT_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.payload
      }
    case ClientTypes.SET_CLIENT_TOTAL_PAGE:
      return {
        ...state,
        total_page: action.payload
      }
    case ClientTypes.SET_CLIENT_SORT:
      return {
        ...state,
        sort: action.payload
      }
    case ClientTypes.SET_CLIENT_ORDER:
      return {
        ...state,
        order: action.payload
      }
    case ClientTypes.SET_CLIENT_ID:
      return {
        ...state,
        id: action.payload
      }
    case ClientTypes.SET_CLIENT_ACTION:
      return {
        ...state,
        action: action.payload
      }
    case ClientTypes.SET_CLIENT_RECORD:
      return {
        ...state,
        record: action.payload
      }
    default:
      return state;
  }
}

export default clientReducer;