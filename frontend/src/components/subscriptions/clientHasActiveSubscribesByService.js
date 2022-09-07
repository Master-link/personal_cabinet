import { getActiveSubscribesByService } from '../../services/subscription-http.service';

export const clientHasActiveSubscribesByService = async (
  clientId,
  serviceId,
) => {
  const {
    data: { count },
  } = await getActiveSubscribesByService(
    clientId,
    serviceId,
  );

  return count;
};
