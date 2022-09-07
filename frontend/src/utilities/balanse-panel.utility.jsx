import ClientBalance from 'src/components/_helpers/Balance/ClientBalance.component';

// Утилита вывода баланса
const BalancePanel = ({ client_id, service_id }) => (
  <ClientBalance
    service_id={service_id}
    client_id={client_id}
  />
);

export default BalancePanel;
