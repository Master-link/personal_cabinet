import BalanceTypes from './balance.types';

export const setBalance = (flag) => ({
  type: BalanceTypes.SET_BALANCE_DATA,
  payload: flag,
});
export const setFullBalance = (flag) => ({
  type: BalanceTypes.SET_FULL_BALANCE_DATA,
  payload: flag,
});
export const needBalance = (flag) => ({
  type: BalanceTypes.SET_BALANCE_NEED_BALANCE,
  payload: flag,
});
