import { useEffect, useState } from 'react';
import { breadcrumbsChangeTariff } from './breadcrumbsChangeTariff';
import { useDispatch } from 'react-redux';
import { getChangeTariffsQueue } from '../../../services/queuelog-http.service';
import Myspinner from '../../share/myspinner.component';
import ChangeTariff from './ChangeTariff';
import { DialogFabric } from '../fabric/DialogFabric';

const ChangeTariffContainer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [
    showDialogActionChoose,
    setShowDialogActionChoose,
  ] = useState(0);
  const [currentState, setCurrentState] = useState('');
  const [data, setData] = useState([]);

  const fetchChangeTariffsQueue = async () => {
    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await getChangeTariffsQueue({
        sort: 'id',
        order: 'desc',
      });
      setData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChangeTariffsQueue().then((_r) => {});
  }, []);

  useEffect(() => {
    breadcrumbsChangeTariff(dispatch);
  }, [dispatch]);

  if (isLoading) {
    return <Myspinner />;
  }

  return (
    <>
      <ChangeTariff
        data={data}
        fetchChangeTariffsQueue={fetchChangeTariffsQueue}
        setShowDialogActionChoose={
          setShowDialogActionChoose
        }
        setCurrentState={setCurrentState}
      />
      {showDialogActionChoose > 0 && (
        <DialogFabric
          state={currentState}
          id={showDialogActionChoose}
          onClose={() => setShowDialogActionChoose(false)}
          onCloseAndLoad={async () => {
            setShowDialogActionChoose(false);
            await fetchChangeTariffsQueue();
          }}
        />
      )}
    </>
  );
};

export default ChangeTariffContainer;
