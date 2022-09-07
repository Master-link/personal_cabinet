import SmsloginTypes from './smslogin.types';
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

const smsloginRuducer = (state=INITIAL_STATE, action) =>{
  switch (action.type) {
    case SmsloginTypes.SET_SMSLOGIN_DATA:
      return {
        ...state,
        data: action.payload
      }
    case SmsloginTypes.SET_SMSLOGIN_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.payload
      }
    case SmsloginTypes.SET_SMSLOGIN_TOTAL_PAGE:
      return {
        ...state,
        total_page: action.payload
      }
    case SmsloginTypes.SET_SMSLOGIN_SORT:
      return {
        ...state,
        sort: action.payload
      }
    case SmsloginTypes.SET_SMSLOGIN_ORDER:
      return {
        ...state,
        order: action.payload
      }
    case SmsloginTypes.SET_SMSLOGIN_ID:
      return {
        ...state,
        id: action.payload
      }
    case SmsloginTypes.SET_SMSLOGIN_ACTION:
      return {
        ...state,
        action: action.payload
      }
    case SmsloginTypes.RESET_SERVICE:
      return INITIAL_STATE
    case SmsloginTypes.SET_SMSLOGIN_RECORD:
      return {
        ...state,
        record: action.payload
      }
    default:
      return state;
  }
}

export default smsloginRuducer;