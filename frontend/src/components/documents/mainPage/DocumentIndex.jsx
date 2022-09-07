import * as PropTypes from 'prop-types';
import AddDocumentDialog from '../createDocument/AddDocument.dialog';
import cn from 'classnames';
import SearchForm from '../searchForm/SearchForm';
import SendToEmailDialog from '../sendEmail/SendToEmail.dialog';
import { generateUrlSearchPath } from '../../../utilities/generateUrlSearchPath';
import { Tr } from './Tr.component';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { RenderThMaterial } from '../../_helpers/render-th-material.component';
import { tableThlabelBuilder } from '../../_helpers/tableThlabelBuilder';
import { LIMIT } from '../../../constants/tableParams';

export const DocumentIndex = ({
  afterCreateDocument,
  clientId,
  documents,
  history,
  id,
  isOpenedDialog,
  onDownloadPdf,
  order,
  page,
  route,
  search,
  sendClientId,
  sendId,
  setIsOpenedDialog,
  setSendClientId,
  setSendId,
  sort,
  tableHeaders,
}) => (
  <>
    <div className={cn('flexbox', 'ml-2', 'mr-2')}>
      <div className={cn('flex-container', 'mt-2', 'mb-1')}>
        <AddDocumentDialog
          clientId={clientId}
          afterCreateDocument={afterCreateDocument}
        />

        <SearchForm
          clientId={clientId}
          initialValues={{ search: search, id: id }}
          onSubmit={({ search = '', id = '' }) => {
            const newLink = {
              pathname: route,
              search: generateUrlSearchPath({
                search,
                id,
                ...{ page: 1 },
                ...{ sort: sort },
                ...{ order: order },
              }),
            };
            history.push(newLink);
          }}
        />
      </div>

      <div className={cn('flex-container', 'mt-2', 'mb-2')}>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={documents.pages * LIMIT}
          rowsPerPage={LIMIT}
          page={page - 1}
          onChangePage={(_event, page) => {
            const newLink = {
              pathname: route,
              search: generateUrlSearchPath({
                page: page + 1,
                sort,
                order,
              }),
            };
            history.push(newLink);
          }}
        />
      </div>
    </div>

    <Paper>
      <TableContainer>
        <Table
          size="medium"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              {tableHeaders.map((item, index) => (
                <RenderThMaterial
                  key={index}
                  sort={sort}
                  thSort={item.sort}
                  onClick={() => {
                    const orderDirection =
                      order === `asc` ? `desc` : `asc`;
                    const newLink = {
                      pathname: route,
                      search: generateUrlSearchPath({
                        page,
                        ...{ sort: item.sort },
                        ...{ order: orderDirection },
                      }),
                    };
                    history.push(newLink);
                  }}
                  order={order}
                  id={item.id}
                  sortDirection={
                    sort === item.sort && !!item.sort
                      ? order
                      : false
                  }
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
            {documents.data.map((item, index) => (
              <Tr
                key={index}
                id={item.id}
                crm={item.client.crm}
                client_id={item.client.id}
                client_name={item.client.name}
                documentType={item.document_type}
                fileName={item.file_name}
                history={history}
                serviceName={item.tariff.service.name}
                price={item.price}
                serviceCurrencyFmt={
                  item.tariff.service.currency.fmt
                }
                iso4217Code={
                  item.tariff.service.currency.iso4217_code
                }
                creationDatetime={item.creation_datetime}
                onDownloadPdf={onDownloadPdf}
                onTrClick={() => {
                  setSendId(item.id);
                  setSendClientId(item.client.id);
                  setIsOpenedDialog(true);
                }}
                clientId={clientId}
              />
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={documents.pages * LIMIT}
          rowsPerPage={LIMIT}
          page={page - 1}
          onChangePage={(_event, page) => {
            const newLink = {
              pathname: route,
              search: generateUrlSearchPath({
                page: page + 1,
                sort,
                order,
              }),
            };
            history.push(newLink);
          }}
        />
      </TableContainer>
    </Paper>

    {isOpenedDialog && sendId && sendClientId && (
      <SendToEmailDialog
        id={sendId}
        clientId={sendClientId}
        onCloseDialog={setIsOpenedDialog}
      />
    )}
  </>
);

DocumentIndex.propTypes = {
  afterCreateDocument: PropTypes.func.isRequired,
  clientId: PropTypes.string,
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      document_type: PropTypes.string.isRequired,
      file_name: PropTypes.string.isRequired,
      creation_datetime: PropTypes.string.isRequired,
      tariff: PropTypes.shape({
        service: PropTypes.shape({
          name: PropTypes.string.isRequired,
          currency: PropTypes.shape({
            fmt: PropTypes.string.isRequired,
          }),
        }),
      }),
    }),
  ).isRequired,
  history: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isOpenedDialog: PropTypes.bool.isRequired,
  onDownloadPdf: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  sendId: PropTypes.string.isRequired,
  setIsOpenedDialog: PropTypes.bool.isRequired,
  setSendId: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      defaultMessage: PropTypes.string.isRequired,
      style: PropTypes.object,
      sort: PropTypes.string,
    }),
  ).isRequired,
};
