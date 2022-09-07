import SubscriptionTypes from './subscription.types.js';

const INITIAL_STATE = {
  data: [],
  current_page: 1,
  total_page: 1,
  sort: 'id',
  order: 'asc',
  action: 'index',
  id: null,
  record: {},
  user_id: null,
  activated: false
}

const serviceReducer = (state=INITIAL_STATE, action) =>{
  switch (action.type) {
    case SubscriptionTypes.SET_SUBSCRIPTION_DATA:
      return {
        ...state,
        data: action.payload
      }
    case SubscriptionTypes.SET_SUBSCRIPTION_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.payload
      }
    case SubscriptionTypes.SET_SUBSCRIPTION_TOTAL_PAGE:
      return {
        ...state,
        total_page: action.payload
      }
    case SubscriptionTypes.SET_SUBSCRIPTION_SORT:
      return {
        ...state,
        sort: action.payload
      }
    case SubscriptionTypes.SET_SUBSCRIPTION_ORDER:
      return {
        ...state,
        order: action.payload
      }
    case SubscriptionTypes.SET_SUBSCRIPTION_ID:
      return {
        ...state,
        id: action.payload
      }
    case SubscriptionTypes.SET_SUBSCRIPTION_ACTION:
      return {
        ...state,
        action: action.payload
      }
    case SubscriptionTypes.SET_SUBSCRIPTION_USER_ID_ACTION:
      return {
        ...state,
        user_id: action.payload
      }
    case SubscriptionTypes.SET_SUBSCRIPTION_RECORD:
      return {
        ...state,
        record: action.payload
      }
    case SubscriptionTypes.SET_SUBSCRIPTION_ACTIVATED:
      return {
        ...state,
        activated: action.payload
      }
    case SubscriptionTypes.RESET_SUBSCRIPTION:
      return  INITIAL_STATE
    default:
      return state;
  }
}

export default serviceReducer;