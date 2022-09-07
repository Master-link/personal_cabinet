import {
  Drawer,
  Table,
  TableBody,
  TableRow,
} from '@material-ui/core';
import { thHeader } from './thHeader';
import { Tr } from './Tr.component';
import { FormattedMessage } from 'react-intl';
import { generateTableDetailsColumns } from './generateTableDetailsColumns';
import { renderDetailsTableRow } from './renderDetailsTableRow';
import * as PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import { RenderThMaterial } from '../../_helpers/render-th-material.component';
import { tableThlabelBuilder } from '../../_helpers/tableThlabelBuilder';

export const TransactionIndex = ({
  onToggleDrawer,
  transactions,
  showDrawer,
  transactionInfo,
  sort,
  order,
  onSort,
}) => {
  const generateSortDirection = (item, sort) =>
    sort === item.sort && !!item.sort ? order : '';
  return (
    <>
      <Table
        size="medium"
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            {thHeader.map((item, index) => (
              <RenderThMaterial
                sort={sort}
                thSort={item.sort}
                onClick={() => {
                  onSort(item.sort);
                }}
                order={order}
                id={item.id}
                sortDirection={generateSortDirection(
                  item,
                  sort,
                )}
                defaultMessage={item.defaultMessage}
                label={tableThlabelBuilder(
                  item.noFormat,
                  item.defaultMessage,
                  item.id,
                )}
              />
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {transactions.map((item, index) => (
            <Tr
              key={index}
              service={item.service}
              client={item.client}
              money={item.money}
              updated_at={item.updated_at}
              source={item.source}
              detail={item.detail}
              onClick={() => onToggleDrawer(item)}
            />
          ))}
        </TableBody>
      </Table>

      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => {
          onToggleDrawer(null);
        }}
        className="transaction_info"
      >
        <h3>
          <FormattedMessage id="details" />
        </h3>
        <table className="profile">
          <thead></thead>
          <tbody>
            {transactionInfo && (
              <>
                {generateTableDetailsColumns(
                  transactionInfo,
                ).map(renderDetailsTableRow)}
              </>
            )}
          </tbody>
        </table>
      </Drawer>
    </>
  );
};

TransactionIndex.propTypes = {
  order: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  afterCreateDocument: PropTypes.func.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      service: PropTypes.shape({
        name: PropTypes.string.isRequired,
        currency: PropTypes.shape({
          fmt: PropTypes.string.isRequired,
          iso4217_code: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      client: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      money: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      detail: PropTypes.shape({
        count_sms: PropTypes.string.isRequired,
        document_number: PropTypes.string.isRequired,
        info: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  showDrawer: PropTypes.bool.isRequired,
  transactionInfo: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    defaultLabel: PropTypes.string.isRequired,
  }).isRequired,
};
