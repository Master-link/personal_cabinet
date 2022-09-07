import { InfoDialog } from './InfoDialog';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getClosedAndRenewedDetails } from '../../../services/subscription-http.service';
import Myspinner from '../../share/myspinner.component';

const InfoDialogContainer = ({ statId, onClose }) => {
  const [stat, setStat] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const { data } = await getClosedAndRenewedDetails(
        statId,
      );
      setStat(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    getData();
  }, []);

  if (isLoading) {
    return <Myspinner />;
  }

  return <InfoDialog stat={stat} onClose={onClose} />;
};

InfoDialogContainer.propTypes = {
  statId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoDialogContainer;
