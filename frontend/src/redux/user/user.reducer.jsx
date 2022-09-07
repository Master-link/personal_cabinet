import UserTypes from './user.types.js';
const INITIAL_STATE = {
  data: [],
  current_page: 1,
  total_page: 1,
  sort: 'id',
  order: 'asc',
  action: 'index',
  id: null,
  record: null,
  token: localStorage.getItem('currentToken'),
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.SET_USER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case UserTypes.SET_USER_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.payload,
      };
    case UserTypes.SET_USER_TOTAL_PAGE:
      return {
        ...state,
        total_page: action.payload,
      };
    case UserTypes.SET_USER_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case UserTypes.SET_USER_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case UserTypes.SET_USER_ID:
      return {
        ...state,
        id: action.payload,
      };
    case UserTypes.SET_USER_ACTION:
      return {
        ...state,
        action: action.payload,
      };
    case UserTypes.SET_USER_RECORD:
      return {
        ...state,
        record: action.payload,
      };
    case UserTypes.SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
