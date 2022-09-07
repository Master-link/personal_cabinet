import * as PropTypes from 'prop-types';
import { StyledTableRow } from '../../_helpers/StyledTableRow';
import { StyledTableCell } from '../../_helpers/StyledTableCell';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const generateCss = (state) => {
  if (state === 'state_active') {
    return 'green_text';
  }
  return 'red_text';
};

const generateLinkClient = (clientId, serviceId, crm) => {
  if (clientId && serviceId && crm) {
    return (
      <Link
        to={`/clients/show/${clientId}/services/show/${serviceId}/subscriptions`}
      >
        {crm}
      </Link>
    );
  }
  return crm;
};

const generateLinkSubscribe = (
  clientId,
  serviceId,
  subscriptionId,
) => {
  if (clientId && serviceId && subscriptionId) {
    return (
      <Link
        to={`/clients/show/${clientId}/services/show/${serviceId}/subscriptions/edit/${subscriptionId}`}
      >
        {subscriptionId}
      </Link>
    );
  }
  return subscriptionId;
};

export const Tr = ({ closed, renewed, onClick }) => (
  <StyledTableRow hover onClick={onClick}>
    <StyledTableCell align="left">
      {closed.map(({ crm, subscription }, index) => (
        <div key={index}>
          <ul>
            <li>CRM: {crm}</li>
            <li>
              <FormattedMessage
                id="subscribe"
                defaultMessage="Subscribe"
              />
              : {subscription}
            </li>
            <li>
              <FormattedMessage
                id="state"
                defaultMessage="State"
              />
              :{' '}
              <FormattedMessage
                id="terminated"
                defaultMessage="Terminated"
              />
            </li>
          </ul>
        </div>
      ))}
    </StyledTableCell>
    <StyledTableCell align="left">
      {renewed.map(
        (
          {
            crm,
            client_id,
            service_id,
            subscription,
            state_now,
          },
          index,
        ) => (
          <div key={index}>
            <ul>
              <li>
                CRM:{' '}
                <b>
                  {generateLinkClient(
                    client_id,
                    service_id,
                    crm,
                  )}
                </b>
              </li>
              <li>
                <FormattedMessage
                  id="subscribe"
                  defaultMessage="Subscribe"
                />
                :{' '}
                <b>
                  {generateLinkSubscribe(
                    client_id,
                    service_id,
                    subscription,
                  )}
                </b>
              </li>
              <li className={generateCss(state_now)}>
                <FormattedMessage
                  id="state"
                  defaultMessage="State"
                />
                :{' '}
                <FormattedMessage
                  id={state_now}
                  defaultMessage={state_now}
                />
              </li>
            </ul>
          </div>
        ),
      )}
    </StyledTableCell>
  </StyledTableRow>
);

Tr.propTypes = {
  closed: PropTypes.arrayOf(
    PropTypes.shape({
      crm: PropTypes.string.isRequired,
      subscription: PropTypes.string.isRequired,
    }),
  ).isRequired,
  renewed: PropTypes.arrayOf(
    PropTypes.shape({
      crm: PropTypes.string.isRequired,
      client_id: PropTypes.string.isRequired,
      service_id: PropTypes.string.isRequired,
      subscription: PropTypes.string.isRequired,
      state_now: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
