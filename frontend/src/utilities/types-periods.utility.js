const TypesPeriods = ({ type }) => {
  switch (type) {
    case 'kind_periodic':
      return 'Периодический';
    case 'kind_one_time':
      return 'Единовременный';
    default:
      return <></>;
  }
};

export default TypesPeriods;
