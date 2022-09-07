import Index from './mainPage/TransactionIndex.component';

const Transactions = ({ action, client_id }) => (
  <>
    {action === 'transactions_index' && (
      <Index client_id={client_id} action={action} />
    )}
    {action === 'transactions_client' && (
      <Index client_id={client_id} action={action} />
    )}
    {action === 'index' && <Index action={action} />}
  </>
);

export default Transactions;
