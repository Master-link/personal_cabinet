import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenticationService } from '../../_services/authentication.service';
import {
  FormattedMessage,
  FormattedHTMLMessage,
} from 'react-intl';
import AddDocumentDialog from '../documents/createDocument/AddDocument.dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  ADMIN,
  CLIENT,
  DIRECTOR,
  EMPLOYEE,
  MANAGER,
  OBSERVER,
} from '../../constants/roles';
import './header.style.scss';
import '../share/share.style.scss';
import { allowed_roles } from '../../utilities/allowed_roles';
import { headerRoles } from '../../constants/headerRoles';
import Badge from '@material-ui/core/Badge';
import { getNewClaims } from 'src/services/claim-http.service';
import { setCount } from 'src/redux/claim/claim.actions';
import { YesOrNoUI } from '../../ui/prepared';

const renderSpanMenu = (element, count) => {
  const Menu = (
    <span>
      <FormattedHTMLMessage
        id={element.i18}
        defaultMessage={element.message}
      />
    </span>
  );

  if (element.path !== '/claims') return Menu;
  return (
    <Badge
      badgeContent={count}
      color="secondary"
      className="badge_menu"
    >
      {Menu}
    </Badge>
  );
};
const Header = ({
  active,
  count,
  setCount,
  client,
  user,
}) => {
  const handleCloseAlert = () => setShowAlert(false);
  const handleShow = () => setShowAlert(true);
  const [show_alert, setShowAlert] = useState(false);
  const [sticky, setSticky] = useState('sticky');

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [disabled, setDisabled] = useState(false);
  const [anchorCl, setAnchorCl] = useState(null);
  const opencl = Boolean(anchorCl);

  // показать меню юзера
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // показать меню платежей
  const handleClickCl = (event) => {
    setAnchorCl(event.currentTarget);
  };

  // скрыть меню юзера
  const handleClose = () => {
    setAnchorEl(null);
  };
  // скрыть меню платежей
  const handleCloseCl = () => {
    setAnchorCl(null);
  };

  // вызов разлогирования клиента
  const logoutAction = () => {
    authenticationService.logout();
  };

  useEffect(async () => {
    setDisabled(true);


  }, []);

  if (!disabled) {
    return <></>;
  }
  return (
    <>
      <ul className="sidebar navbar-nav">
        <li className="nav-item">
          <div className="profile">
            <Link to="/profile" className="option nav-link">
              <span className="elk-profile">
                {user.first_letter}
              </span>
              <span className="user_role">
                <span>{user.fioshort}</span>
                <span>{user.role_intl}</span>
              </span>
            </Link>
            <MoreVertIcon onClick={handleClick} />
          </div>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/profile" className="dropdown-item">
                <FormattedMessage
                  id="profile"
                  defaultMessage="Профиль"
                />
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to="/notifications"
                className="dropdown-item"
              >
                <FormattedMessage
                  id="notifications"
                  defaultMessage="Notifications"
                />
              </Link>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <Link
                className="dropdown-item"
                to="#"
                onClick={handleShow}
              >
                <FormattedMessage
                  id="exit"
                  defaultMessage="Выход"
                />
              </Link>
            </MenuItem>
          </Menu>
        </li>
        {headerRoles[user.role].map(
          (e, i) =>
            allowed_roles(user.all_roles, e.denied) && (
              <li
                key={i}
                className={
                  'nav-item' +
                  (active === e.path ? ' active' : '')
                }
              >
                <Link
                  to={e.path}
                  className="option nav-link"
                >
                  <i className={e.class}></i>{' '}
                  {renderSpanMenu(e, count)}
                </Link>
              </li>
            ),
        )}
      </ul>

      <YesOrNoUI
        description={
          <FormattedMessage
            id="exit.body"
            defaultMessage="Do you watn to exit from an account ?"
          />
        }
        onCancel={handleCloseAlert}
        onConfirm={logoutAction}
        isOpen={show_alert}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    active: state.breadcrumbs.active,
    count: state.claim.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCount: (data) => dispatch(setCount(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
