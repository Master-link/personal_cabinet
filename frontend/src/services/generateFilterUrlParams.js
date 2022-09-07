export const generateFilterUrlParams = (filterParams) =>
  Object.keys(filterParams).reduce((acc, key) => {
    if (
      filterParams[key] !== '' &&
      filterParams[key] !== 'null'
    ) {
      return {
        ...acc,
        [`filter[${key}]`]: filterParams[key],
      };
    }

    return {
      ...acc,
    };
  }, {});
