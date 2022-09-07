import React from 'react';
import { numberFormat } from './money-format.utility';
import './beauty-money-format.style.scss';

const BeautyMoneyFormat = ({ money, fmt, iso4217_code, styled = true }) => {
  const className = money > 0 ? 'money-positive' : 'money-negative';
  return (
    <>
      {styled ? (
        <span className={className}>
          {numberFormat(money, fmt, iso4217_code)}
        </span>
      ) : (
        <span>{numberFormat(money, fmt, iso4217_code)}</span>
      )}
    </>
  );
};

export default BeautyMoneyFormat;
