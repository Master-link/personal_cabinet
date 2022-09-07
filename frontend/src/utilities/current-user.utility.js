import decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { useIntl } from 'react-intl';

export const CurrentUser = () => {
  const currentUserToken = new BehaviorSubject(
    localStorage.getItem('currentToken'),
  );
  const userinfo = decode(currentUserToken.value);
  const intl = useIntl();

  return {
    id: userinfo.user_id,
    fio: userinfo.username,
    first_letter: userinfo.username.slice(0, 1),
    fioshort: userinfo.username.slice(0, 14),
    email: userinfo.email,
    role: userinfo.roles[0], // главная роль, сейчас многое на него завязано
    all_roles: userinfo.roles, // все роли юзера
    role_intl: intl.formatMessage({
      id: userinfo.roles[0],
      defaultMessage: 'Администратор',
    }),
  };
};
