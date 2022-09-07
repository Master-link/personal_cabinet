import BeautyMoneyFormat from '../../../utilities/beauty-money-format.utility';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export const generateTableDetailsColumns = (item) => [
  { label: 'transactions.details.id', value: item.id },
  {
    label: 'transactions.details.client',
    value: (
      <Link to={`/clients/edit/${item.client.id}`}>
        {item.client.name}
      </Link>
    ),
  },
  {
    label: 'transactions.details.one_c_id',
    value: item.one_c_id,
  },
  { label: 'transactions.details.document' },
  {
    label: 'transactions.details.sum',
    value: (
      <BeautyMoneyFormat
        money={item.money}
        fmt={item.service.currency.fmt}
        iso4217_code={item.service.currency.iso4217_code}
      />
    ),
  },
  {
    label: 'transactions.details.count_sms',
    value: item.detail.count_sms,
  },
  {
    label: 'transactions.details.source',
    value: item.source,
  },
  {
    label: 'transactions.details.ip',
    value: item.detail.ip,
  },
  {
    label: 'transactions.details.created_date',
    value: (
      <Moment format="DD.MM.YYYY HH:mm">
        {item.created_at}
      </Moment>
    ),
  },
  {
    label: 'transactions.details.created_user',
    value: item.user_name,
  },
  { label: 'transactions.details.edited_user' },
  {
    label: 'transactions.details.period',
    value: item.detail.info,
  },
  {
    label: 'transactions.details.comment',
    value: item.detail.comment,
  },
];
