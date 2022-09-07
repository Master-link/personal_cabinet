import { ButtonUI } from '../../../ui/prepared';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import Myspinner from '../../share/myspinner.component';
import {
  getCountActiveSubscriptions,
  getTariffesForService,
  postCreateSubscriptionDuplicates,
} from '../../../services/tariff-http.service';
import { ChangeTariffDialog } from './ChangeTariffDialog';
import { postCreateChangeTariff } from '../../../services/queuelog-http.service';
import * as PropTypes from 'prop-types';

const ChangeTariffDialogContainer = ({
  initialValues = {},
  fetchChangeTariffsQueue,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createdSubscriptions, setCreatedSubscriptions] =
    useState(false);
  const [tariffs, setTariffs] = useState([]);
  const [countSubscriptions, setCountSubscriptions] =
    useState(0);

  const fetchActiveSmsTariffs = async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await getTariffesForService({
        name: '',
        service_id: [1, 3],
      });
      setTariffs(
        data.map(({ id, name }) => {
          return { id: id, name: name };
        }),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCountActiveSubscriptions = async (id) => {
    try {
      const {
        data: { data },
      } = await getCountActiveSubscriptions(id);
      setCountSubscriptions(data);
    } catch (e) {
      console.error(e);
    }
  };

  const createDuplicates = async (data) => {
    try {
      await postCreateSubscriptionDuplicates(data);
      setCreatedSubscriptions(true);
    } catch (e) {
      console.error(e);
    }
  };

  const saveQueue = async (data) => {
    try {
      await postCreateChangeTariff(data);
      setCreatedSubscriptions(true);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchActiveSmsTariffs().then((_r) => {});
  }, []);

  if (isLoading) {
    return <Myspinner />;
  }

  return (
    <>
      <ButtonUI
        className={cn('ml-1', 'mr-1')}
        variant="outlined"
        color="secondary"
        text={
          <FormattedMessage
            id="change_tariff"
            defaultMessage="Change tariff"
          />
        }
        onClick={() => setShowDialog(true)}
      />
      {showDialog && (
        <ChangeTariffDialog
          onCloseDialog={() => {
            setShowDialog(false);
            setCountSubscriptions(0);
            setCreatedSubscriptions(false);
          }}
          onSubmit={async (data) => {
            await saveQueue(data);
            fetchChangeTariffsQueue();
            setShowDialog(false);
          }}
          initialValues={initialValues}
          tariffs={tariffs}
          countSubscriptions={countSubscriptions}
          fetchCountActiveSubscriptions={
            fetchCountActiveSubscriptions
          }
          onGenerate={() => {}}
          createDuplicates={async (data) => {
            await createDuplicates(data);
          }}
          createdSubscriptions={createdSubscriptions}
        />
      )}
    </>
  );
};

ChangeTariffDialogContainer.propTypes = {
  initialValues: PropTypes.shape({
    from: PropTypes.string.isRequired,
    started_at: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }),
  fetchChangeTariffsQueue: PropTypes.func.isRequired,
};

export default ChangeTariffDialogContainer;
