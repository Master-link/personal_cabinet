export const states = (intl) => {
  return [
    {
      id: 'state_new',
      name: intl.formatMessage({
        id: 'new',
        defaultMessage: 'New',
      }),
    },
    {
      id: 'state_approved',
      name: intl.formatMessage({
        id: 'approved',
        defaultMessage: 'Approved',
      }),
    },
    {
      id: 'state_refused',
      name: intl.formatMessage({
        id: 'rejected',
        defaultMessage: 'Rejected',
      }),
    },
  ];
};
