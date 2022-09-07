import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { useIntl, FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { closeSubscription } from '../services/subscription-http.service';
import { setActivated } from '../redux/subscription/subscription.actions';
import { useSnackbar } from 'notistack';
import DatePicker from 'react-datepicker';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import { UiDialog } from '../ui/prepared/dialogs/UiDialog';
import { SaveAndClose } from '../ui/prepared/dialogActions/SaveAndClose';

const CloseSubscription = ({
  subscription,
  setActivated,
}) => {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const [endedAt, setEndedAt] = useState(new Date());
  const [showForm, setShowForm] = useState(false);

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);

  useEffect(() => {});

  const putData = async (endedAt) => {
    let body = {};
    endedAt = moment(endedAt, 'YYYY-MM-DD', true).format(
      'YYYY-MM-DD',
    );
    if (endedAt) {
      body.ended_at = endedAt;
    }

    try {
      await closeSubscription(subscription.id, body);
      handleCloseForm();
      setActivated(true);
      return {
        message: intl.formatMessage({
          id: 'subscribe.closed',
          defaultMessage: 'The subscribe has been closed',
        }),
        type: { variant: 'success' },
      };
    } catch (error) {
      console.error(error);
      return {
        message:
          error.response.data.message ||
          error.response.data.error,
        type: { variant: 'error' },
      };
    } finally {
      setActivated(false);
    }
  };

  const activate = async () => {
    const resp = await putData(endedAt);
    enqueueSnackbar(resp.message, resp.type);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleShowForm}
      >
        <CloseIcon />{' '}
        <FormattedMessage
          id="close"
          defaultMessage="Close"
        />
      </Button>

      {showForm && (
        <UiDialog
          dialogContent={
            <Table className="profile">
              <TableHead></TableHead>
              <TableBody>
                <TableRow key="login">
                  <TableCell component="th">
                    <FormattedMessage
                      id="subscribe.closing_date"
                      defaultMessage="Date of closing the subscribe"
                    />
                    :
                  </TableCell>
                  <TableCell align="left">
                    <DatePicker
                      autoComplete="off"
                      dateFormat="dd.MM.yyyy"
                      selected={endedAt}
                      onChange={(date) => setEndedAt(date)}
                      className="form-control w-100"
                      monthsShown={1}
                      showYearDropdown
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          }
          onCloseDialog={handleCloseForm}
          dialogTitle={
            <>
              <FormattedMessage
                id="closing"
                defaultMessage="Closing"
              />{' '}
              <FormattedMessage
                id="subscribe_u"
                defaultMessage="subscribe"
              />
            </>
          }
          actions={
            <SaveAndClose
              onCloseDialog={handleCloseForm}
              onSubmit={activate}
              disabled={false}
            />
          }
          open={true}
        />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActivated: (data) => dispatch(setActivated(data)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(CloseSubscription);
