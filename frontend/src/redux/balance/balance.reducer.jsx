import BalanceTypes from './balance.types';
const INITIAL_STATE = {
  data: 0,
  fullBalance: {
    balance: 0.0,
    balance_name: '',
    decimal_code: '',
    fmt: '',
    hexadecimal_code: '',
    id: 0,
    iso4217_code: '',
    service_name: '',
    unicode_code: '',
  },
  need_balance: false,
};

const breadcrumbsRuducer = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    // TODO: убрать после полного перехода на новый баланс
    case BalanceTypes.SET_BALANCE_DATA:
      return {
        ...state,
        data: action.payload,
      };
    // новый баланс
    case BalanceTypes.SET_FULL_BALANCE_DATA:
      return {
        ...state,
        fullBalance: action.payload,
      };
    // кейс для установки, что нужно делать запрос на получение баланса
    case BalanceTypes.SET_BALANCE_NEED_BALANCE:
      return {
        ...state,
        need_balance: action.payload,
      };
    default:
      return state;
  }
};

export default breadcrumbsRuducer;
