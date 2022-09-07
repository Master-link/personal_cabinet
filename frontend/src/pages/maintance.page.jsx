import { authenticationService } from '../_services/authentication.service';
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';

const MaintancePage = ({ ...props }) => {
  const logoutAction = () => {
    authenticationService.logout();
    props.history.push('/');
  };

  return (
    <>
      <div className="setpass">
        <div>
          <center>
            <p className="font-weight-bold mt-5 bt-3">
              Приложение находится в режиме обслуживания
            </p>
            <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={logoutAction}
            >
              <FormattedMessage
                id="exit"
                defaultMessage="Выход"
              />
            </Button>
          </center>
        </div>
      </div>
    </>
  );
};

export default MaintancePage;
