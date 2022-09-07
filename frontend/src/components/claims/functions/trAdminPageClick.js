export const trAdminPageClick = (
  clientId,
  serviceId,
  tariffId,
  claimId,
) =>
  `/clients/show/${clientId}/services/show/0/subscriptions/create/new/for_client?serviceId=${serviceId}&&tariffId=${tariffId}&&claimId=${claimId}`;
