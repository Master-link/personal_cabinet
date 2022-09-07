import { useEffect, useState } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import {
  withStyles,
  styled,
} from '@material-ui/core/styles';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Badge from '@material-ui/core/Badge';
import * as PropTypes from 'prop-types';
import cn from 'classnames';
import { FormattedMessage } from 'react-intl';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(() => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: '45px',
    width: 370,
    boxShadow: 'grey -0.2em 0.6em 1em',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
  },
}));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary':
        {
          color: theme.palette.common.white,
        },
    },
  },
}))(MenuItem);

const formattedMessage = (message) => {
  if (message.length > 32)
    return `${message.slice(0, 32)} ..`;
  return message;
};

export const NotificationsWidget = ({
  notifications,
  amount,
  amountLabel,
  onRead,
  onReadAll = () => {},
  onRedirect,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [total, setTotal] = useState(0);
  const [bell, setBell] = useState(false);

  useEffect(() => {
    if (total > 0 && total < amount) {
      setBell(true);
      setTimeout(() => setBell(false), 1300);
    }
    setTotal(amount);
  }, [amount]);

  return (
    <>
      <Badge
        color="primary"
        className={cn('ml-3', 'mr-3', bell && 'ringing')}
        badgeContent={amountLabel}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <NotificationsIcon
          className={cn('pointer', bell && 'ringing')}
          onClick={handleClick}
        />
      </Badge>
      {amount > 0 && (
        <StyledMenu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {notifications.map(
            ({ id, message, link }, index) => (
              <StyledMenuItem>
                <ListItemText
                  primary={formattedMessage(message)}
                  onClick={() => {
                    onRead(id, index);
                    handleClose();
                    onRedirect(link);
                  }}
                />
                <DeleteRounded
                  className="ml-4"
                  onClick={() => onRead(id, index)}
                />
              </StyledMenuItem>
            ),
          )}
          <StyledMenuItem className="final_message">
            <ListItemText
              primary={
                <FormattedMessage
                  id="show_all_notifications"
                  defaultMessage="Show all notifications"
                />
              }
              onClick={() => {
                handleClose();
                onRedirect('/notifications');
              }}
            />
            <DeleteForeverIcon
              onClick={() => onReadAll()}
              titleAccess={
                <FormattedMessage
                  id="read_all"
                  defaultMessage="Read all messages as read"
                />
              }
            />
          </StyledMenuItem>
        </StyledMenu>
      )}
    </>
  );
};

NotificationsWidget.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRead: PropTypes.func.isRequired,
  onReadAll: PropTypes.func,
  onRedirect: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  amountLabel: PropTypes.string.isRequired,
};
