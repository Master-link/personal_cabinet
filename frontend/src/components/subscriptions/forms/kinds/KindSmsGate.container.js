import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { getOperators } from '../../../../services/operator-http.service';
import { prepareSmsResources } from '../../../../utilities/prepareSmsResources';
import { setData } from '../../../../redux/smslogin/smslogin.actions';
import { connect } from 'react-redux';
import { KindSmsGate } from './KindSmsGate';
import * as PropTypes from 'prop-types';
import { fetchSmsLogins } from './fetchSmsLogins';

const KindSmsGateContainer = ({
  client_id,
  crm,
  initialValue,
  tariff,
  form,
  onAdd,
  onRemove,
  smsLogins,
  setSmsLogins,
  readOnly,
}) => {
  const intl = useIntl();
  const [operators, setOperators] = useState([]);

  useEffect(async () => {
    setSmsLogins(
      await fetchSmsLogins(
        client_id,
        initialValue.jsondata.sms_login,
      ),
    );

    const {
      data: { data },
    } = await getOperators();
    setOperators(data);

    if (
      initialValue.opsms_attributes &&
      initialValue.opsms_attributes.length !== 0
    ) {
      form.change(
        'opsms_attributes',
        initialValue.opsms_attributes,
      );
    } else {
      form.change(
        'opsms_attributes',
        prepareSmsResources(tariff),
      );
    }
  }, []);

  return (
    <KindSmsGate
      intl={intl}
      tariff={tariff}
      crm={crm}
      client_id={client_id}
      form={form}
      onAdd={onAdd}
      onRemove={onRemove}
      operators={operators}
      smsLogins={smsLogins}
      readOnly={readOnly}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    smsLogins: state.smslogin.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSmsLogins: (data) => dispatch(setData(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KindSmsGateContainer);

KindSmsGateContainer.propTypes = {
  client_id: PropTypes.number.isRequired,
  crm: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  intl: PropTypes.func.isRequired,
  initialValue: PropTypes.shape({
    client_id: PropTypes.number.isRequired,
    jsondata: PropTypes.shape({
      sms_login: PropTypes.number,
      paid_on: PropTypes.string.isRequired,
      renewal: PropTypes.bool.isRequired,
      new_tariff: PropTypes.bool,
    }).isRequired,
    state: PropTypes.string,
    tariff_id: PropTypes.number,
    started_at: PropTypes.string,
    renewal: PropTypes.bool,
    opsms_attributes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  operators: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      operator_id: PropTypes.number.isRequired,
      price: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  smsLogins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  tariff: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  readOnly: PropTypes.arrayOf(PropTypes.string).isRequired,
};
