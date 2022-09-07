import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getClient } from '../../services/client-http.service';
import Myspinner from '../share/myspinner.component';
import { FormattedMessage } from 'react-intl';
import {
  setBreadcrumb,
  setActive,
} from '../../redux/breadcrumbs/breadcrumbs.actions';
import '../share/share.style.scss';
import {
  approveClaim,
  getClaim,
} from '../../services/claim-http.service';
import { useLocation } from 'react-router-dom';
import SubscriptionFormContainer from './forms/SubscriptionForm.container';
import * as PropTypes from 'prop-types';
import { claimsStates } from '../claims/states';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CreateForServices = ({
  client_id,
  setActive,
  setBreadcrumb,
}) => {
  const query = useQuery();
  const claimId = query.get('claimId') || null;

  const [client, setClient] = useState(null);
  const [claim, setClaim] = useState({});
  const [initClaim, setInitClaim] = useState({});
  const [claimServiceOption, setClaimServiceOption] =
    useState({});
  const [claimTariff, setClaimTariff] = useState(null);

  const [claimTariffOption, setClaimTariffOption] =
    useState({});

  const approvingClaim = async () => {
    if (claim.state === claimsStates.state_new) {
      await approveClaim(claim.id);
    }
  };

  const fetchClaim = async (id) => {
    try {
      const { data } = await getClaim(id);
      setClaim(data);
      setInitClaim({
        service_id: data.service_id,
        tariff_id: data.tariff_id,
        started_at: data.date_activation,
        jsondata: {
          renewal: false,
          paid_on: null,
          comment: data.comment,
        },
      });
      setClaimServiceOption(data.service_option);
      setClaimTariffOption(data.tariff_option);
      setClaimTariff(data.tariff);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchClient = async (id = 0) => {
    try {
      const {
        data: { client },
      } = await getClient(id);
      setClient(client);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  useEffect(() => {
    fetchClient(client_id);
    if (claimId) {
      fetchClaim(claimId);
    }
  }, []);

  useEffect(() => {
    if (client) {
      setActive('/');
      setBreadcrumb([
        {
          name: (
            <FormattedMessage
              id="main"
              defaultMessage="Main page"
            />
          ),
          to: '/',
        },
        {
          name: (
            <FormattedMessage
              id="client.name"
              defaultMessage="{client}"
              values={{
                client: `${client.name} ID ${client.crm.crm}`,
              }}
            />
          ),
          to: `/clients/edit/${client_id}`,
        },
        {
          name: (
            <FormattedMessage
              id="services"
              defaultMessage="Услуги"
            />
          ),
          to: `/clients/show/${client_id}/services`,
        },
      ]);
    }
  }, [client]);

  if (!client) return <Myspinner />;
  if (claimId && initClaim === {}) return <Myspinner />;

  return (
    <SubscriptionFormContainer
      approvingClaim={approvingClaim}
      client_id={client_id}
      crm={client.crm.crm}
      initialValues={{
        state: 'new',
        jsondata: {
          renewal: false,
          paid_on: null,
        },
        ...initClaim,
      }}
      readOnly={[]}
      claimId={claimId}
      isClaimOnReview={
        claim.state === claimsStates.state_new
      }
      claimServiceOption={claimServiceOption}
      claimTariffOption={claimTariffOption}
      claimTariff={claimTariff}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBreadcrumb: (data) => dispatch(setBreadcrumb(data)),
    setActive: (active) => dispatch(setActive(active)),
  };
};

CreateForServices.propTypes = {
  client_id: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
  setBreadcrumb: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateForServices);
