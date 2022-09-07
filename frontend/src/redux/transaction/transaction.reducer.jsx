import TransactionTypes from './transaction.types';
const INITIAL_STATE = {
  data: [],
  current_page: 1,
  total_page: 1,
  sort: 'id',
  order: 'asc',
  action: 'index',
  id: null,
  record: null,
  add: false
}

const transactionRuducer = (state=INITIAL_STATE, action) =>{
  switch (action.type) {
    case TransactionTypes.SET_TRANSACTION_DATA:
      return {
        ...state,
        data: action.payload
      }
    case TransactionTypes.SET_TRANSACTION_CURRENT_PAGE:
      return {
        ...state,
        current_page: action.payload
      }
    case TransactionTypes.SET_TRANSACTION_TOTAL_PAGE:
      return {
        ...state,
        total_page: action.payload
      }
    case TransactionTypes.SET_TRANSACTION_SORT:
      return {
        ...state,
        sort: action.payload
      }
    case TransactionTypes.SET_TRANSACTION_ORDER:
      return {
        ...state,
        order: action.payload
      }
    case TransactionTypes.SET_TRANSACTION_ID:
      return {
        ...state,
        id: action.payload
      }
    case TransactionTypes.SET_TRANSACTION_ACTION:
      return {
        ...state,
        action: action.payload
      }
    case TransactionTypes.SET_TRANSACTION_ADD:
      return {
        ...state,
        add: action.payload
      }
    case TransactionTypes.RESET_SERVICE:
      return INITIAL_STATE
    case TransactionTypes.SET_TRANSACTION_RECORD:
      return {
        ...state,
        record: action.payload
      }
    default:
      return state;
  }
}

export default transactionRuducer;