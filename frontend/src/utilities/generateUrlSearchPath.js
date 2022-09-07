export const generateUrlSearchPath = (params) => {
  const paramsString = new URLSearchParams(
    params,
  ).toString();

  return `?${paramsString}`;
};
