import { thClaims } from './thClaims';
import TrClaims from './TrClaims';
import { states } from '../constants/states';
import Myspinner from 'src/components/share/myspinner.component';
import { SelectMui } from 'src/ui/prepared/selects';
import { ButtonUI } from 'src/ui/prepared/buttons';
import * as PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import { tableThlabelBuilder } from '../../_helpers/tableThlabelBuilder';
import { RenderThMaterial } from '../../_helpers/render-th-material.component';

export const ClaimsAdminPage = ({
  data,
  sort,
  order,
  status,
  disabled,
  intl,
  history,
  claimClaims,
  setClaimClaims,
  paginationProps,
  handleThClick,
}) => (
  <div>
    {!disabled && <Myspinner />}

    <div className="panel p_25-1_25-1">
      <div className="subpanel">
        <SelectMui
          className="m-0-10 w150"
          key="state_filter"
          allowEmpty
          items={states(intl)}
          handleChange={(status) => {
            setClaimClaims({
              ...claimClaims,
              status,
            });
          }}
          label={intl.formatMessage({
            id: 'state',
            defaultMessage: 'State',
          })}
          value={status}
        />

        <ButtonUI
          id="send_claims"
          className="m-0-10"
          text={intl.formatMessage({
            id: 'send',
            defaultMessage: 'Send',
          })}
          onClick={() => {
            setClaimClaims({
              ...claimClaims,
              currentPageNumber: 1,
            });
            history.push({
              pathname: '/claims',
              search: `?search=${status}`,
              state: { message: status },
            });
          }}
        />
      </div>
      <div>
        <TablePagination {...paginationProps} />
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
              {thClaims.map((item, index) => (
                <RenderThMaterial
                  key={index}
                  style={item.style}
                  sort={sort}
                  thSort={item.sort}
                  onClick={() => handleThClick(item.sort)}
                  order={order}
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
            {data.map((item, index) => (
              <TrClaims
                key={index}
                id={item.id}
                client={`${item.client.id}. ${item.client.name} (${item.client.crm})`}
                comment={item.comment}
                clientId={item.client.id}
                service={item.service.name}
                serviceId={item.service.id}
                tariff={item.tariff.name}
                tariffId={item.tariff.id}
                state={item.state}
                history={history}
              />
            ))}
          </TableBody>
        </Table>
        <TablePagination {...paginationProps} />
      </TableContainer>
    </Paper>
  </div>
);

ClaimsAdminPage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      client: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        crm: PropTypes.string.isRequired,
      }),
      comment: PropTypes.string,
      created_at: PropTypes.string.isRequired,
      date_activation: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      service: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      state: PropTypes.string.isRequired,
      tariff: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
  total: PropTypes.number.isRequired,
  currentPageNumber: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  setClaimClaims: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  intl: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  handleThClick: PropTypes.func.isRequired,
  paginationProps: PropTypes.shape({
    component: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    rowsPerPageOptions: PropTypes.array.isRequired,
  }).isRequired,
};
