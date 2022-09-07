import * as PropTypes from 'prop-types';
import { YesOrNoUI } from '../../../ui/prepared';
import { FormattedMessage } from 'react-intl';
import { deleteQueuelog } from '../../../services/queuelog-http.service';

export const CloseQueueDialog = ({
  id,
  onClose,
  onCloseAndLoad,
}) => {
  const closeQueue = async () => {
    try {
      await deleteQueuelog(id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <YesOrNoUI
      description={
        <FormattedMessage
          id="delete_task"
          defaultMessage="Is delete the task ?"
        />
      }
      onCancel={() => {
        onClose();
      }}
      onConfirm={async () => {
        await closeQueue(id);
        onCloseAndLoad();
      }}
      isOpen
    />
  );
};

CloseQueueDialog.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onCloseAndLoad: PropTypes.func.isRequired,
};
