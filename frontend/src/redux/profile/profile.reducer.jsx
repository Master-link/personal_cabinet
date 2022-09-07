import ProfileTypes from './profile.types';
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

const profileRuducer = (state=INITIAL_STATE, action) =>{
  switch (action.type) {
    case ProfileTypes.SET_PROFILE_DATA:
      return {
        ...state,
        data: action.payload
      }
    case ProfileTypes.SET_PROFILE_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.payload
      }
    case ProfileTypes.SET_PROFILE_TOTAL_PAGE:
      return {
        ...state,
        total_page: action.payload
      }
    case ProfileTypes.SET_PROFILE_SORT:
      return {
        ...state,
        sort: action.payload
      }
    case ProfileTypes.SET_PROFILE_ORDER:
      return {
        ...state,
        order: action.payload
      }
    case ProfileTypes.SET_PROFILE_ID:
      return {
        ...state,
        id: action.payload
      }
    case ProfileTypes.SET_PROFILE_ACTION:
      return {
        ...state,
        action: action.payload
      }
    case ProfileTypes.RESET_SERVICE:
      return INITIAL_STATE
    case ProfileTypes.SET_PROFILE_RECORD:
      return {
        ...state,
        record: action.payload
      }
    default:
      return state;
  }
}

export default profileRuducer;