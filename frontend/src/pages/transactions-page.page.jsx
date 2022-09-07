import React from 'react';
import './homepage.style.scss';
import Transactions from '../components/transactions/transactions.component';

const TransactionsPage = (props) => (
  <div>
    <Transactions {...props} />
  </div>
)

export default TransactionsPage;