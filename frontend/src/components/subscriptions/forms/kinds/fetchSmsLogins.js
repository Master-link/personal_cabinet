import { searchFreeSmsLogins } from '../../../../services/smslogin-http.service';

export const fetchSmsLogins = async (
  client_id,
  sms_login,
) => {
  const {
    data: { data },
  } = await searchFreeSmsLogins(client_id, sms_login);

  return data.map(({ attributes: { login }, id }) => ({
    title: login,
    id: id,
  }));
};
