import {
  Dialog,
  DialogActions,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { ButtonUI } from '../../../ui/prepared';
import * as PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PaperDialogComponent } from '../../_helpers/MuiDialogs/PaperDialogComponent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableHead from '@material-ui/core/TableHead';
import { RenderThMaterial } from '../../_helpers/render-th-material.component';
import { tableThlabelBuilder } from '../../_helpers/tableThlabelBuilder';
import { thTableDialog } from './thTableDialog';
import { Tr } from './Tr.component';
import { BeautyDatetime } from '../../../utilities/beauty-datetime.utility';

export const InfoDialog = ({
  stat: { closed, renewed, created_at },
  onClose,
}) => {
  return (
    <Dialog
      key="dialog-tm-stat"
      open
      maxWidth="lg"
      fullWidth
      aria-labelledby="dialog-title"
      PaperComponent={PaperDialogComponent}
      onClose={onClose}
    >
      <DialogTitle id="dialog-title">
        <FormattedMessage
          id="statistics"
          defaultMessage="Statistics"
        />{' '}
        <BeautyDatetime datetime={created_at} showTime />
      </DialogTitle>
      <DialogContent>
        <Paper>
          <TableContainer>
            <Table
              size="medium"
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  {thTableDialog.map((item, index) => (
                    <RenderThMaterial
                      key={index}
                      sort={'id'}
                      onClick={() => {}}
                      order={'desc'}
                      id={item.id}
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
                <Tr
                  closed={closed}
                  renewed={renewed}
                  created_at={created_at}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
      <DialogActions className="m-3">
        <ButtonUI
          onClick={onClose}
          color="secondary"
          text={
            <FormattedMessage
              id="cancel"
              defaultMessage="Cancel"
            />
          }
        />
      </DialogActions>
    </Dialog>
  );
};

InfoDialog.propTypes = {
  stat: PropTypes.shape({
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
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
