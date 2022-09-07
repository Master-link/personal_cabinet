import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { setRecord } from '../redux/subscription/subscription.actions';
import { useSnackbar } from 'notistack';

const SmsLogin = ({}) => {
  const { enqueueSnackbar } = useSnackbar();

  const doAction = async () => {
    enqueueSnackbar('Не реализовано', {
      variant: 'warning',
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={doAction}
      >
        <AddIcon /> Новый СМС логин
      </Button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    reduxRecord: state.subscription.record,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRecord: (data) => dispatch(setRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmsLogin);
