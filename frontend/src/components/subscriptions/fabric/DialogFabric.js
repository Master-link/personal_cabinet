import { CloseQueueDialog } from '../closeQueueDialog/CloseQueueDialog';
import * as PropTypes from 'prop-types';

export const DialogFabric = ({
  state,
  id,
  onClose,
  onCloseAndLoad,
}) => {
  switch (state) {
    case 'delaying':
      return (
        <CloseQueueDialog
          id={id}
          onClose={onClose}
          onCloseAndLoad={onCloseAndLoad}
        />
      );
    default:
      return <></>;
  }
};

DialogFabric.propTypes = {
  state: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onCloseAndLoad: PropTypes.func.isRequired,
};
